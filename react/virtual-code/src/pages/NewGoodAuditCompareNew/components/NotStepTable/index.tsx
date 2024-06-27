import { FC, useRef, useState } from 'react';
import { NewGoodCreateByFlowTypes } from '@/types';
import FixedTable from '@/components/common/FixedTable';
import styles from './index.module.scss';

interface IProps {
  notStepsList: Partial<NewGoodCreateByFlowTypes.ICompareItem>[];
}

const NotStepTable: FC<IProps> = ({ notStepsList }) => {
  const columns = [
    {
      dataIndex: '23',
      title: '23',
      width: 65,
    },
    {
      dataIndex: '23',
      title: '23',
      width: 115,
      ellipsis: true,
    },
    {
      dataIndex: '23',
      title: '23',
      width: 115,
      ellipsis: true,
    },
    {
      dataIndex: '33',
      title: '33',
      width: 115,
      ellipsis: true,
    },
    {
      dataIndex: '33',
      title: '33',
      width: 70,
    },
    {
      dataIndex: '33',
      title: '33',
      width: 85,
    },
    {
      dataIndex: '33',
      title: '33',
      width: 85,
    },
  ];

  return <FixedTable className={styles.table} columns={columns} list={notStepsList} />;
};

export default NotStepTable;
