const ds = require('../datastore/ds.js');
const jsonServer = require('json-server');
const injectService = require('./service');

const router = jsonServer.router(ds);
const service = injectService(ds);

module.exports.addRouter = function addRouter(server) {
  function appIndex(req, res) {
    let { appId, sheetId } = req.params;
    const { pageSize, pageIndex } = req.query;
    const app = service.getAppById(appId);
    const result = {};
    if (app) {
      const appSheets = service.getAppSheets(app.id);
      if (appSheets.length > 0) {
        if (!sheetId) {
          sheetId = appSheets[0].id;
        }
        const sheet = service.getSheetById(sheetId, pageIndex, pageSize);
        if (sheet) {
          result.id = app.id;
          result.name = app.name;
          result.sheets = appSheets;
          result.tableData = sheet;
          res.json(result);
          return;
        }
      }
    }
    res.send(null);
  }
  // 应用首页获取数据
  server.get('/appIndex/:appId', appIndex);
  server.get('/appIndex/:appId/:sheetId', appIndex);
  // 获取表单sheet数据
  server.get('/sheets/:id', (req, res) => {
    const { id } = req.params;
    const { pageSize, pageIndex } = req.query;
    const sheet = service.getSheetById(id, pageIndex, pageSize);
    if (sheet) {
      res.json(sheet);
      return;
    }
    res.json({ status: 'error', msg: '未找到对应模块Sheet' });
  });
  // filter筛选和排序数据
  server.get('/sheets/:id/rows', (req, res) => {
    const { id } = req.params;
    const { pageSize, pageIndex } = req.query;
    const sheet = service.getSheetById(id, pageIndex, pageSize);
    if (sheet) {
      res.json(sheet.rows);
      return;
    }
    res.json({ status: 'error', msg: '未找到对应模块Sheet' });
  });
  // 创建sheet数据
  server.post('/sheets', (req, res) => {
    const data = req.body;
    const result = service.addSheet(data);
    if (result) {
      res.json(result);
      return;
    }
    res.json({});
  });
  // 创建列数据
  server.post('/cols/create', (req, res) => {
    const data = req.body;
    const { sheetId, name, controlOptions, colType } = data;
    const { cols } = ds;
    if (sheetId) {
      let targetSortRank;
      const sheetColumns = cols.filter(col => col.tableId === sheetId).sort((a, b) => a.sortRank - b.sortRank);
      if (sheetColumns.length > 0) {
        const colCount = sheetColumns.length;
        let targetIndex = colCount;
        if ('targetIndex' in data) {
          targetIndex = Number.isNaN(data.targetIndex) ? colCount : Number(data.targetIndex);
          console.log(targetIndex, sheetColumns.length)
          const before = targetIndex < 1 ? 0 : sheetColumns[targetIndex - 1].sortRank;
          const after = targetIndex > colCount - 1 ? sheetColumns[colCount - 1].sortRank : sheetColumns[targetIndex].sortRank;
          targetSortRank = (before + after) / 2;
        } else {
          const tail = sheetColumns.pop();
          targetSortRank = tail.sortRank + 10;
        }
      } else {
        targetSortRank = 10
      }

      const result = service.createColumn({
        sheetId: sheetId,
        name: name || `第${targetIndex + 1}列`,
        sortRank: targetSortRank,
        controlOptions,
        colType,
      });
      if (result) {
        res.json(result);
        return;
      }
    }
    res.json({ status: 'error', msg: '未找到对应模块Id' });
  });
  server.post('/cols/:columnId/update', (req, res) => {
    const { columnId } = req.params;
    const data = req.body;
    const result = service.updateColumn(columnId, data);
    if (result) {
      res.json(result);
      return;
    }
    res.json({ status: 'error', msg: '更新指定列失败' });
  });
  // 获取人员和部门
  server.post('/cols/:columnId/filterlist/', (req, res) => {
    const { columnId } = req.params;
    const data = req.body;
    const result = service.getFilterList(columnId, data);
    if (result) {
      res.json(result);
      return;
    }
    res.json({ status: 'error', msg: '更新指定列失败' });
  });
  server.post('/cols/:columnId/resize', (req, res) => {
    const { columnId } = req.params;
    const data = req.body;
    const result = service.updateColumnWidth(columnId, data.width);
    if (result) {
      res.json({ status: 'success', successful: true, msg: null });
      return;
    }
    res.json({ status: 'error', msg: '更新指定列失败' });
  });
  server.post('/cols/:columnId/sort', (req, res) => {
    const { columnId } = req.params;
    const data = req.body;
    const result = service.updateColumnSort(columnId, data.targetIndex);
    if (result) {
      res.json({ status: 'success', successful: true, msg: null });
      return;
    }
    res.json({ status: 'error', msg: '更新指定列失败' });
  });
  server.post('/cols/hide/:hidetype', (req, res) => {
    const { hidetype } = req.params;
    const data = req.body;
    const result = service.hideColumn(hidetype, data);
    if (result) {
      res.json({ status: 'success', successful: true, msg: result });
      return;
    }
    res.json({ status: 'error', msg: '更新指定列失败' });
  });
  // filter筛选和排序数据
  server.post('/sheets/:id/views', (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const viewData = service.updateView(id, data);
    if (viewData) {
      res.json(viewData);
      return;
    }
    res.json({ status: 'error', msg: '无法更新对应view' });
  });
  server.post('/rows/add', (req, res) => {
    const data = req.body;
    const viewData = service.addRows(data);
    if (viewData) {
      res.json(viewData);
      return;
    }
    res.json({ status: 'error', msg: '无法更新对应view' });
  });
  server.post('/rows/delete', (req, res) => {
    const data = req.body;
    const viewData = service.deleteRows(data);
    if (viewData) {
      res.json(viewData);
      return;
    }
    res.json({ status: 'error', msg: '无法更新对应view' });
  });
}

module.exports.router = router;

module.exports.rewritedRouter = jsonServer.rewriter({
  '/sheets/:id/rows\\?pageIndex=:start&pageSize=:limit': '/sheets/:id/rows\\?_start=:start&_limit=:limit',
  '/rows/:id\\?pageIndex=:start&pageSize=:limit': '/rows/:id?_start=:start&_limit=:limit',
  // '/tableRows/:id': '/rows?tableId=:id',
});
