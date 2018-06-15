import { addDict, removeDict, DictList, updateDict } from '../services/api';

export default {
  namespace: 'systemdict',

  state: {
    result: {
      code: '',
      data: {},
      msg: '',
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(DictList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addDict, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeDict, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateDict, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        result: action.payload,
      };
    },
  },
};
