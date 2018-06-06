import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [
  {
    id: 1,
    parentId: -1,
    menuName: `TradeCode 1`,
    permissionCode: `ADD`,
    menuUrl: `研发部1`,
    menuType: `admin1}`,
    menuImg: Math.floor(Math.random() * 10) % 4,
    parentName: new Date(`2017-07-${Math.floor(1 / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(1 / 2) + 1}`),
  },
  {
    id: 2,
    parentId: -1,
    menuName: `TradeCode 2`,
    permissionCode: `ADD`,
    menuUrl: `研发部2`,
    menuType: `admin2`,
    menuImg: Math.floor(Math.random() * 10) % 4,
    parentName: new Date(`2017-07-${Math.floor(2 / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(2 / 2) + 1}`),
  },
  {
    id: 3,
    parentId: 1,
    menuName: `TradeCode 3`,
    permissionCode: `ADD`,
    menuUrl: `研发部3`,
    menuType: `admin3`,
    menuImg: Math.floor(Math.random() * 10) % 4,
    parentName: new Date(`2017-07-${Math.floor(3 / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(3 / 2) + 1}`),
  },
  {
    id: 4,
    parentId: 3,
    menuName: `TradeCode 4`,
    permissionCode: `ADD`,
    menuUrl: `研发部4`,
    menuType: `admin4`,
    menuImg: Math.floor(Math.random() * 10) % 4,
    parentName: new Date(`2017-07-${Math.floor(4 / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(4 / 2) + 1}`),
  },
  {
    id: 5,
    parentId: 3,
    menuName: `TradeCode 5`,
    permissionCode: `ADD`,
    menuUrl: `研发部5`,
    menuType: `admin5`,
    menuImg: Math.floor(Math.random() * 10) % 4,
    parentName: new Date(`2017-07-${Math.floor(5 / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(5 / 2) + 1}`),
  },
  {
    id: 6,
    parentId: 2,
    menuName: `TradeCode 6`,
    permissionCode: `ADD`,
    menuUrl: `研发部6`,
    menuType: `admin6`,
    menuImg: Math.floor(Math.random() * 10) % 4,
    parentName: new Date(`2017-07-${Math.floor(6 / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(6 / 2) + 1}`),
  },
  {
    id: 7,
    parentId: 2,
    menuName: `TradeCode 7`,
    permissionCode: `ADD`,
    menuUrl: `研发部7`,
    menuType: `admin7`,
    menuImg: Math.floor(Math.random() * 10) % 4,
    parentName: new Date(`2017-07-${Math.floor(7 / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(7 / 2) + 1}`),
  },
  {
    id: 8,
    parentId: 1,
    menuName: `TradeCode 8`,
    permissionCode: `ADD`,
    menuUrl: `研发部8`,
    menuType: `admin8`,
    menuImg: Math.floor(Math.random() * 10) % 4,
    parentName: new Date(`2017-07-${Math.floor(8 / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(8 / 2) + 1}`),
  },
  {
    id: 9,
    parentId: 1,
    menuName: `TradeCode 9`,
    permissionCode: `ADD`,
    menuUrl: `研发部9`,
    menuType: `admin9`,
    menuImg: Math.floor(Math.random() * 10) % 4,
    parentName: new Date(`2017-07-${Math.floor(9 / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(9 / 2) + 1}`),
  },
];

export function getMenus(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = [...tableListDataSource];

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function postMenu(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        id: i,
        parentId: 3,
        menuName: `TradeCode ${i}`,
        permissionCode: `ADD`,
        menuUrl: `研发部${i}`,
        menuType: `admin${i}`,
        menuImg: Math.floor(Math.random() * 10) % 4,
        parentName: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
        createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.key === key) {
          return { ...item, desc, name };
        }
        return item;
      });
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getMenus,
  postMenu,
};
