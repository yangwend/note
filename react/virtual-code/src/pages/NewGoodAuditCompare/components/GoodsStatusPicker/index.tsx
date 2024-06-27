import { FC, useState } from 'react';
import { useDeepCompareEffect } from 'ahooks';
import { EditSOutline, CloseCircleOutline } from 'antd-mobile-icons';
import { Picker } from 'antd-mobile';
import { PickerValue } from 'antd-mobile/es/components/picker';
import styles from './index.module.scss';

interface IProps {
  goodStatusDictList: { dictCode: string; dictName: string }[]; // 让他状态下拉列表
  disabled?: boolean;
  value?: PickerValue[]; // 移动端 Picker 选中值不管单选还是多选都是数组形式
  className?: string;
  onChange: (value?: PickerValue[]) => void;
  onDescChange?: () => void; // 注意！desc 改变时也需要往外触发更新重算操作
}

const getDesc = (
  valList: PickerValue[],
  goodStatusDictList: { dictCode: string; dictName: string }[]
) => {
  const validList = valList.filter((val) => !!val);

  if (validList.length > 0) {
    // 单选，取 第0个 即可
    return (
      goodStatusDictList.find((dictItem) => dictItem.dictCode === validList[0])?.dictName ?? ''
    );
  }

  return '请选择';
};

const GoodsStatusPicker: FC<IProps> = ({
  goodStatusDictList,
  disabled = false,
  value: propsValue = [],
  className,
  onChange,
  onDescChange,
}) => {
  const [visible, setVisible] = useState(false);
  // 当前选中的值
  const [value, setValue] = useState<PickerValue[]>([]);
  // 当前选中项值描述
  const [desc, setDesc] = useState<string>('请选择');

  useDeepCompareEffect(() => {
    if ((propsValue || []).length > 0) {
      setValue(propsValue || []);
      setDesc(getDesc(propsValue || [], goodStatusDictList));
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
      <Picker
        title="选择让他状态"
        columns={[
          goodStatusDictList
            .filter((item) => ['02', '04'].includes(item.dictCode))
            .map((item) => ({
              label: item.dictName,
              value: item.dictCode,
            })),
        ]}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        value={value}
        onConfirm={(val, extend) => {
          setValue(val || []);
          setDesc(getDesc(val || [], goodStatusDictList));
          onChange(val || []);
        }}
      />
    </>
  );
};

export default GoodsStatusPicker;
