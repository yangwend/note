import { FC, useEffect } from 'react';
import { Modal, Form, Picker } from 'antd-mobile';
import { PickerValue } from 'antd-mobile/es/components/picker';
import { IStoreGroupTypeItem } from '@/types';
import PickMultiple from '../PickMultiple';
import styles from './index.module.scss';

interface IFormValues {
  goodsType?: string; // 配置状态
  groupCodeList?: string[]; // 门店分组
}

interface IProps {
  title?: string;
  goodsTypeList?: { code: string; name: string }[]; // 让他配置状态下拉列表
  groupList?: IStoreGroupTypeItem[]; // 分组下拉列表
  editRow: IFormValues;
  editVisible: boolean;
  onOk: (data: IFormValues) => void;
  onCancel: () => void; // 关闭弹窗事件
}

/**
 * H5选择配置状态弹窗
 */
const GoodsTypeModal: FC<IProps> = ({
  title = '拟调整配置状态',
  goodsTypeList = [],
  groupList = [],
  editRow,
  editVisible,
  onOk,
  onCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editVisible && editRow && editRow.goodsType) {
      const { goodsType, groupCodeList = [] } = editRow;
      form.setFieldsValue({
        groupCodeList,
        goodsType: [goodsType], // 转化为 Picker 选中的值
      });
    } else {
      form.resetFields();
    }
  }, [editVisible, editRow, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then(
        (values: {
          goodsType?: PickerValue[];
          groupCodeList?: string[]; // 门店分组
        }) => {
          onOk({
            goodsType:
              (values.goodsType ?? []).length > 0
                ? (values.goodsType ?? [])[0] || undefined
                : undefined, // 转化
            groupCodeList: values.groupCodeList || [],
          });
        }
      )
      .catch((error) => {
        console.log('error->', error);
      });
  };

  return (
    <Modal
      getContainer={document.body}
      visible={editVisible}
      className={styles.modal}
      maskClassName={styles.mask}
      content={
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <Form name="goodsTypeForm" form={form} className={styles.form}>
            <Form.Item
              name="goodsType"
              label="配置状态"
              rules={[{ required: true, message: '请选择配置状态' }]}
            >
              <Picker
                columns={[
                  goodsTypeList.map((goodsTypeItem) => ({
                    label: goodsTypeItem.name,
                    value: goodsTypeItem.code,
                  })),
                ]}
              >
                {(value) => (
                  <div className={styles.picker}>{value?.[0] ? value?.[0].label : null}</div>
                )}
              </Picker>
            </Form.Item>
            <Form.Item
              name="groupCodeList"
              label="门店分组"
              rules={[{ required: true, message: '请选择门店分组' }]}
            >
              <PickMultiple groupList={groupList} />
            </Form.Item>
          </Form>
          <div className={styles.btnGroup}>
            <div className={styles.btnLeft} onClick={onCancel}>
              取消
            </div>
            <div className={styles.btnRight} onClick={handleOk}>
              确定
            </div>
          </div>
        </div>
      }
      onClose={onCancel}
      destroyOnClose={true}
    />
  );
};

export default GoodsTypeModal;
