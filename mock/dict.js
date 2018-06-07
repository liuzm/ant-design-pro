import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    id: i,
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    name: `TradeCode ${i}`,
    phone: `13888777896`,
    department: `研发部${i}`,
    role: `admin${i}`,
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
  });
}

export function getDicts(req, res, u) {
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

export function postDict(req, res, u, b) {
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
        avatar: [
          'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ][i % 2],
        name: `TradeCode ${i}`,
        phone: `13888777896`,
        department: `研发部`,
        role: `admin`,
        status: Math.floor(Math.random() * 10) % 4,
        updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
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

const dept = {
  placeholder: '请选择',
  selectedValue: '',
  options: [
    {
      label: '选项1',
      value: '1',
      disabled: 'false',
    },
    {
      label: '选项2',
      value: '2',
      disabled: 'false',
    },
    {
      label: '选项3',
      value: '3',
      disabled: 'false',
    },
    {
      label: '选项4不可选',
      value: '4',
      disabled: 'true',
    },
  ],
};

const role = {
  placeholder: '请选择',
  selectedValue: '',
  options: [
    {
      label: '角色1',
      value: '1',
      disabled: 'false',
    },
    {
      label: '角色2',
      value: '2',
      disabled: 'false',
    },
    {
      label: '角色3',
      value: '3',
      disabled: 'false',
    },
    {
      label: '角色4不可选',
      value: '4',
      disabled: 'true',
    },
  ],
};

export function getDictByKey(req, res) {
  const key = req.params.key;
  switch (key) {
    case 'role':
      return res.json(role);
      break;
    case 'dept':
      return res.json(dept);
      break;
    default:
      return res.json(role);
      break;
  }
}

let database = {
  httpCode: '200',
  message: '获取成功',
  result: [
    {
      parentValue: '0',
      label: '系统管理',
      value: '1',
    },
    {
      parentValue: '1',
      label: '菜单管理',
      value: '2',
    },
    {
      parentValue: '1',
      label: '权限管理',
      value: '4',
    },
    {
      parentValue: '4',
      label: '组织机构列表',
      value: '5',
    },
    {
      parentValue: '4',
      label: '岗位设置',
      value: '6',
    },
    {
      parentValue: '4',
      label: '用户列表',
      value: '7',
    },
    {
      parentValue: '1',
      label: '字典管理',
      value: '8',
    },
    {
      parentValue: '8',
      label: '字典类型',
      value: '9',
    },
    {
      parentValue: '8',
      label: '字典选项',
      value: '10',
    },
    {
      parentValue: '0',
      label: 'CMS系统',
      value: '11',
    },
    {
      parentValue: '11',
      label: '分类管理',
      value: '12',
    },
    {
      parentValue: '11',
      label: '属性管理',
      value: '13',
    },
    {
      parentValue: '1',
      label: '站点管理',
      value: '14',
    },
    {
      parentValue: '1',
      label: '表单管理',
      value: '15',
    },
    {
      parentValue: '15',
      label: '自定义表单',
      value: '16',
    },
    {
      parentValue: '15',
      label: '表单设置',
      value: '17',
    },
    {
      parentValue: '14',
      label: '站点列表',
      value: '18',
    },
    {
      parentValue: '0',
      label: 'CRM系统管理',
      value: '19',
    },
    {
      parentValue: '19',
      label: '车辆管理',
      value: '20',
    },
    {
      parentValue: '0',
      label: '综合管理',
      value: '21',
    },
    {
      parentValue: '4',
      label: '权限管理',
      value: '34',
    },
  ],
};

export function getDeptByKey(req, res) {
  return res.json(database);
}

export default {
  getDicts,
  postDict,
  getDictByKey,
  getDeptByKey,
};
