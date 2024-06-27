import { FC, useRef, useState } from 'react';
import { NewGoodCreateByFlowTypes } from '@/types';
import { ToolUtil } from '@/utils';
import FixedTable from '@/components/common/FixedTable';
import styles from './index.module.scss';

interface IProps {
  firstList: Partial<NewGoodCreateByFlowTypes.ICompareItem>[];
}

const StepTable: FC<IProps> = ({ firstList }) => {
  const columns = [
    {
      dataIndex: '23',
      title: '23',
      width: 65,
      render: (text: string) => '23',
    },
    {
      dataIndex: '23',
      title: '23',
      width: 65,
      fixed: 'left' as 'left' | 'right',
      render: (text: string) => text || '/',
    },
    {
      dataIndex: '23',
      title: '23',
      width: 115,
      ellipsis: true,
    },
    {
      dataIndex: '23',
      title: '32',
      width: 115,
      ellipsis: true,
    },
    {
      dataIndex: '32',
      title: '32',
      width: 115,
      ellipsis: true,
    },
    {
      dataIndex: '32',
      title: '32',
      width: 65,
    },
    {
      title: '23',
      dataIndex: '23',
      width: 65,
    },
    {
      title: '32',
      dataIndex: '32',
      width: 65,
    },
    {
      dataIndex: '23',
      title: '23',
      width: 115,
      ellipsis: true,
    },
    {
      dataIndex: '32',
      title: '32',
      width: 65,
    },
    {
      dataIndex: '32',
      title: '32',
      width: 65,
    },
    {
      dataIndex: '32',
      title: '32',
      width: 65,
    },
    {
      dataIndex: '32',
      title: '3232',
      width: 90,
    },
    {
      dataIndex: '32',
      title: '32',
      width: 85,
    },
    {
      dataIndex: '32',
      title: '3232',
      width: 85,
    },
    {
      dataIndex: '23',
      title: '23',
      width: 95,
    },
    {
      dataIndex: '23',
      title: '23',
      width: 95,
      render: (text: string) => (!ToolUtil.isEmptyValue(text) ? `${text}%` : '-'),
    },
    {
      dataIndex: '23',
      title: '23',
      width: 90,
    },
    {
      title: '23',
      dataIndex: '23',
      width: 95,
    },
    {
      dataIndex: '23',
      title: '23',
      width: 95,
    },
    {
      dataIndex: '23',
      title: '23',
      width: 95,
    },
    {
      dataIndex: '23',
      title: '32',
      width: 105,
    },
    {
      dataIndex: '23',
      title: '32',
      width: 95,
    },
    {
      dataIndex: '232',
      title: '2323',
      width: 105,
    },
    {
      dataIndex: '232',
      title: '2323',
      width: 105,
    },
  ];

  return <FixedTable className={styles.table} columns={columns} list={firstList} />;
};

export default StepTable;
