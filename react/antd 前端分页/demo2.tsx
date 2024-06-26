import React, { useEffect, useState } from 'react';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Table, Button, Tooltip, Form, Select, Input, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const LIST = [
  {
    code: '1001',
    name: 'HSxxww连锁',
    parentCode: '',
  },
  {
    code: '1004',
    name: 'HS杨浦xxww',
    parentCode: '1001',
  },
  {
    code: '1005',
    name: 'HS普陀xxww',
    parentCode: '1001',
  },
  {
    code: '1013',
    name: 'HSRF布衣LL',
    parentCode: '1001',
  },
  {
    code: '1022',
    name: 'HSxxwwYU',
    parentCode: '1001',
  },
  {
    code: '1023',
    name: 'HSRF上虹LL',
    parentCode: '1001',
  },
  {
    code: '1026',
    name: 'WEDSDSD',
    parentCode: '1001',
  },
  {
    code: '1027',
    name: 'FRRFEF',
    parentCode: '1001',
  },
  {
    code: '1044',
    name: 'HSRF隆顺堂LL',
    parentCode: '1001',
  },
  {
    code: '1045',
    name: 'HSRF徐联LL',
    parentCode: '1001',
  },
  {
    code: '1046',
    name: 'RRRRR',
    parentCode: '1001',
  },
  {
    code: '1047',
    name: 'HSRF大拇指LL',
    parentCode: '1001',
  },
  {
    code: '1048',
    name: 'HSRF新川LL',
    parentCode: '1001',
  },
  {
    code: '1049',
    name: 'HSRF锦川LL',
    parentCode: '1001',
  },
  {
    code: '1050',
    name: 'HSRF悠方LL',
    parentCode: '1001',
  },
  {
    code: '1051',
    name: 'HSRF荣广LL',
    parentCode: '1001',
  },
  {
    code: '1052',
    name: 'HSRF高芳LL',
    parentCode: '1001',
  },
  {
    code: '1053',
    name: 'HSRF元杰LL',
    parentCode: '1001',
  },
  {
    code: '1104',
    name: 'HSRF利民LL',
    parentCode: '1001',
  },
  {
    code: '1107',
    name: 'HSRF长虹LL',
    parentCode: '1001',
  },
  {
    code: '1121',
    name: 'HSRF为民LL',
    parentCode: '1001',
  },
  {
    code: '4000',
    name: 'HSQweQQ',
    parentCode: '1001',
  },
  {
    code: '1006',
    name: '3333广东RFTYLL连锁',
    parentCode: '',
  },
  {
    code: '1011',
    name: '广东xxww连锁',
    parentCode: '1006',
  },
  {
    code: '1156',
    name: '广东RFTYLLYU连锁',
    parentCode: '1006',
  },
  {
    code: '4012',
    name: '广东QweQQ',
    parentCode: '1006',
  },
  {
    code: '1016',
    name: 'WEWEWEWE',
    parentCode: '',
  },
  {
    code: '1017',
    name: '无锡九州YU',
    parentCode: '',
  },
  {
    code: '1034',
    name: 'WEWEWE',
    parentCode: '',
  },
  {
    code: '1036',
    name: '无锡DSDWEWE民FDFDFDF康门WEWE诊部',
    parentCode: '1034',
  },
  {
    code: '1041',
    name: '淮安市YUYU连锁',
    parentCode: '',
  },
  {
    code: '1042',
    name: '盱WEWEWEWE眙百草堂YU连锁',
    parentCode: '',
  },
  {
    code: '1000',
    name: 'xxww连锁股份',
    parentCode: '3000',
  },
  {
    code: '1057',
    name: '岳阳xxww',
    parentCode: '3000',
  },
  {
    code: '1068',
    name: '永州WEWERF罗氏协WEWE和LL连锁',
    parentCode: '3000',
  },
  {
    code: '1073',
    name: '平江县xxww',
    parentCode: '3000',
  },
  {
    code: '1127',
    name: '永州WEWEWE湘南xxww',
    parentCode: '3000',
  },
  {
    code: '1143',
    name: 'WEWDSDW',
    parentCode: '3000',
  },
  {
    code: '3000',
    name: '湖南RFYU',
    parentCode: '',
  },
  {
    code: '3009',
    name: '湖南WEWERF恒泰YU',
    parentCode: '3000',
  },
  {
    code: '4003',
    name: '长沙QweQQ',
    parentCode: '3000',
  },
  {
    code: '4006',
    name: '湘WE南加WEWE盟店',
    parentCode: '3000',
  },
  {
    code: '4011',
    name: '湘北WEQweQQ',
    parentCode: '3000',
  },
  {
    code: '1002',
    name: '江苏xxww连锁',
    parentCode: '3001',
  },
  {
    code: '1008',
    name: '苏州WEWE市粤海LL',
    parentCode: '3001',
  },
  {
    code: '1012',
    name: '南通RF部',
    parentCode: '3001',
  },
  {
    code: '1018',
    name: '泰WE州市RF房WEWEWE连锁',
    parentCode: '3001',
  },
  {
    code: '1019',
    name: '泰州WE市xxww连锁',
    parentCode: '3001',
  },
  {
    code: '1024',
    name: '如东xxww连锁',
    parentCode: '3001',
  },
  {
    code: '1037',
    name: '江苏健WE康人LL连锁',
    parentCode: '3001',
  },
  {
    code: '1038',
    name: 'WEWEWEFWWD',
    parentCode: '3001',
  },
  {
    code: '1039',
    name: '江323苏健康人LL连锁如皋',
    parentCode: '3001',
  },
  {
    code: '1040',
    name: '江23苏健康人LL连锁南通',
    parentCode: '3001',
  },
  {
    code: '1054',
    name: '泗3洪县时代YU连锁',
    parentCode: '3001',
  },
  {
    code: '1058',
    name: '南京23RF连锁LL',
    parentCode: '3001',
  },
  {
    code: '1059',
    name: '镇23江芝林LL',
    parentCode: '3001',
  },
  {
    code: '1061',
    name: '南23京新主张LL',
    parentCode: '3001',
  },
  {
    code: '1062',
    name: '徐州23恩奇LL连锁',
    parentCode: '3001',
  },
  {
    code: '1064',
    name: '无锡23德慈门诊部',
    parentCode: '3001',
  },
  {
    code: '1065',
    name: '苏州23市RF粤海LL',
    parentCode: '3001',
  },
  {
    code: '1070',
    name: '苏州23永熙堂YU连锁',
    parentCode: '3001',
  },
  {
    code: '1072',
    name: '如东RF本草23药23房23连锁',
    parentCode: '3001',
  },
  {
    code: '1074',
    name: '南通32市崇23川区鑫诚23诊所',
    parentCode: '3001',
  },
  {
    code: '1102',
    name: '无锡九23州诊23所',
    parentCode: '3001',
  },
  {
    code: '1106',
    name: '丰县RF恒23源342323连锁',
    parentCode: '3001',
  },
  {
    code: '1115',
    name: '东23台R23F开心YU',
    parentCode: '3001',
  },
  {
    code: '1119',
    name: '无锡RF22LL',
    parentCode: '3001',
  },
  {
    code: '1120',
    name: '苏州RF粤海同安23康L23L连锁',
    parentCode: '3001',
  },
  {
    code: '1122',
    name: '苏州RF粤海同安23232康LL连锁2323诊所',
    parentCode: '3001',
  },
  {
    code: '1123',
    name: '苏州RF粤海2323同安康YU',
    parentCode: '3001',
  },
  {
    code: '1124',
    name: '盐城RF金源LL ',
    parentCode: '3001',
  },
  {
    code: '1130',
    name: '苏州RF粤海永熙堂LL',
    parentCode: '3001',
  },
  {
    code: '1133',
    name: '徐州RF34连锁',
    parentCode: '3001',
  },
  {
    code: '1151',
    name: '常州RF连锁LL',
    parentCode: '3001',
  },
  {
    code: '1163',
    name: '苏州新群众诊所（普通合伙）',
    parentCode: '3001',
  },
  {
    code: '1164',
    name: '宿迁RF连锁LL',
    parentCode: '3001',
  },
  {
    code: '3001',
    name: '江苏RFYU',
    parentCode: '',
  },
  {
    code: '4001',
    name: '南通市崇川区文峰街道五一社区卫生服务站',
    parentCode: '3001',
  },
  {
    code: '4004',
    name: '江苏RF合作门店',
    parentCode: '3001',
  },
  {
    code: '4005',
    name: '江苏益大经贸店',
    parentCode: '3001',
  },
  {
    code: '4013',
    name: '江苏QweQQ',
    parentCode: '3001',
  },
  {
    code: '1025',
    name: '石家庄新兴34连锁',
    parentCode: '3002',
  },
  {
    code: '1028',
    name: '唐山新兴34连锁',
    parentCode: '3002',
  },
  {
    code: '1029',
    name: '沧州新兴34连锁',
    parentCode: '3002',
  },
  {
    code: '1030',
    name: '北京新兴德胜连锁34',
    parentCode: '3002',
  },
  {
    code: '1031',
    name: '张家口新兴南山堂34连锁',
    parentCode: '3002',
  },
  {
    code: '1032',
    name: '衡水众康为民34',
    parentCode: '3002',
  },
  {
    code: '1033',
    name: '衡水宏达恒康LL',
    parentCode: '3002',
  },
  {
    code: '1043',
    name: '河北新兴34连锁',
    parentCode: '3002',
  },
  {
    code: '1069',
    name: '沧州新兴五洲LL连锁',
    parentCode: '3002',
  },
  {
    code: '1129',
    name: '沧州新兴金阳光LL连锁',
    parentCode: '3002',
  },
  {
    code: '1131',
    name: '新兴LL连锁河北',
    parentCode: '3002',
  },
  {
    code: '1132',
    name: '天津市RF仙鹤YU销售',
    parentCode: '3002',
  },
  {
    code: '1134',
    name: '23232323',
    parentCode: '3002',
  },
  {
    code: '1135',
    name: '555FFFFFF',
    parentCode: '3002',
  },
  {
    code: '1137',
    name: '天津xxww连锁',
    parentCode: '3002',
  },
  {
    code: '1140',
    name: 'FFFFF',
    parentCode: '3002',
  },
  {
    code: '1144',
    name: '唐山新兴德生堂YU连锁',
    parentCode: '3002',
  },
  {
    code: '1145',
    name: 'Q33W323',
    parentCode: '3002',
  },
  {
    code: '1147',
    name: '秦皇岛RF新兴34连锁',
    parentCode: '3002',
  },
  {
    code: '1149',
    name: '保定新兴34连锁经营',
    parentCode: '3002',
  },
  {
    code: '1152',
    name: '邯郸市新兴百信康YU连锁',
    parentCode: '3002',
  },
  {
    code: '1153',
    name: '石家庄映祺医疗服务',
    parentCode: '3002',
  },
  {
    code: '1155',
    name: '广州RF门诊部',
    parentCode: '3002',
  },
  {
    code: '1157',
    name: '邯郸市新兴华康LL连锁',
    parentCode: '3002',
  },
  {
    code: '1159',
    name: '廊坊新兴德坤元YU零售连锁',
    parentCode: '3002',
  },
  {
    code: '1161',
    name: '平泉新兴利民LL连锁',
    parentCode: '3002',
  },
  {
    code: '1162',
    name: '唐山丰润益民诊所',
    parentCode: '3002',
  },
  {
    code: '1165',
    name: '承德新兴新宇LL连锁',
    parentCode: '3002',
  },
  {
    code: '1166',
    name: '承德新兴百姓平价LL连锁',
    parentCode: '3002',
  },
  {
    code: '3002',
    name: '河北新兴YU',
    parentCode: '',
  },
  {
    code: '4010',
    name: '河北QweQQ',
    parentCode: '3002',
  },
  {
    code: '4016',
    name: '天津QweQQ',
    parentCode: '3002',
  },
  {
    code: '4019',
    name: '金诃连锁QweQQ',
    parentCode: '3002',
  },
  {
    code: '1007',
    name: '湖北xxww连锁',
    parentCode: '3003',
  },
  {
    code: '1009',
    name: '武汉隆泰xxww连锁',
    parentCode: '3003',
  },
  {
    code: '1010',
    name: '湖北RF广生堂YU连锁',
    parentCode: '3003',
  },
  {
    code: '1015',
    name: '湖北RF普康LLYU连锁',
    parentCode: '3003',
  },
  {
    code: '1055',
    name: '武汉RF爱尔康LL',
    parentCode: '3003',
  },
  {
    code: '1056',
    name: '湖北济阳堂LL连锁',
    parentCode: '3003',
  },
  {
    code: '1071',
    name: '麻城市xxwwYU连锁',
    parentCode: '3003',
  },
  {
    code: '1101',
    name: '赤壁RF康华LL连锁',
    parentCode: '3003',
  },
  {
    code: '1105',
    name: '浠水xxww连锁',
    parentCode: '3003',
  },
  {
    code: '1108',
    name: '武汉佳和第三门诊部',
    parentCode: '3003',
  },
  {
    code: '1109',
    name: '湖北正和LL连锁有限责任公司',
    parentCode: '3003',
  },
  {
    code: '1110',
    name: '武汉RF江瀚LL连锁',
    parentCode: '3003',
  },
  {
    code: '1112',
    name: '宜都xxww连锁',
    parentCode: '3003',
  },
  {
    code: '1113',
    name: '宜都市陆城广源诊所',
    parentCode: '3003',
  },
  {
    code: '1114',
    name: '宜都市一品堂诊所',
    parentCode: '3003',
  },
  {
    code: '1125',
    name: '安陆市xxww连锁',
    parentCode: '3003',
  },
  {
    code: '1126',
    name: '湖北RF爱尔康34连锁',
    parentCode: '3003',
  },
  {
    code: '1141',
    name: '武汉RF好健康YU连锁',
    parentCode: '3003',
  },
  {
    code: '1142',
    name: '武汉好健康鸿福堂LL',
    parentCode: '3003',
  },
  {
    code: '1146',
    name: '广水RF康济LL连锁',
    parentCode: '3003',
  },
  {
    code: '1158',
    name: '湖北xxwwYU连锁',
    parentCode: '3003',
  },
  {
    code: '3003',
    name: '湖北RFYU',
    parentCode: '',
  },
  {
    code: '4009',
    name: '湖北QweQQ',
    parentCode: '3003',
  },
  {
    code: '1003',
    name: '江西xxww连锁',
    parentCode: '3005',
  },
  {
    code: '1020',
    name: '江西天顺LLYU连锁',
    parentCode: '3005',
  },
  {
    code: '1021',
    name: '江西赣西xxww连锁',
    parentCode: '3005',
  },
  {
    code: '1103',
    name: '江西RF健民LL连锁',
    parentCode: '3005',
  },
  {
    code: '1117',
    name: '江西赣西xxwwYU连锁',
    parentCode: '3005',
  },
  {
    code: '1128',
    name: '新余RF百惠康LL连锁',
    parentCode: '3005',
  },
  {
    code: '1136',
    name: '江西xxwwYU连锁',
    parentCode: '3005',
  },
  {
    code: '1148',
    name: '宜春xxww连锁',
    parentCode: '3005',
  },
  {
    code: '1150',
    name: '高安xxww连锁',
    parentCode: '3005',
  },
  {
    code: '1154',
    name: '鹰潭市xxww连锁',
    parentCode: '3005',
  },
  {
    code: '1160',
    name: '宜春xxwwYU连锁',
    parentCode: '3005',
  },
  {
    code: '3005',
    name: '江西RFYU',
    parentCode: '',
  },
  {
    code: '4007',
    name: '江西RFQweQQ',
    parentCode: '3005',
  },
  {
    code: '4008',
    name: '赣西RFQweQQ',
    parentCode: '3005',
  },
  {
    code: '4017',
    name: '江西健民QweQQ',
    parentCode: '3005',
  },
  {
    code: '4018',
    name: '江西宜春QweQQ',
    parentCode: '3005',
  },
  {
    code: '4020',
    name: '江西RF凯诚LL连锁',
    parentCode: '3005',
  },
  {
    code: '4021',
    name: '江西鹰潭QweQQ',
    parentCode: '3005',
  },
  {
    code: '1138',
    name: '常德QQQ金沅LL',
    parentCode: '3008',
  },
  {
    code: '1139',
    name: '湖南QQQ零售连锁',
    parentCode: '3008',
  },
  {
    code: '3007',
    name: '常德QQQYU',
    parentCode: '3008',
  },
  {
    code: '3008',
    name: '湖南QQQYU',
    parentCode: '',
  },
  {
    code: '4014',
    name: 'QQQ常德QweQQ',
    parentCode: '3008',
  },
  {
    code: '4015',
    name: 'QQQ长沙QweQQ',
    parentCode: '3008',
  },
];

