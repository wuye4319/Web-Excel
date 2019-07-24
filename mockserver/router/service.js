const { deepCopy } = require('./utils');
const Mock = require('mockjs');
const orderBy = require('lodash/orderBy');
const lodashFilter = require('lodash/filter');
const Random = Mock.Random;
const { userList, departList } = require('../datastore/user');

function getValueType(type) {
  return {
    'FormTextBox': 'string',
    'FormTextArea': 'string',
    'FormRadioButtonList': 'string',
    'FormDateTime': 'date',
    'FormCheckboxList': 'string',
    'FormDropdownList': 'string',
    'FormNumber': 'number',
    'FormPhoto': 'image',
    'FormAttachment': 'file',
    'FormAreaSelect': 'string',
    'FormMap': 'string',
    'FormUser': 'guid',
    'FormQuery': 'guid',
    'FormMultiUser': 'guid',
    'FormMultiQuery': 'guid',
    'FormGridView': 'grid',
  }[type];
}

function convertViewData(data, extra = {}) {
  return Object.assign({
    filter: data.filter,
    sortBy: data.sortBy,
    meta: data.meta,
    colActions: {
      view: [
        { code: 'filter', text: '筛选' },
        { code: 'hide', text: '隐藏此列' }
      ],
      data: [
        { code: 'modify', text: '设置列属性' },
        { code: 'leftInsert', text: '左侧插入列' },
        { code: 'rightInsert', text: '右侧插入列' },
        { code: 'delete', text: '删除此列' },
      ],
    }
  }, extra);
}

