function toFixedIfNecessary(value, dp) {
    return +parseFloat(value).toFixed(dp);
}

export default toFixedIfNecessary;
