
exports.cmTo_Ft_In = (size) => {
    size = Number(size)
    return {
        cm: size,
        ft: size * 0.0328084,
        inch: size * 0.393701
    }
}
