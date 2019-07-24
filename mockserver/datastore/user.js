const Random = require('mockjs').Random;

const users = [{
  id: Random.guid(),
  name: Random.cname(),
  isAdmin: true,
}, {
  id: Random.guid(),
  name: Random.cname(),
  isAdmin: true,
}, {
  id: Random.guid(),
  name: Random.cname(),
  isAdmin: true,
}, {
  id: Random.guid(),
  name: '高木生',
  isAdmin: true,
}, {
  id: Random.guid(),
  name: Random.cname(),
  isAdmin: false,
}, {
  id: Random.guid(),
  name: Random.cname(),
  isAdmin: false,
}, {
  id: Random.guid(),
  name: Random.cname(),
  isAdmin: false,
}, {
  id: Random.guid(),
  name: Random.cname(),
  isAdmin: false,
}];

const departs = [{
  id: Random.guid(),
  name: '研发部'
}, {
  id: Random.guid(),
  name: '售后部'
}, {
  id: Random.guid(),
  name: '行政部'
}, {
  id: Random.guid(),
  name: '运营部'
}, {
  id: Random.guid(),
  name: '销售部'
}];

module.exports.getUser = function getUser() {
  const index = Random.integer(0, users.length - 1);
  return users[index];
};

module.exports.getDepart = function getDepart() {
  const index = Random.integer(0, departs.length - 1);
  return departs[index];
};

module.exports.departList = function departList() {
  return departs
};

module.exports.userList = function userList() {
  return users
};
