/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Image } from 'antd-mobile';
import { ImageAssets } from '@/assets';
import Loading from '../Loading';
import styles from './index.module.scss';
import { PageStatus } from '@/types';

export interface IStateLayoutProps {
  pageStatus: PageStatus;
  onRetry?: () => void;
  emptyImg?: string | React.ReactNode | (() => React.ReactNode);
  emptyTip?: string | React.ReactNode | (() => React.ReactNode);
  errorImg?: string | React.ReactNode | (() => React.ReactNode);
  errorTip?: string | React.ReactNode | (() => React.ReactNode);
}

const getTip = (tip?: string | React.ReactNode | (() => React.ReactNode)) => {
  if (!tip) {
    return <p></p>;
  }
  if (typeof tip === 'string') {
    return <p>{tip}</p>;
  }
  if (typeof tip === 'function') {
    return tip();
  }
  return tip;
};

const getImg = (img?: string | React.ReactNode | (() => React.ReactNode)) => {
  if (!img) {
    return <p></p>;
  }
  if (typeof img === 'string') {
    return <Image alt="" src={img} className={styles.emptyImg} />;
  }
  if (typeof img === 'function') {
    return img();
  }
  return img;
};

const StateLayout: React.FC<IStateLayoutProps> = ({
  pageStatus = PageStatus.loading,
  emptyImg = () => (
    <Image src={ImageAssets.empty.pic_default_empty} className={styles.defaultImg} />
  ),
  emptyTip = '暂无数据',
  errorImg = () => (
    <Image src={ImageAssets.error.pic_default_error} className={styles.defaultImg} />
  ),
  errorTip = '网络异常，请稍后重试~',
  onRetry = () => {},
}: IStateLayoutProps) => {
  if (pageStatus === PageStatus.loading) {
    return <Loading />;
  } else if (pageStatus === PageStatus.empty) {
    return (
      <div className={styles.fullScreenCenter} onClick={onRetry}>
        {getImg(emptyImg)}
        {getTip(emptyTip)}
      </div>
    );
  } else if (pageStatus === PageStatus.error) {
    return (
      <div className={styles.fullScreenCenter} onClick={onRetry}>
        {getImg(errorImg)}
        {getTip(errorTip)}
      </div>
    );
  }
  return null;
};

export default StateLayout;