module.exports = function injectService(ds) {
  const { apps, sheets, rows, cols, views, createrow } = ds;
  return {
    getSheetById(id, pageIndex = 0, pageSize = 100) {
      console.log(id)
      pageIndex = Number.isNaN(Number(pageIndex)) ? 0 : Number(pageIndex);
      pageSize = Number.isNaN(Number(pageSize)) ? 100 : Number(pageSize);
      let skipNum = Number(pageIndex) * Number(pageSize);
      const result = {};
      const sheet = sheets.find(s => s.id === id);
      if (sheet) {
        const tableRows = rows.filter(r => r.tableId === id);
        const rowsCount = tableRows.length;
        skipNum = skipNum > rowsCount ? 0 : skipNum;
        const pageCount = Math.ceil(rowsCount / pageSize);
        const viewData = views.find(v => v.sheetId === id);
        if (viewData) {
          result.viewData = convertViewData(viewData, {
            pagnition: {
              rowsCount: rowsCount,
              currentPage: pageIndex,
              pageCount,
              pageSize,
            }
          });
          let resRows = tableRows;
          if (viewData.filter && viewData.filter.filterSet && viewData.filter.filterSet.length > 0) {
            // 多条件联合筛选
            resRows = lodashFilter(resRows, (row) => {
              const filters = viewData.filter.filterSet;
              const values = row.cellValues;
              let result = []
              filters.forEach((f) => {
                let { columnId, operator, value } = f;
                if (columnId in values) {
                  let cellvalue = JSON.stringify(row.cellValues[f.columnId])
                  let rule
                  switch (operator) {
                    case 'empty':
                      rule = !cellvalue
                      rule ? result.push(true) : result.push(false)
                      break;
                    case 'filled':
                      rule = cellvalue
                      rule ? result.push(true) : result.push(false)
                      break;
                    case 'contains':
                      if (Array.isArray(value)) {
                        rule = false
                        value.forEach(v => {
                          if (cellvalue.indexOf(v) !== -1) {
                            rule = true
                          }
                        })
                        result.push(rule)
                      } else {
                        rule = cellvalue.indexOf(value) !== -1
                        result.push(rule)
                      }
                      break;
                    case 'filetype':
                      if (Array.isArray(value)) {
                        rule = false
                        value.forEach(v => {
                          v = v.toLocaleLowerCase()
                          if (cellvalue.indexOf(v) !== -1) {
                            rule = true
                          }
                        })
                        result.push(rule)
                      } else {
                        value = value.toLocaleLowerCase()
                        rule = cellvalue.indexOf(value) !== -1
                        result.push(rule)
                      }
                      break;
                    case 'range':
                      let min = (value.min ? parseInt(cellvalue) > value.min : true)
                      let max = (value.max ? parseInt(cellvalue) < value.max : true)
                      rule = (min && max)
                      result.push(rule)
                      break;
                    case 'rangedate':
                      let currtime = JSON.parse(cellvalue).time
                      let mindate = (currtime > Date.parse(value[0]))
                      let maxdate = (currtime < Date.parse(value[1]))
                      rule = (mindate && maxdate)
                      result.push(rule)
                      break;
                  }
                }
              })
              return eval(result.join(' && '))
            })
          }
          if (viewData.sortBy) {
            resRows = orderBy(resRows, (row) => {
              const columnId = viewData.sortBy.columnId;
              return row.cellValues[columnId];
            }, viewData.sortBy.type);
          }
          if (viewData.delete) {
            viewData.delete.rowsId.forEach(d => {
              resRows = resRows.filter(f => f.id !== d)
            })
          }
          if (viewData.add) {
            resRows.push(viewData.add.createrow)
          }
          resRows = resRows.slice(skipNum, skipNum + pageSize);
          const resCols = cols.filter(c => c.tableId === id).sort((a, b) => a.sortRank - b.sortRank);
          result.id = sheet.id;
          result.name = sheet.name;
          result.rows = resRows;
          result.cols = resCols;
          return result;
        }
      }
      return null;
    },
    getAppById(id) {
      return apps.find(a => a.id === id);
    },
    getAppSheets(appId) {
      return sheets.filter(s => s.appId === appId);
    },
    addSheet(data) {
      if (data && data.name) {
        const sheetId = Random.guid();
        const sheet = {
          id: sheetId,
          name: data.name.toString(),
          appId: data.appId.toString(),
        };
        sheets.push(sheet);
        const defaultCols = [{
          id: Random.word(8),
          tableId: sheetId,
          name: '名称',
          colType: 'FormTextBox',
          controlOptions: {},
          visibility: true,
          valueType: 'string',
          width: 180,
          summary: null,
        }, {
          id: Random.word(8),
          tableId: sheetId,
          name: '描述',
          colType: 'FormTextArea',
          controlOptions: {},
          visibility: true,
          valueType: 'string',
          width: 180,
          summary: null,
        }];
        const defaultRowValues = {};
        defaultCols.forEach((col) => {
          cols.push(col);
          defaultRowValues[col.id] = '';
        });
        const defaultRow = {
          id: Random.guid(),
          tableId: sheetId,
          createdTime: Random.now(),
          cellValues: defaultRowValues,
        };
        rows.push(defaultRow);
        views.push(convertViewData({
          filter: null,
          sortBy: null,
          meta: {
            rowHeight: 'short',
            fixedColumns: [],
          },
        }, { sheetId }));
        return this.getSheetById(sheetId);
      }
    },
    createColumn(colData) {
      const col = {
        id: Random.guid(),
        tableId: colData.sheetId,
        name: colData.name,
        colType: colData.colType || 'FormTextBox',
        controlOptions: colData.controlOptions || {},
        sortRank: colData.sortRank,
        visibility: true,
        valueType: colData.colType ? getValueType(colData.colType) : 'string',
        width: 180,
        summary: null,
      };
      cols.push(col);
      return col;
    },
    updateColumn(id, colData) {
      const { sheetId, controlOptions, colType, name } = colData;
      const col = cols.find(c => c.id === id && c.tableId === sheetId);
      if (col) {
        if (controlOptions) {
          try {
            col.controlOptions = controlOptions;
          } catch (e) { }
        }
        if (colType) {
          col.colType = colType;
        }
        if (name) {
          col.name = name;
        }
        return col;
      }
      return null;
    },
    hideColumn(type, data) {
      if (type === '1') {
        const { sheetId, id, visibility, oldwidth } = data;
        const col = cols.find(c => c.id === id && c.tableId === sheetId);
        if (col) {
          col.visibility = visibility
          col.oldwidth = oldwidth || ''
        }
        return col;
      } else if (type === '2') {
        let col
        data.forEach((d) => {
          const { sheetId, id, visibility, oldwidth } = d;
          col = cols.find(c => c.id === id && c.tableId === sheetId);
          if (col) {
            col.visibility = visibility
            col.oldwidth = oldwidth || ''
          }
        })
        return col;
      }
    },
    updateColumnWidth(id, width) {
      const col = cols.find(c => c.id === id);
      if (col) {
        col.width = width;
        return true;
      }
      return false;
    },
    updateColumnSort(id, targetIndex) {
      const col = cols.find(c => c.id === id);
      if (col) {
        const sheet = this.getSheetById(col.tableId);
        const shhetCols = sheet.cols;
        const prev = shhetCols[targetIndex - 1];
        const target = shhetCols[targetIndex];
        const resultSort = (prev ? prev.sortRank : 0 + target.sortRank) / 2;
        col.sortRank = resultSort;
        return true;
      }
      return false;
    },
    getColumn(id) {
      return cols.find(col => col.id === id);
    },
    getFilterList(id, data) {
      let { type } = data
      if (type === 'user') {
        return userList()
      } else if (type === 'depart') {
        return departList()
      }
    },
    addRows(data) {
      const viewData = views.find(v => v.sheetId === data.sheetId);
      if (viewData) {
        viewData.add = data
        viewData.add.createrow = createrow
      }
      return viewData
    },
    deleteRows(data) {
      const viewData = views.find(v => v.sheetId === data.sheetId);
      if (viewData) {
        viewData.delete = data
      }
      return viewData
    },
    updateView(sheetId, data) {
      const viewData = views.find(v => v.sheetId === sheetId);
      if (viewData) {
        let { filter, sortBy, meta } = data;
        try {
          sortBy = JSON.parse(sortBy);
          filter = JSON.parse(filter);
          meta = JSON.parse(meta);
        } catch (e) { }
        if ('filter' in data) {
          if (filter) {
            viewData.filter = {
              conjunction: filter.conjunction,
              filterSet: filter.filterSet && filter.filterSet.length ? filter.filterSet.map(f => {
                let tempcols = cols.find(col => col.id === f.columnId);
                return {
                  id: f.id || Random.guid(),
                  columnId: f.columnId,
                  operator: f.operator,
                  value: f.value || null,
                  name: tempcols.name
                };
              }) : []
            };
          } else {
            viewData.filter = null;
          }
        }
        if ('sortBy' in data) {
          if (sortBy) {
            viewData.sortBy = {
              id: sortBy.id || Random.guid(),
              columnId: sortBy.columnId,
              type: sortBy.type,
              byValue: sortBy.byValue || null,
            };
          } else {
            viewData.sortBy = null;
          }
        }
        if ('meta' in data) {
          viewData.meta.rowHeight = meta.rowHeight;
          viewData.meta.rowWidth = meta.rowWidth;
          viewData.meta.fixedColumns = meta.fixedColumns;
        }
        return viewData;
      }
      return null;
    }
  };
}
