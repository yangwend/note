/* eslint-disable spellcheck/spell-checker */
import { FC, useState, useEffect } from 'react';
import { Button } from 'antd-mobile';
import { PageScaffold } from '@/components';
import { NotStepTable, StepTabs } from './components';
import { useAuditCompare } from './hooks';
import PageUtils from './utils';
import styles from './index.module.scss';

const NewGoodAuditCompare: FC = () => {
  const {
    pageTitle,
    pageStatus,
    errorMessage,
    canEdit,
    basicInfo,
    tabInfo,
    notStepTableProps,
    stepTabsProps,
    saveLoading,
    onBack,
    onSave,
  } = useAuditCompare();

  const [bottomHeight, setBottomHeight] = useState<number>(44); // 底部操作按钮的高度

  useEffect(() => {
    setBottomHeight(
      (document.querySelector(`.${styles.bottom}`) as HTMLDivElement)?.offsetHeight ?? 44
    );
  }, [basicInfo?.applyType, tabInfo?.firstTabShow, tabInfo?.secTabShow, canEdit]);

  return (
    <PageScaffold
      pageStatus={pageStatus}
      pageTitle={pageTitle}
      className={styles.wrap}
      content={
        <>
          <div className={styles.main}>
            {/* 对比数据列表——纯展示 */}
            {basicInfo?.applyType &&
              PageUtils.getCompareVisibleInfo(basicInfo?.applyType).compareNotSteps && (
                <NotStepTable
                  pageTitle={pageTitle}
                  {...notStepTableProps}
                  bottomHeight={bottomHeight}
                />
              )}
            {/* 让他分类和让他状态审批 */}
            {basicInfo?.applyType &&
              PageUtils.getCompareVisibleInfo(basicInfo?.applyType).compareSteps &&
              (tabInfo?.firstTabShow || tabInfo?.secTabShow) && (
                <StepTabs pageTitle={pageTitle} {...stepTabsProps} bottomHeight={bottomHeight} />
              )}
          </div>
          <div className={styles.bottom}>
            {/* 对比23数据列表——纯展示：只需要展示返回按钮即可 */}
            {basicInfo?.applyType &&
              PageUtils.getCompareVisibleInfo(basicInfo?.applyType).compareNotSteps && (
                <Button color="primary" fill="outline" className={styles.backBtn} onClick={onBack}>
                  返回
                </Button>
              )}
            {/* 让他w3分类和让他状态审批：展示返回和保存按钮 */}
            {basicInfo?.applyType &&
              PageUtils.getCompareVisibleInfo(basicInfo?.applyType).compareSteps &&
              (tabInfo?.firstTabShow || tabInfo?.secTabShow) && (
                <>
                  <Button
                    color="primary"
                    fill="outline"
                    className={canEdit ? styles.leftBtn : styles.backBtn}
                    disabled={saveLoading}
                    onClick={onBack}
                  >
                    返回
                  </Button>
                  {canEdit && (
                    <Button
                      color="primary"
                      fill="solid"
                      className={styles.rightBtn}
                      loading={saveLoading}
                      onClick={onSave}
                    >
                      保存
                    </Button>
                  )}
                </>
              )}
          </div>
        </>
      }
      emptyTip={'暂无数据'}
      errorTip={errorMessage}
      safeAreaStyle={{
        background: '#fff',
      }}
    />
  );
};

export default NewGoodAuditCompare;
