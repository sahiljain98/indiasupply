/**
    * get data w.r.t key in array
    * @param {*} attribute given attribute
    * @param {*} key given key
    * @param {*} array given array
    * return value else null 
    */
getDataByParameter = (array, key, attribute) => {
    if (array && array.length > 0)
        for (let i = 0; i < array.length; i++) {
            if (array[i][key] == attribute) {
                return array[i].value;
            }
        }
    else return null;
}


module.exports = {
    getDataByParameter: getDataByParameter
}