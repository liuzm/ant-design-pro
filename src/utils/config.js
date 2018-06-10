const APIV1 = '/api/v1';
const APIV2 = '/api/v2';
const API= 'api';

export default {
  name: 'centipede',
  prefix: 'bird',
  footerText: 'centipede admin  © 2018 liuzm',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: ['http://localhost:8000', 'http://localhost'],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  selectKey: {
    role: 'role',
    roleData: [],
    dept: 'dept',
    deptData: [],
  },
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,

    menus: `${APIV1}/menus`,
    deptsAll: `${API}/sysDept/all`,
    getDic: `${APIV1}/getdic/`,
    upload: `/file/upload`,
    permissions: `${APIV1}/permissions`,
  },
};
