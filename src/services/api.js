import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

/**
 *
 * @param params
 * @returns {Promise<Object>}
 */
export async function queryUsers(params) {
  return request(`/api/sysUser/page?${stringify(params)}`);
}

export async function removeUser(params) {
  return request('/api/sysUser', {
    method: 'DELETE',
    body: {
      ...params,
    },
  });
}

export async function addUser(params) {
  return request('/api/sysUser', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateUser(params) {
  return request('/api/sysUser', {
    method: 'PUT',
    body: {
      ...params,
      method: 'update',
    },
  });
}

/**
 *
 * @param params
 * @returns {Promise<Object>}
 */
export async function MenuList(params) {
  return request(`/api/sysMenu?${stringify(params)}`);
}

export async function removeMenu(params) {
  return request('/api/v1/menus', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addMenu(params) {
  return request('/api/v1/menus', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateMenu(params) {
  return request('/api/v1/menus', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

/**
 *
 * @param params
 * @returns {Promise<Object>}
 */
export async function DepartList(params) {
  return request('/api/sysDept/all', {
    method: 'GET',
    body: {
      ...params,
    },
  });
}

export async function removeDepart(params) {
  return request('/api/sysDept', {
    method: 'DELETE',
    body: {
      ...params,
    },
  });
}

export async function addDepart(params) {
  return request('/api/sysDept', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function updateDepart(params) {
  return request('/api/sysDept', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

/**
 *
 * @param params
 * @returns {Promise<Object>}
 */
export async function RoleList(params) {
  return request(`/api/sysRole/page?${stringify(params)}`);
}

export async function removeRole(params) {
  return request(`/api/sysRole/${params.keys}`, {
    method: 'DELETE',
    body: {
      ...params,
    },
  });
}

export async function addRole(params) {
  return request('/api/sysRole/', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function updateRole(params) {
  return request('/api/sysRole', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

/**
 *
 * @param params
 * @returns {Promise<Object>}
 */
export async function DictList(params) {
  return request(`/api/sysDict/page?${stringify(params)}`);
}

export async function removeDict(params) {
  return request('/api/sysDict', {
    method: 'DELETE',
    body: {
      ...params,
    },
  });
}

export async function addDict(params) {
  return request('/api/sysDict', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function updateDict(params) {
  return request('/api/sysDict', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
