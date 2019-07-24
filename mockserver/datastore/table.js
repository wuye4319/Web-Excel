const Mock = require('mockjs');
const { presetCols } = require('./preset');
const getControlOption = require('./control');
const { getUser, getDepart } = require('./user');
const { Random } = Mock;

const getViewData = (sheetId) => ({
  sheetId,
  filter: {
    conjunction: 'and',
    filterSet: [],
  },
  sortBy: null,
  meta: {
    rowHeight: 'short',
    fixedColumns: [],
  },
});

const apps = [{
  id: 'testapp',
  name: '疾风MVP演示应用',
}];
const tableId = 'AAA7f25B-8435-E39f-285f-dEf2cc0fAC19';
const sheets = [{
  id: tableId,
  name: '商品信息表',
  appId: 'testapp',
  // cols: [],
  // rows: [],
}];

const randomCols = [];
const views = [];

for (let i = 0; i < 3; i++) {
  const colType = [
    'FormTextBox',
    'FormTextArea',
    'FormAreaSelect',
  ][Random.integer(0, 2)];
  randomCols.push({
    id: Random.word(8),
    tableId,
    name: Mock.mock('@cword(3, 8)'),
    colType,
    sortRank: i * 10 + 300,
    controlOptions: getControlOption(),
    visibility: true,
    valueType: 'string',
    width: Random.integer(180, 400),
    summary: null,
  });
}

let cols = [...presetCols, ...randomCols];

cols.forEach((col) => {
  col.tableId = tableId;
});

// tableData.cols = mockCols;

let rows = [];
for (let i = 0; i < 1000; i++) {
  let rowData = createrow()
  rows.push(rowData);
}

function createrow() {
  const user = getUser();
  const depart = getDepart();
  const fileExt = Random.pick(['.xlsx', '.jpg', '.mp4', '.doc', '.pdf', '.avi', '.mp3', '.pdf', '.zip']);
  const imgList = ['/images/pro1.jpeg', '/images/productimg.jpg', '/images/pro2.jpeg', '/images/pro3.png', '/images/pro4.jpg', '/images/pro5.jpg']
  const rowData = {
    productImg: Random.shuffle(imgList).slice(0, 2),
    productName: Random.cword(4, 8),
    storeAddress: Random.county(true),
    price: Random.natural(0, 5000),
    brand: Random.pick(['苹果', '华为', '小米', '魅族', '诺基亚', 'LV', 'GUCCI', 'PRADA']),
    storeKeeper: {
      id: user.id,
      name: user.name,
      avatar: `/images/head/${Random.integer(1, 15)}.png`,
    },
    expenseDepart333333: {
      id: depart.id,
      name: depart.name,
    },
    expenseDetail: {
      id: Random.guid(),
      title: [Random.ctitle(5, 10), Random.ctitle(5, 10), Random.ctitle(5, 10)],
      rowCount: Random.integer(10, 999),
      tableId: tableId
    },
    listFile: {
      id: Random.guid(),
      size: Random.integer(20, 800) + Random.pick(['KB', 'MB']),
      extension: fileExt,
      fileName: Random.cword(2, 6) + fileExt,
    },
    level: Random.pick(['低', '中', '高']),
    categoryChoose: Random.shuffle(['数码', '配饰', '服装', '箱包', '食品', '文体', '母婴']).slice(0, 2),
    onSaleTime: getDateTime(Random.datetime('yyyy-MM-dd HH:mm:ss')),
    description: Random.paragraph(1, 3),
  };
  randomCols.forEach((col) => {
    rowData[col.id] = Random.word(20);
  });
  let tempRows = {
    id: Random.guid(),
    tableId,
    createdTime: Random.now(),
    cellValues: rowData,
  }
  return tempRows
}

function getDateTime(datetime) {
  let tempTime = {}
  tempTime.date = datetime
  let part1 = datetime.split(' ')[0].split('-')
  let part2 = datetime.split(' ')[1].split(':')
  let d = new Date()
  d.setFullYear(part1[0])
  d.setMonth(part1[1] - 1)
  d.setDate(part1[2])
  d.setHours(part2[0])
  d.setMinutes(part2[1])
  d.setSeconds(part2[2])
  tempTime.time = Date.parse(d)
  return tempTime
}

views.push(getViewData(tableId));

// 生成随机表格代码
function generateSheet(sheetId, colCount = 3, rowCount = 0) {
  const sheet = {
    id: sheetId,
    name: Random.cword(2, 6),
    appId: 'testapp',
  }
  const tempCols = [];
  for (let i = 0; i < colCount; i++) {
    const colType = [
      'FormTextBox',
      'FormTextArea',
      'FormAreaSelect',
    ][Random.integer(0, 2)];
    tempCols.push({
      id: Mock.Random.word(8),
      tableId: sheetId,
      name: Mock.mock('@cword(3, 8)'),
      colType,
      controlOptions: getControlOption(colType),
      sortRank: (i + 1) * 10,
      visibility: true,
      valueType: 'string',
      width: 180,
      summary: null,
    });
  }
  const tempRows = [];
  for (let i = 0; i < rowCount; i++) {
    const rowData = {};
    tempCols.forEach(col => {
      rowData[col.id] = Random.word(4, 12);
    });
    tempRows.push({
      id: Random.guid(),
      tableId: sheetId,
      createdTime: Random.now(),
      cellValues: rowData,
    });
  }
  rows = rows.concat(tempRows);
  cols = cols.concat(tempCols);
  sheets.push(sheet);
  views.push(getViewData(sheetId));
}

generateSheet('1fCcFEEe-81de-9DAc-cb86-EAE8f5b8b46F', 5, 200);
generateSheet('04A80C1c-67Ef-B18c-1cbd-3A7c1e6809E9', 3, 0);

module.exports = {
  apps,
  sheets,
  rows,
  cols,
  views,
  createrow: createrow()
};
