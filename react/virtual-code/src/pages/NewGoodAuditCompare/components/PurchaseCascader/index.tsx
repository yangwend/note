import { FC, useState } from 'react';
import { useDeepCompareEffect } from 'ahooks';
import { EditSOutline, CloseCircleOutline } from 'antd-mobile-icons';
import { CascadePicker, CascadePickerOption } from 'antd-mobile';
import { PickerValue } from 'antd-mobile/es/components/picker';
import { IPurchaseItem } from '@/types';
import PageUtils from '../../utils';
import styles from './index.module.scss';

interface IProps {
  purchaseData: IPurchaseItem[];
  disabled?: boolean;
  value?: PickerValue[];
  className?: string;
  onChange: (value?: PickerValue[]) => void;
  onDescChange?: () => void; // 注意！desc 改变时也需要往外触发更新重算操作
}

const getDesc = (valList: PickerValue[], purchaseData: IPurchaseItem[]) => {
  const validList = valList.filter((val) => !!val);

  if (validList.length > 0) {
    return (
      purchaseData.find(
        (purchaseItem) => purchaseItem.purchaseCode === validList[validList.length - 1]
      )?.purchaseName ?? ''
    );
  }

  return '请选择';
};

const PurchaseCascader: FC<IProps> = ({
  purchaseData,
  disabled = false,
  value: propsValue = [],
  className,
  onChange,
  onDescChange,
}) => {
  const [visible, setVisible] = useState(false);
  // 级联选项
  const [options, setOptions] = useState<CascadePickerOption[]>([]);
  // 当前选中的值
  const [value, setValue] = useState<PickerValue[]>([]);
  // 当前选中项值描述
  const [desc, setDesc] = useState<string>('请选择');

  useDeepCompareEffect(() => {
    if (purchaseData) {
      setOptions(PageUtils.getPurchaseCascaderList(purchaseData));
    }
  }, [purchaseData]);

  useDeepCompareEffect(() => {
    if ((propsValue || []).length > 0) {
      setValue(propsValue || []);
      setDesc(getDesc(propsValue || [], purchaseData));
    } else {
      setValue([]);
      setDesc('请选择');
    }
  }, [propsValue]);

  useDeepCompareEffect(() => {
    onDescChange?.();
  }, [desc]);

  return (
    <>
      <div className={`${styles.wrap} ${className}`}>
        <div
          className={`${styles.desc} ${value.length === 0 ? styles.descEmpty : ''}`}
          onClick={() => {
            setVisible(true);
          }}
        >
          {desc}
        </div>
        {!disabled && (
          <div className={styles.btnGroup}>
            {value.length > 0 && (
              <CloseCircleOutline
                onClick={() => {
                  setValue([]);
                  setDesc('请选择');
                  onChange([]);
                }}
                className={styles.closeBtn}
              />
            )}
            <EditSOutline
              onClick={() => {
                setVisible(true);
              }}
              color="#55aff4"
              className={styles.editBtn}
            />
          </div>
        )}
      </div>
      <CascadePicker
        title="选择让他分类"
        options={options}
        visible={visible}
        value={value}
        onClose={() => {
          setVisible(false);
        }}
        onConfirm={(val, extend) => {
          setValue(val || []);
          setDesc(getDesc(val || [], purchaseData));
          onChange(val || []);
        }}
      />
    </>
  );
};

export default PurchaseCascader;
