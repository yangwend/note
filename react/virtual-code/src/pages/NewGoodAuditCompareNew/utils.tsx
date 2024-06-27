import { NewGoodCreateByFlowTypes } from '@/types';

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
}
