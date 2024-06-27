/* eslint-disable spellcheck/spell-checker */
import { CascadePickerOption } from 'antd-mobile';
import BigNumber from 'bignumber.js';
import { NewGoodCreateByFlowTypes, IPurchaseItem } from '@/types';

export default class PageUtils {
  /**
   * @description 获取对比数据是否展示的相关信息
   * @author yangwen
   * @static
   * @param {NewGoodCreateByFlowTypes.ApplyTypeEnum} type
   * @memberof PageUtils
   */
  static getCompareVisibleInfo = (
    type: NewGoodCreateByFlowTypes.ApplyTypeEnum
  ): {
    compareSteps: boolean; // 44四步对比数据
    compareNotSteps: boolean; // 对比数据选择让他
  } => {
    if (
      [
        NewGoodCreateByFlowTypes.ApplyTypeEnum.SELF,
        NewGoodCreateByFlowTypes.ApplyTypeEnum.BRANCH_INCLUSIVE,
        NewGoodCreateByFlowTypes.ApplyTypeEnum.SOLE_AGENCY,
      ].includes(type)
    ) {
      return {
        compareSteps: true,
        compareNotSteps: false,
      };
    }

    if (
      [
        NewGoodCreateByFlowTypes.ApplyTypeEnum.NOT_SELF,
        NewGoodCreateByFlowTypes.ApplyTypeEnum.NEW_E_PRODUCT,
      ].includes(type)
    ) {
      return {
        compareSteps: false,
        compareNotSteps: true,
      };
    }

    return {
      compareSteps: false,
      compareNotSteps: false,
    };
  };

  /**
   * @description cascader组件构建父子数组结构
   * @author yangwen
   * @static
   * @param {string} key
   * @param {any[]} list
   * @param {string} keyName
   * @param {string} parentKeyName
   * @memberof PageUtils
   */
  static buildRelateKeys = (key: string, list: any[], keyName: string, parentKeyName: string) => {
    let flatList = list || [],
      relationKeys = [key];

    // 通过dictCode找出该节点
    let targetNode = flatList.filter((item: any) => {
      return item[keyName] === key;
    });

    // 通过code一直往上级找
    function travaseNode(targetCode: any) {
      // 通过dictCode找出该节点
      let result = flatList.filter((item: any) => {
        return item[keyName] === targetCode;
      });

      // 找出其父节点然后一直回溯
      if (result.length) {
        let dictCode = result[0][parentKeyName];
        if (dictCode) {
          relationKeys.unshift(dictCode);
          travaseNode(dictCode);
        }
      }
    }

    if (targetNode.length >= 1) {
      travaseNode(targetNode[0][keyName]);
    }

    return relationKeys;
  };

  /**
   * @description 通过扁平化数据转成级联数据
   * @author yangwen
   * @static
   * @param {IPurchaseItem[]} list
   * @memberof PageUtils
   */
  static getPurchaseCascaderList = (list: IPurchaseItem[]) => {
    const map: { [key: string]: number } = {};
    const newList: Array<CascadePickerOption & IPurchaseItem> = [];
    const roots: CascadePickerOption[] = [];

    list.forEach((item, index) => {
      map[item.purchaseCode] = index;
      newList.push({
        ...item,
        label: item.purchaseName,
        value: item.purchaseCode,
        children: undefined, // 默认不能为 []，不然默认组件这一项是子项
      });
    });

    newList.forEach((item) => {
      if (item.nodeLevel !== 1) {
        if (newList[map[item.parentPurchaseCode]]) {
          if (typeof newList[map[item.parentPurchaseCode]].children === 'undefined') {
            newList[map[item.parentPurchaseCode]].children = [item];
          } else {
            newList[map[item.parentPurchaseCode]].children?.push(item);
          }
        }
      } else {
        roots.push(item);
      }
    });

    return roots;
  };

  /**
   * @description 根据屏幕宽度自适应，获取动态的数值
   * @author yangwen
   * @static
   * @param {number} padding
   * @memberof PageUtils
   */
  static calDynamicPadding = (padding: number) => {
    return new BigNumber(window.innerWidth).div(375).times(padding);
  };
}
