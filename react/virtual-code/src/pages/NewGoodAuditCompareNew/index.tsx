import { FC, useState, useEffect } from 'react';
import { PageScaffold } from '@/components';
import { NotStepTable, StepTable } from './components';
import { useAuditCompare } from './hooks';
import PageUtils from './utils';
import styles from './index.module.scss';

const NewGoodAuditCompare: FC = () => {
  const { pageTitle, pageStatus, errorMessage, basicInfo, notStepTableProps, stepTableProps } =
    useAuditCompare();

  // 页面宽高处理
  const forceLandscapeScreen = () => {
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    const width = html.clientWidth;
    const height = html.clientHeight;
    console.log('页面宽高->', width, height);
    const max = width > height ? width : height;
    const min = width > height ? height : width;
    body.style.width = max + 'px';
    body.style.height = min + 'px';
  };

  useEffect(() => {
    forceLandscapeScreen();

    // 此种判断方式没错，可以考虑采用它，但是 resize 性能更好，可以针对页面任何的 resize 做监听，故优先采用 resize
    // const evt = 'onorientationchange' in window ? 'orientationchange' : 'resize';
    window.addEventListener('resize', forceLandscapeScreen, false);
    return () => {
      window.removeEventListener('resize', forceLandscapeScreen, false);
    };
  }, []);

  return (
    <PageScaffold
      pageStatus={pageStatus}
      pageTitle={pageTitle}
      className={styles.wrap}
      content={
        <>
          <div className={styles.main}>
            {/* 对比数据列表——纯展示（非四步） */}
            {basicInfo?.applyType &&
              PageUtils.getCompareVisibleInfo(basicInfo?.applyType).compareNotSteps && (
                <NotStepTable {...notStepTableProps} />
              )}
            {/* 对比数据 展示（四步） */}
            {basicInfo?.applyType &&
              PageUtils.getCompareVisibleInfo(basicInfo?.applyType).compareSteps && (
                <StepTable {...stepTableProps} />
              )}
          </div>
        </>
      }
      emptyTip={'暂无对比数据'}
      errorTip={errorMessage}
      safeAreaStyle={{
        background: '#fff',
      }}
    />
  );
};

export default NewGoodAuditCompare;
