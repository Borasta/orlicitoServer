module.exports = function (param) {
    var arr = [];
    for( var i = 0; i < param.length; i++)
        if( param[i] )
            arr.push(param[i]);
        else
            return false;

    return arr;
};