const Demo1: React.FC = () => {
  const [form] = Form.useForm();

  const [pageCurrent, setPageCurrent] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [list, setList] = useState<any[]>([]); // 原始总数据
  const [data, setData] = useState<any[]>([]); // 筛选条件下的总数据
  const [dataSource, setDataSource] = useState<any[]>([]); // 每页的数据

  useEffect(() => {
    form.setFieldsValue({
      name: 'code',
      value: '',
    });
  }, []);

  const columns: ColumnsType<any> = [
    {
      title: '编码',
      dataIndex: 'code',
      key: 'code',
      width: 80,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: {
        showTitle: false,
      },
      width: 150,
      render: (text) => (
        <Tooltip placement='topLeft' title={text}>
          {text}
        </Tooltip>
      ),
    },
  ];

  // 获取分页的数据
  const getDataSource = ({
    totalDataSource,
    pageSize,
    pageNo,
  }: {
    totalDataSource: any[];
    pageSize?: number;
    pageNo?: number;
  }) => {
    const newPageSize = typeof pageSize !== 'undefined' ? pageSize : pageLimit;
    const newPageNo = typeof pageNo !== 'undefined' ? pageNo : pageCurrent;
    const totalPage = Math.ceil(totalDataSource.length / newPageSize);

    if (totalDataSource.length === 0) {
      return [];
    }

    if (newPageNo < totalPage) {
      return totalDataSource.slice((newPageNo - 1) * newPageSize, newPageNo * newPageSize);
    } else {
      return totalDataSource.slice((newPageNo - 1) * newPageSize);
    }
  };

  useEffect(() => {
    const resData =
      LIST.map((item: any) => ({
        ...item,
        id: item.code,
      })) ?? [];
    setList(resData);
    setData(resData);
    setDataSource(
      getDataSource({
        totalDataSource: resData,
      })
    );
  }, []);

  // 搜索
  const onSearch = async (values: any) => {
    const { name, value } = values;
    // 本地筛选过滤显示
    const newData = list.filter((item: any) => {
      return (item[name] + '').includes(value);
    });
    setData(newData);
    setDataSource(
      getDataSource({
        totalDataSource: newData,
        pageNo: 1,
        pageSize: 10,
      })
    );
    setPageCurrent(1);
    setPageLimit(10);
  };

  // 重置搜索结果
  const onReset = async () => {
    setData(list);
    setDataSource(
      getDataSource({
        totalDataSource: list,
        pageNo: 1,
        pageSize: 10,
      })
    );
    setPageCurrent(1);
    setPageLimit(10);
  };

  const onPageChange = (page: number, pageSize: number) => {
    setDataSource(
      getDataSource({
        totalDataSource: data,
        pageNo: page,
        pageSize: pageSize,
      })
    );
    setPageCurrent(page);
    setPageLimit(pageSize);
  };

  const handleShowSizeChange = (current: number, size: number) => {
    setDataSource(
      getDataSource({
        totalDataSource: data,
        pageNo: 1,
        pageSize: size,
      })
    );
    setPageCurrent(1); // 这里将当前页设为 1，以便重新计算页码
    setPageLimit(size);
  };

  const pagination = {
    current: pageCurrent,
    pageSize: pageLimit,
    total: data.length,
    onChange: onPageChange,
    showSizeChanger: true,
    onShowSizeChange: handleShowSizeChange,
    showTotal: (total: number) => `共 ${total} 条记录`,
  };

  return (
    <div>
      <div className='formWrap' style={{ marginTop: 10 }}>
        <Form form={form} onFinish={onSearch} layout='inline'>
          <Form.Item name='name'>
            <Select style={{ width: 120, marginRight: 4 }}>
              <Select.Option key='code' value='code'>
                编码
              </Select.Option>
              <Select.Option key='name' value='name'>
                名称
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name='value'>
            <Input placeholder='请输入' style={{ width: 200 }} />
          </Form.Item>
          <Space>
            <Button type='primary' htmlType='submit'>
              查询
            </Button>
            <Button
              type='ghost'
              onClick={() => {
                form.setFieldsValue({
                  name: 'code',
                  value: '',
                });
                onReset();
              }}
            >
              重置
            </Button>
          </Space>
        </Form>
      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
        size={'small' as SizeType}
        scroll={{
          y: 450,
        }}
        loading={false}
        rowClassName={(_: any, index: number) => {
          let className = 'table-row-odd';
          if (index % 2 === 1) className = 'table-row-even';
          return className;
        }}
        pagination={pagination}
        rowKey={'id'}
      />
    </div>
  );
};

export default Demo1;
