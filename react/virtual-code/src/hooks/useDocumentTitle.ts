
import { DocumentUtil } from '@/utils';
import { useLayoutEffect } from 'react';

/**
 * @description: 更新页面标题hooks，注意，SSR模式下不可用
 * @param {string} title
 * @return {*}
 */
function useDocumentTitle(title: string): void {
  useLayoutEffect(() => {
    DocumentUtil.updateTitle(title);
  }, [title]);
}

export default useDocumentTitle;
