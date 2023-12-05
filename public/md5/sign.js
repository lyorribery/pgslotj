/**
 * md5参数加密算法
 * @param {*} data 
 */
function changeMd5(data) {
    return md5(encodeURIComponent(jsonSort(data))).toUpperCase()
}

function jsonSort(jsonObj) {
    let paramObj = {}
    for (let i in jsonObj) {
        if (typeof jsonObj[i] != 'boolean' && typeof jsonObj[i] != 'number' && jsonObj[i] != null && jsonObj[i] != '') {
            paramObj[i] = typeof jsonObj[i] == 'string' ? jsonObj[i].replace(/\s*/g, "") : jsonObj[i]
        } else if (typeof jsonObj[i] == 'boolean' || typeof jsonObj[i] == 'number') {
            paramObj[i] = jsonObj[i]
        }
    }
    let arr = []
    for (let key in paramObj) {
        arr.push(key)
    }
    arr.sort()
    let str = ''
    for (let i in arr) {
        str += arr[i] + "=" + paramObj[arr[i]] + "&"
    }
    return str.substr(0, str.length - 1)
}