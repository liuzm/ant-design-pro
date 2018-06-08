const dataSource = [
  {
    roleId: '1',
    roleName: '管理员',
    roleCode: 'ADMIN',
    roleDesc: '系统管理员',
    departId: '10',
    department: '研发部',
    createTime: new Date(),
    updateTime: new Date(),
    delFlag: 0,
  },
  {
    roleId: '2',
    roleName: '员工',
    roleCode: 'staff',
    roleDesc: '系统管理员(操作员)',
    departId: '15',
    department: '研发部',
    createTime: new Date(),
    updateTime: new Date(),
    delFlag: 0,
  },
];

const database = {
  code: '200',
  message: '获取成功',
  data: {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize: 10,
      current: 1,
    },
  },
};

export function getRoleList(req, res) {
  return res.json(database);
}
