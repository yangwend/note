import { useState } from 'react';

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>;

function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedValue, setCopiedValue] = useState<CopiedValue>(null);

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard is not supported.');
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopiedValue(text);
      return true;
    } catch (err) {
      console.warn('Copy failed: ' + err);
      setCopiedValue(null);
      return false;
    }
  };

  return [copiedValue, copy];
}

export default useCopyToClipboard;
