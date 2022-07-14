const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/**
 * @description 数组根据 sortKey(某个值) order(顺序) 进行排序(冒泡排序、默认按照升序排序)
 * @author yangwend
 * @param {*} list 需要排序的数组
 * @param {*} sortKey 依据的某个值
 * @param {*} order ascending(升序) / descending(降序)
 */
const sortDataList = (list, sortKey, order = 'ascending') => {
    list = list || [];

    for (let j = 0; j < list.length - 1; j++) {
        for (let i = 0; i < list.length - 1 - j; i++) {
            if (order === 'ascending') { // 升序
                if (list[i][sortKey] > list[i + 1][sortKey]) {
                    let temp = list[i];
                    list[i] = list[i + 1];
                    list[i + 1] = temp;
                }
            } else if (order === 'descending') { // 降序
                if (list[i][sortKey] < list[i + 1][sortKey]) {
                    let temp1 = list[i];
                    list[i] = list[i + 1];
                    list[i + 1] = temp1;
                }
            }
        }
    }
    return list;
}

module.exports = {
    formatTime: formatTime,
    sortDataList: sortDataList
}