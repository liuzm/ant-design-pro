import { addDepart, DepartList, removeDepart, updateDepart } from '../services/api'

export default {

  namespace: 'systemdepart',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    * fetch ({payload}, {call, put}) {
      const response = yield call(DepartList, payload)
      yield put({
        type: 'save',
        payload: response,
      })
    },
    * add ({payload, callback}, {call, put}) {
      const response = yield call(addDepart, payload)
      yield put({
        type: 'save',
        payload: response,
      })
      if (callback) callback()
    },
    * remove ({payload, callback}, {call, put}) {
      const response = yield call(removeDepart, payload)
      yield put({
        type: 'save',
        payload: response,
      })
      if (callback) callback()
    },
    * update ({payload, callback}, {call, put}) {
      const response = yield call(updateDepart, payload)
      yield put({
        type: 'save',
        payload: response,
      })
      if (callback) callback()
    },
  },

  reducers: {
    save (state, action) {
      return {
        ...state,
        data: action.payload,
      }
    },
  },
}
