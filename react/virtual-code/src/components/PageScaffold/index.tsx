import cls from 'classnames';
import { StateLayout } from '@/components';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import { IPageScaffoldProps, PageStatus } from '@/types';
import { SafeArea } from 'antd-mobile';
import styles from './index.module.scss';

const getContent = (
  content?: string | boolean | number | React.ReactNode | (() => React.ReactNode)
) => {
  if (!content) {
    return <div />;
  }
  if (typeof content === 'string' || typeof content === 'number' || typeof content === 'boolean') {
    return content;
  }
  if (typeof content === 'function') {
    return content();
  }
  return content;
};

const PageScaffold: React.FC<IPageScaffoldProps> = ({
  className = '',
  pageStatus = PageStatus.loading,
  pageTitle = '页面标题',
  navbar,
  content,

  onRetry,
  emptyImg,
  emptyTip,
  errorImg,
  errorTip,

  safeAreaStyle = {},
}) => {
  useDocumentTitle(pageTitle);
  return (
    <div className={cls(styles.container, className)}>
      {navbar && (navbar instanceof Function ? navbar() : navbar)}
      {pageStatus === PageStatus.success ? (
        getContent(content)
      ) : (
        <StateLayout
          onRetry={onRetry}
          emptyImg={emptyImg}
          emptyTip={emptyTip}
          errorImg={errorImg}
          errorTip={errorTip}
          pageStatus={pageStatus}
        />
      )}
      <div style={{ ...safeAreaStyle }}>
        <SafeArea position="bottom"></SafeArea>
      </div>
    </div>
  );
};

export default PageScaffold;
