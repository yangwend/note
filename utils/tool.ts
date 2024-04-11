/**
 * 工具类
 */

interface ICity {
  label?: string; // 名称
  value?: string; // 编码
  children?: ICity[];
}

/**
 * @description 根据特定城市/区获取对应的省市区数组
 * @param {*} cityList 所有的省市区列表
 * @param {*} city 特定城市
 * @returns
 */
export const getCurrCityArrByCity = (cityList: ICity[], city: string) => {
  if (!city || cityList.length === 0) {
    return undefined;
  }

  let currCityArr = undefined;
  for (let i = 0; i < cityList.length; i++) {
    const item = cityList[i];
    if (item.label === city) {
      currCityArr = [city];
      break;
    }

    if (item.children && item.children.length > 0) {
      for (let j = 0; j < item.children.length; j++) {
        const childItem = item.children[j];
        if (childItem.label === city) {
          currCityArr = [item.label, childItem.label];
          break;
        }

        if (childItem.children && childItem.children.length > 0) {
          for (let k = 0; k < childItem.children.length; k++) {
            const childChildItem = childItem.children[k];
            if (childChildItem.label === city) {
              currCityArr = [item.label, childItem.label, childChildItem.label];
              break;
            }
          }
        }
      }
    }
  }

  return currCityArr;
};
