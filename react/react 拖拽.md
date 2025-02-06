## react 拖拽

该文档主要介绍 2 种拖拽方式。

1. react-sortable-hoc
2. react-dnd/react-dnd-html5-backend

### antd UI 组件库参考案例

1. [拖拽排序](https://4x.ant.design/components/table-cn/#components-table-demo-drag-sorting)
2. [拖拽手柄列](https://4x.ant.design/components/table-cn/#components-table-demo-drag-sorting-handler)

### react-sortable-hoc

demo 代码：

```tsx
import { useEffect, useState, useMemo, useRef } from 'react';
import { Table, message, Input, InputNumber } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { ColumnsType } from 'antd/es/table';
import { MenuOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { arrayMoveImmutable } from 'array-move';
import type { SortableContainerProps, SortEnd } from 'react-sortable-hoc';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { CommonDictSelect } from '@business/goods-react-basic';
import { IResultBasic, FlowTypes } from '@/pages/manager/type';
import { FlowService } from '@/pages/manager/service';
import CommonHttp from '@/pages/manager/service/common';
import { LegoTableColEllipsis } from '@pluve/lego-table-react';
import { isEmptyValue } from '@/public/utils/baseTool';
import ToolUtils from '@/public/utils/tool';
import { ICommonStepProps } from '../../types';
import styles from '../../step.less';

const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ fontSize: 19, cursor: 'grab', color: '#999' }} />
));

const SortableItem = SortableElement((props: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr {...props} />
));

const SortableBody = SortableContainer((props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody {...props} />
));

/**
 * 解决 Table 组件中存在 Input 组件时，react-sortable-hoc 拖拽组件导致 Input 输入时会失焦问题，以下为参考链接：
 * https://github.com/clauderic/react-sortable-hoc/issues/729
 * https://github.com/clauderic/react-sortable-hoc/issues/120
 * https://codesandbox.io/p/sandbox/shi-shi-bao-cun-de-bian-ji-biao-ge-forked-x6frl
 * 解决思路：避免每次都重新渲染导致失去焦点
 */
const DifferentTable: React.FC<ICommonStepProps> = ({
  sourceData = [],
  setSourceData,
  setLoading,
  loading,
  ...props
}) => {
  const [dictMap, setDictMap] = useState<{ [key: string]: any }>();
  const [date, setDate] = useState<number>();

  const dataSourceRef = useRef<any>();

  useEffect(() => {
    dataSourceRef.current = sourceData;
  }, [sourceData]);

  useEffect(() => {
    handleDict();
  }, []);

  useEffect(() => {
    if (props.auditId && props.editRow.id) {
      setLoading(true);
      FlowService.getListCompareDetails(props.auditId, props.editRow.id)
        .then((res: IResultBasic<Partial<FlowTypes.ICompareItem>[]>) => {
          const { code, data, message: msg } = res;
          if (code === 0) {
            const list = data
              ? [
                  ...data.map((item: Partial<FlowTypes.ICompareItem>, index: number) => {
                    return {
                      ...item,
                      initProductionArea: item.productionArea, // 产地
                      initPackagingMaterial: item.packagingMaterial, // 包装材质
                      isModify: false,

                      goodsSort: isEmptyValue(item.goodsSort) ? index : item.goodsSort,
                    };
                  }),
                ]
              : [];
            updateSourceData(list);
          } else {
            message.error(msg);
          }
        })
        .catch((reason: any) => {
          message.error(reason?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [props.auditId, props.editRow.id]);

  const handleDict = () => {
    const dictKey = ['packagingMaterial', 'measureUnit'];
    CommonHttp.dict(dictKey)
      .then(async (result: any) => {
        let dictMap: { [key: string]: any } = {};
        if (result.data.checkFlag === -1) {
          message.error(result.data.msg);
        } else {
          dictKey.forEach((it: string) => {
            dictMap[it] = [];
          });
          // @ts-ignore
          result.data.forEach((it: any) => {
            try {
              dictMap[it.dictTypeCode].push({ ...it });
            } catch (e) {
              console.log(`字典中没有此类型 ${it.dictTypeCode}`);
            }
          });
        }
        setDictMap(dictMap);
      })
      .finally(() => {});
  };

  const listLength = (sourceData || []).length;

  // 更新单行数据（调接口更新）
  const { loading: updateLoading, run: updateRecord } = useRequest(
    async (params: Partial<FlowTypes.ICompareItem>, changeField: string) => {
      try {
        const res = await FlowService.updateCompareDetails({
          rowData: {
            auditId: props.auditId!,
            goodsId: props.editRow.id!,
            ...params,
          },
          changeField,
          categoryCode: props.editRow.categoryCode as string,
        });
        if (res?.code !== 0) {
          throw new Error(res?.message);
        }

        const newData = sourceData.map((item: Partial<FlowTypes.ICompareItem>) => {
          if (params.id === item.id) {
            return {
              ...(res?.data ?? {}),
              isModify: true,
            };
          } else {
            return item;
          }
        });
        updateSourceData(newData);
      } catch (error) {
        message.error((error as any)?.message ?? '更新时发生未知错误');
      }
    },
    {
      manual: true,
    }
  );

  // 更新单行数据（本地更新）
  const updateRecordLocal = (newItem: Partial<FlowTypes.ICompareItem>) => {
    const newData = sourceData.map((item: Partial<FlowTypes.ICompareItem>) => {
      if (newItem.id === item.id) {
        return {
          ...newItem,
          isModify: true,
        };
      } else {
        return item;
      }
    });
    setSourceData(newData);
  };

  const updateSourceData = (data: any) => {
    const targetObj = data.find((it: any) => it.dataType === '1') || {}; // 新品
    const contrastObj = targetObj.referenceGoodsCode
      ? data.find((it: any) => it.goodsCode === targetObj.referenceGoodsCode) || {}
      : {}; // 对比品种中对标的品种
    const calculateMarks = (item: any, compareItem: any) => ({
      minComePriceMark:
        compareItem.goodsCode === item.referenceGoodsCode &&
        !isEmptyValue(item.minComePrice) &&
        !isEmptyValue(compareItem.minComePrice) &&
        item.minComePrice > compareItem.minComePrice,
      minSalePriceMark:
        compareItem.goodsCode === item.referenceGoodsCode &&
        !isEmptyValue(item.minSalePrice) &&
        !isEmptyValue(compareItem.minSalePrice) &&
        item.minSalePrice > compareItem.minSalePrice,
    }); // 新品和对标品种做比较：新品的两个字段，谁高谁标红
    const list = data
      ? [
          ...data.map((item: any) => {
            return {
              ...item,
              ...calculateMarks(
                targetObj,
                item.dataType === '1' && Object.keys(contrastObj).length > 0 ? contrastObj : item
              ),
            };
          }),
        ]
      : [];

    setSourceData(list);
  };

  const columns: ColumnsType<Partial<FlowTypes.ICompareItem>> = [
    {
      title: ToolUtils.getTooltipTitle('排序', '鼠标按住排序图标可进行拖动'),
      dataIndex: 'goodsSort',
      width: 50,
      align: 'center',
      fixed: 'left',
      className: styles.dragVisible,
      render: (_: number, record: Partial<FlowTypes.ICompareItem>) => {
        if (record.dataType === '1') {
          return '-';
        }
        // 针对对比品种才需要展示拖拽按钮
        return <DragHandle />;
      },
    },
    {
      dataIndex: 'dataType',
      title: '说明',
      fixed: 'left',
      className: styles.dragVisible,
      render: (text: '0' | '1') => {
        if (text === '1') {
          return '新品';
        }
        return '对比品种';
      },
      // 暂时注释掉行合并功能，不然拖拽会有问题
      // onCell: (_, index) => {
      //   if (index === 0) {
      //     return {};
      //   }

      //   if ((index || 0) > 1) {
      //     return {
      //       rowSpan: 0,
      //     };
      //   }

      //   return {
      //     rowSpan: listLength - 1,
      //   };
      // },
    },
    {
      dataIndex: 'goodsCode',
      title: '商品编码',
      fixed: 'left',
      className: styles.dragVisible,
      render: (text?: string) => {
        return text || '/';
      },
    },
    {
      dataIndex: 'commonName',
      title: '通用名称',
      fixed: 'left',
      className: styles.dragVisible,
      width: 80,
      render: (text: string) => <LegoTableColEllipsis title={text} maxWidth={200} />,
    },
    {
      dataIndex: 'standard',
      title: '规格',
      fixed: 'left',
      className: styles.dragVisible,
      width: 80,
      render: (text: string) => <LegoTableColEllipsis title={text} maxWidth={300} />,
    },
    {
      dataIndex: 'manufacturerName',
      title: '生产厂家',
      fixed: 'left',
      className: styles.dragVisible,
      width: 80,
      render: (text: string) => <LegoTableColEllipsis title={text} maxWidth={320} />,
    },
    {
      dataIndex: 'productionArea',
      title: ToolUtils.getRedTitle('产地'),
      render: (value: string, record: Partial<FlowTypes.ICompareItem>, index: number) => {
        return (
          <Input
            value={value}
            style={{ width: 110 }}
            allowClear
            placeholder='请输入'
            maxLength={128}
            autoComplete='off'
            size='small'
            onChange={(event) => {
              updateRecordLocal({
                ...record,
                productionArea: event.target.value,
              });
            }}
            onBlur={(event) => {
              const newVal =
                event.target.value.replace(/(^\s*)|(\s*$)/g, '').slice(0, 128) ||
                record.initProductionArea;

              updateRecordLocal({
                ...record,
                productionArea: newVal,
              });
            }}
          />
        );
      },
    },
    {
      title: ToolUtils.getRedTitle('包装材质'),
      dataIndex: 'packagingMaterial',
      render: (value: string, record: Partial<FlowTypes.ICompareItem>, index: number) => {
        return (
          <CommonDictSelect
            style={{ width: 70 }}
            list={dictMap ? dictMap['packagingMaterial'] : []}
            value={value}
            size='small'
            allowClear
            onChange={(val) => {
              const newVal = val ? val : record.initPackagingMaterial;

              updateRecordLocal({
                ...record,
                packagingMaterial: newVal as string,
              });
            }}
          />
        );
      },
    },
    {
      title: ToolUtils.getTooltipTitle(
        '包装数量',
        '根据实物上的包装或者说明书上的包装来填写。如5毫克*30片，其包装数量为30；中药西洋参40克，其包装数量为40(只能填写数字)'
      ),
      dataIndex: 'packageNumber',
      render: (value: number, record: Partial<FlowTypes.ICompareItem>, index: number) => {
        return index === 0 && value ? (
          <span>{value}</span>
        ) : (
          <InputNumber
            placeholder='请输入'
            style={{ width: 110 }}
            controls={false}
            precision={1}
            size='small'
            max={9999.9}
            value={value}
            onBlur={(event) => {
              let newVal: number | undefined = undefined;
              if (isEmptyValue(event.target.value)) {
                newVal = record.initPackageNumber;
              } else {
                newVal = Number(event.target.value);
                if (!isFinite(newVal)) {
                  newVal = record.initPackageNumber;
                } else if (newVal <= 0) {
                  newVal = newVal;
                } else if (newVal > 9999.9) {
                  newVal = 9999.9;
                } else {
                  newVal = newVal;
                }
              }
              newVal = !isEmptyValue(newVal)
                ? ToolUtils.roundToDecimalPlaces(newVal as number, 1)
                : undefined;

              updateRecordLocal({
                ...record,
                packageNumber: newVal,
              });

              if (!isEmptyValue(newVal)) {
                // 调接口更新
                updateRecord(
                  {
                    ...record,
                    packageNumber: newVal,
                  },
                  'packageNumber'
                );
              }
            }}
          />
        );
      },
    },
  ];

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex === 0 || newIndex === 0) {
      // 不可以移动第一行，也不可以将其他行移动到第一行
      return;
    }

    const temp = dataSourceRef.current || [];
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable([...temp], oldIndex, newIndex).filter(
        (el: Partial<FlowTypes.ICompareItem>) => !!el
      );
      console.log('Sorted items: ', newData);
      const newSourceData = newData.map((item, itemIndex) => ({
        ...item,
        goodsSort: itemIndex, // 重新更新 goodsSort
      }));
      // 直接更新本地数据，无需更新远程数据，点击下一步时才需要保存到数据库
      updateSourceData(newSourceData);
    }
    setDate(+new Date());
  };

  const DraggableContainer = useMemo(() => {
    return (props: SortableContainerProps) => (
      <SortableBody
        useDragHandle
        disableAutoscroll
        helperClass={styles.rowDragging}
        onSortEnd={onSortEnd}
        {...props}
      />
    );
  }, [date]);

  const DraggableBodyRow: React.FC<any> = useMemo(() => {
    return ({ className, style, ...restProps }) => {
      // function findIndex base on Table rowKey props and should always be a right array index
      const index = dataSourceRef.current?.findIndex(
        (x: Partial<FlowTypes.ICompareItem>) => x.id === restProps['data-row-key']
      );
      return <SortableItem index={index} {...restProps} />;
    };
  }, [date]);

  return (
    <Table
      rowKey={'id'}
      dataSource={sourceData}
      columns={columns}
      size={'small' as SizeType}
      scroll={{ x: 'max-content' }}
      rowClassName={(_record: any, index: number) => {
        let className = 'table-row-odd';
        if (index % 2 === 1) className = 'table-row-even';
        return className;
      }}
      // loading={loading || updateLoading || false}
      loading={loading || false}
      pagination={false}
      style={{ width: '100%' }}
      bordered
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      }}
    ></Table>
  );
};

export default DifferentTable;
```

```less
.rowDragging {
  // 此类，为动态添加到body下面的节点的类
  background: #e6f5eb !important;
  border: 1px solid #ccc !important;
  z-index: 1000 !important;
}

.rowDragging td {
  background: #e6f5eb !important;
  z-index: 1001 !important;
}

.rowDragging td {
  // 其他行不展示数据
  opacity: 0;
  visibility: hidden;
}

.rowDragging td.dragVisible {
  // 有设置dragVisible的行才展示数据
  opacity: 1;
  visibility: visible;
}
```

### react-dnd/react-dnd-html5-backend

demo 代码：

```tsx
import { FC, useEffect, useCallback, useRef } from 'react';
import { Table, message, Spin } from 'antd';
import { useRequest } from 'ahooks';
import { ColumnsType, ColumnType } from 'antd/es/table';
import update from 'immutability-helper';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FlowTypes, IResultBasic, DataStatusEnum } from '@/pages/manager/type';
import { FlowService } from '@/pages/manager/service';
import { isEmptyValue } from '@/public/utils/baseTool';
import { parseUrl } from '@/public/utils/url';
import PageUtils from './utils';
import AuditCompareUtils from './auditCompareUtils';
import { nodeFilterName } from './constants';
import styles from './auditCompare.less';

interface DraggableBodyRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  index: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
}

const type = 'DraggableBodyRow';

const DraggableBodyRow = ({
  index,
  moveRow,
  className,
  style,
  ...restProps
}: DraggableBodyRowProps) => {
  const ref = useRef<HTMLTableRowElement>(null);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item: { index: number }) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};

const AuditCompare: FC = () => {
  const { openId, processInstanceId: flowId, goodsId } = parseUrl();

  // 校验当前登录人是否是当前节点可以操作的人
  const { data: canEdit } = useRequest(
    async () => {
      if (!flowId || !openId) {
        return false;
      }

      try {
        const res = await FlowService.checkCanEdit({
          flowId,
          openId,
        });
        if (res?.code !== 0) {
          throw new Error(res?.message);
        }
        return res?.data || false;
      } catch (error) {
        message.error((error as any)?.message ?? '查询流程操作信息时发生未知错误');
        return false;
      }
    },
    {
      manual: false,
    }
  );

  // 根据 流程id 查询流程基本信息
  const { data: basicInfo, loading: pageLoading } = useRequest(
    async () => {
      if (!flowId) {
        return undefined;
      }

      try {
        // 获取流程基本信息
        const res = await FlowService.queryBasicInfo({
          flowId,
        });
        if (res?.code !== 0) {
          throw new Error(res?.message);
        }
        return {
          ...(res?.data || {}),
          auditId: res?.data?.id, // 前端转化一下
          dataStatus: res?.data?.dataStatus || DataStatusEnum.TODO,
        };
      } catch (error) {
        message.error((error as any)?.message ?? '查询基础信息时发生未知错误');
        return undefined;
      }
    },
    {
      manual: false,
    }
  );

  // 获取商品详情信息
  const { loading: goodsDetailLoading, data: goodsDetail } = useRequest(
    async () => {
      if (!goodsId) {
        return undefined;
      }

      try {
        const res = await FlowService.getGoodsDetail(goodsId);
        if (res?.code !== 0) {
          throw new Error(res?.message);
        }
        return res?.data;
      } catch (error) {
        message.error((error as any)?.message ?? '查询商品详情时发生未知错误');
        return undefined;
      }
    },
    {
      manual: false,
    }
  );

  // 查询当前节点
  const { data: nodeInfoData } = useRequest(
    async () => {
      if (!flowId || !openId) {
        return undefined;
      }
      try {
        const res = await FlowService.getNodeInfo({ flowId, openId });
        if (res?.code !== 0) {
          throw new Error(res?.message);
        }
        return res?.data || {};
      } catch (error) {
        message.error((error as any)?.message ?? '发生未知错误');
        return undefined;
      }
    },
    {
      manual: false,
    }
  );

  // 获取 对比数据列表（四步）——纯展示
  const {
    data: firstList,
    loading: firstLoading,
    run: getFirstTabList,
    mutate: mutateFirstList,
  } = useRequest(
    async () => {
      if (
        !basicInfo?.auditId ||
        !basicInfo?.applyType ||
        !PageUtils.getCompareVisibleInfo(basicInfo?.applyType).compareSteps ||
        !goodsId
      ) {
        return [];
      }

      try {
        const res = await FlowService.getListCompareDetails(basicInfo?.auditId, goodsId);
        if (res?.code !== 0) {
          throw new Error(res?.message);
        }
        return res?.data || [];
      } catch (error) {
        message.error((error as any)?.message ?? '查询对比数据时发生未知错误');
        return [];
      }
    },
    {
      manual: true,
    }
  );

  const columnsFirst: ColumnsType<any> = [
    ...AuditCompareUtils.getCompareDataColumns({
      listLength: (firstList || []).length,
      categoryCode: goodsDetail?.categoryCode as string | undefined,
    }),
  ];

  useEffect(() => {
    if (basicInfo?.auditId && basicInfo?.applyType && goodsId) {
      // 获取 对比数据列表（四步）——纯展示
      getFirstTabList();
    }
  }, [basicInfo?.auditId, basicInfo?.applyType, goodsId]);

  const components = {
    body: {
      row: DraggableBodyRow,
    },
  };

  // 更新排序
  const {
    loading: sortLoading,
    run: updateListSort,
    cancel: cancelListSort,
  } = useRequest(
    async (list: Partial<FlowTypes.ICompareItem>[]) => {
      try {
        const res = await FlowService.updateCompareDetailsSort({
          auditId: basicInfo?.auditId,
          params: list.map((listItem) => ({ id: listItem.id!, goodsSort: listItem.goodsSort })),
        });
        if (res?.code !== 0) {
          throw new Error(res?.message);
        }

        message.success('更新排序成功');
        // 不更新当前列表数据
      } catch (error) {
        message.error((error as any)?.message ?? '更新排序时发生未知错误');
      }
    },
    {
      manual: true,
    }
  );

  const moveRow = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      if (dragIndex === 0 || hoverIndex === 0) {
        // 不可以移动第一行，也不可以将其他行移动到第一行
        return;
      }
      const dragRow = firstList?.[dragIndex];
      // 获取到最新的数组
      const newFirstList =
        update(firstList, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        })?.map((listItem, listIndex: number) => ({
          ...listItem,
          goodsSort: listIndex, // 重新赋值
        })) ?? [];
      // 直接更新本地数据
      mutateFirstList(newFirstList);
      // 取消排序接口请求
      cancelListSort();
      // 重新发起排序接口请求
      updateListSort(newFirstList as Partial<FlowTypes.ICompareItem>[]);
    },
    [firstList, cancelListSort, updateListSort]
  );

  return (
    <>
      <Spin spinning={pageLoading || goodsDetailLoading || false}>
        <div className={styles.main}>
          {/* 对比数据列表（四步）——纯展示 */}
          {basicInfo?.applyType && (
            <>
              {canEdit ? (
                <DndProvider backend={HTML5Backend}>
                  <Table
                    components={components}
                    onRow={(_, index) => {
                      const attr = {
                        index,
                        moveRow,
                      };
                      return attr as React.HTMLAttributes<any>;
                    }}
                    rowKey='id'
                    size='small'
                    bordered
                    columns={columnsFirst}
                    dataSource={firstList || []}
                    pagination={false}
                    loading={firstLoading || false}
                    scroll={{ x: 'max-content' }}
                  />
                </DndProvider>
              ) : (
                <Table
                  rowKey='id'
                  size='small'
                  bordered
                  columns={columnsFirst}
                  dataSource={firstList || []}
                  pagination={false}
                  loading={firstLoading || false}
                  scroll={{ x: 'max-content' }}
                />
              )}
            </>
          )}
        </div>
      </Spin>
    </>
  );
};

export default AuditCompare;
```
