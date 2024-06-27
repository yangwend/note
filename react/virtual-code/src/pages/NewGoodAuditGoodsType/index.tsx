import { FC, useState, useEffect } from 'react';
import { Button } from 'antd-mobile';
import { PageScaffold } from '@/components';
import { PageStatus } from '@/types';
import { StepTable } from './components';
import { useAuditGoodsType } from './hooks';
import styles from './index.module.scss';

const NewGoodAuditGoodsType: FC = () => {
  const {
    pageTitle,
    pageStatus,
    errorMessage,
    canEdit,
    basicInfo,
    stepTableProps,
    saveLoading,
    onBack,
    onSave,
  } = useAuditGoodsType();

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
      pageStatus={stepTableProps.secLoading ? PageStatus.loading : pageStatus}
      pageTitle={pageTitle}
      className={styles.wrap}
      content={
        <>
          <div className={`${canEdit ? styles.mainShort : styles.main}`}>
            {/* 配置状态审批 */}
            {basicInfo?.applyType && <StepTable {...stepTableProps} />}
          </div>
          {canEdit && (
            <div className={styles.bottom}>
              <Button
                color="primary"
                fill="outline"
                className={styles.btn}
                disabled={saveLoading}
                onClick={onBack}
              >
                返回
              </Button>
              <Button
                color="primary"
                fill="solid"
                className={styles.btn}
                loading={saveLoading}
                onClick={onSave}
              >
                保存
              </Button>
            </div>
          )}
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

export default NewGoodAuditGoodsType;
