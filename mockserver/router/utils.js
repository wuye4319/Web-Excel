module.exports.deepCopy = function deepCopy (source) {
  return JSON.parse(JSON.stringify(source));
}
