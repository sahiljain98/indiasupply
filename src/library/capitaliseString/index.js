

/**
* Capitalise First Letter in List
* @param {*} str 
*/
capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


module.exports = {
    capitalize:capitalize
}


