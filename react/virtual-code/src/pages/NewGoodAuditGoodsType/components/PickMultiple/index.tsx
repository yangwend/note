import { FC, useState } from 'react';
import { useDeepCompareEffect } from 'ahooks';
import { RightOutline } from 'antd-mobile-icons';
import { CenterPopup, CheckList, Ellipsis } from 'antd-mobile';
import { IStoreGroupTypeItem } from '@/types';
import styles from './index.module.scss';

interface IProps {
  groupList: IStoreGroupTypeItem[]; // 有门店的门店分组数据
  value?: string[];
  onChange?: (value?: string[]) => void;
}

const getDesc = (valList: string[], groupList: IStoreGroupTypeItem[]) => {
  const validList = valList.filter((val) => !!val);

  if (validList.length > 0) {
    return groupList
      .filter((groupItem) => validList.includes(groupItem.groupCode))
      .map((groupItem) => groupItem.groupName)
      .join(',');
  }

  return '请选择';
};

const PickMultiple: FC<IProps> = ({ groupList, value: propsValue, onChange }) => {
  const [visible, setVisible] = useState(false);
  // 当前选择的值
  const [value, setValue] = useState<string[]>([]);
  // 弹窗中多选选择的值
  const [checkedList, setCheckedList] = useState<string[]>([]);
  // 当前选中项值描述
  const [desc, setDesc] = useState<string>('请选择');

  useDeepCompareEffect(() => {
    if ((propsValue || []).length > 0) {
      setValue(propsValue || []);
      setDesc(getDesc(propsValue || [], groupList));
    } else {
      setValue([]);
      setDesc('请选择');
    }
  }, [propsValue]);

  return (
    <>
      <div
        className={`${styles.picker} ${value.length === 0 ? styles.pickerEmpty : ''}`}
        onClick={() => {
          setVisible(true);
          setCheckedList(value);
        }}
      >
        <Ellipsis direction="end" content={desc} />
        <RightOutline color="#999" className={styles.rightIcon} />
      </div>
      <CenterPopup
        getContainer={document.body}
        visible={visible}
        destroyOnClose
        onMaskClick={() => {
          setVisible(false);
        }}
        onClose={() => {
          setVisible(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
        maskStyle={{ background: 'rgb(0 0 0 / 50%)' }}
      >
        <div className={styles.top}>
          <div
            onClick={() => {
              setVisible(false);
            }}
            className={styles.topLeft}
          >
            取消
          </div>
          <div className={styles.topMiddle}>选择门店分组</div>
          <div
            className={styles.topRight}
            onClick={() => {
              setVisible(false);
              setValue(checkedList);
              setDesc(getDesc(checkedList, groupList));
              onChange?.(checkedList);
            }}
          >
            确定
          </div>
        </div>
        <div className={styles.checkListContainer}>
          <CheckList
            multiple
            value={checkedList}
            onChange={(val: string[]) => {
              setCheckedList(val || []);
            }}
            className={styles.myCheckList}
          >
            {groupList.map((groupItem) => (
              <CheckList.Item value={groupItem.groupCode} key={groupItem.groupCode}>
                {groupItem.groupName}
              </CheckList.Item>
            ))}
          </CheckList>
        </div>
      </CenterPopup>
    </>
  );
};

export default PickMultiple;
