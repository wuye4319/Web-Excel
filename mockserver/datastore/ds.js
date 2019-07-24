const tableDs = require('./table');
const userDs = require('./user');

module.exports = (function () {
  // tableData.rows = rows;
  return Object.assign({}, tableDs);
}());
