import { FC, useEffect, useState } from 'react';
import { Button, ImageViewer, Input, Tabs } from 'antd-mobile';
import { PageScaffold } from '@/components';
import { GoodsList } from './components';
import { useGoodsRuleConfigApprove } from './hooks';
import styles from './index.module.scss';

const GoodsRuleConfigApprove: FC = () => {
  const {
    pageStatus,
    errorMessage,

    total,
    activeKey,
    onTabChange,
    flowChartUrl,
    processInfoList,

    canEdit,

    allApprove,
    allApproveLoading,
    remark,
    onRemarkChange,
    submitFlowLoading,
    submitFlow,

    listProps,

    imgUrl,
    imageViewerVisible,
    onFileCancel,
  } = useGoodsRuleConfigApprove();

  const [isLandscape, setIsLandscape] = useState<boolean>(false); // 是否横屏展示
  const [clientWidth, setClientWidth] = useState<number>(375); // 动态监听屏幕宽度
  const [clientHeight, setClientHeight] = useState<number>(667); // 动态监听屏幕高度

  const handleResize = () => {
    // 动态监听当前屏幕的宽度
    const html = document.getElementsByTagName('html')[0];
    const clientWidth1 = html.clientWidth;
    const clientHeight1 = html.clientHeight;
    setClientWidth(clientWidth1);
    setClientHeight(clientHeight1);

    // window.orientation属性已经被废弃，不再建议使用。
    // iPhone 的 Safari 浏览器不支持该属性。经验证，在iphone上，获取到的window.orientation是错的
    // 如果需要检测设备的方向，请使用window.matchMedia("(orientation: portrait)")或window.matchMedia("(orientation: landscape)")。

    // 更新是否横屏展示
    setIsLandscape(window.matchMedia('(orientation: landscape)').matches);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize, false);
    return () => {
      window.removeEventListener('resize', handleResize, false);
    };
  }, []);

  useEffect(() => {
    const bottomDomHeight =
      (document.querySelector(`.${styles.bottom}`) as HTMLDivElement)?.offsetHeight ?? 98;
    console.log('bottomDomHeight', bottomDomHeight);
  }, [canEdit, activeKey]);

  console.log('isLandscape', isLandscape, clientWidth, clientHeight);

  return (
    <>
      <PageScaffold
        pageStatus={pageStatus}
        pageTitle="xxx"
        className={styles.wrap}
        content={
          <>
            <GoodsList
                    {...listProps}
                    isLandscape={isLandscape}
                    clientWidth={clientWidth}
                    clientHeight={clientHeight}
                  />
          </>
        }
        emptyTip={'暂无数据'}
        errorTip={errorMessage}
        safeAreaStyle={{
          background: '#f5f6fa',
        }}
      />

      {/* 图片查看 */}
      <ImageViewer
        image={imgUrl}
        visible={imageViewerVisible}
        onClose={onFileCancel}
        getContainer={document.body}
      />
    </>
  );
};

export default GoodsRuleConfigApprove;
