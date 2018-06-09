import { addRole, removeRole, RoleList, updateRole } from '../services/api';

export default {
  namespace: 'systemrole',

  state: {
    result: {
      code: '',
      data: {},
      msg: '',
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(RoleList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRole, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRole, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRole, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      console.log(action.payload);
      return {
        ...state,
        result: action.payload,
      };
    },
  },
};
