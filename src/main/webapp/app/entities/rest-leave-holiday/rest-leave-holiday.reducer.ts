import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRestLeaveHoliday, defaultValue } from 'app/shared/model/rest-leave-holiday.model';

export const ACTION_TYPES = {
  FETCH_RESTLEAVEHOLIDAY_LIST: 'restLeaveHoliday/FETCH_RESTLEAVEHOLIDAY_LIST',
  FETCH_RESTLEAVEHOLIDAY: 'restLeaveHoliday/FETCH_RESTLEAVEHOLIDAY',
  CREATE_RESTLEAVEHOLIDAY: 'restLeaveHoliday/CREATE_RESTLEAVEHOLIDAY',
  UPDATE_RESTLEAVEHOLIDAY: 'restLeaveHoliday/UPDATE_RESTLEAVEHOLIDAY',
  DELETE_RESTLEAVEHOLIDAY: 'restLeaveHoliday/DELETE_RESTLEAVEHOLIDAY',
  RESET: 'restLeaveHoliday/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRestLeaveHoliday>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type RestLeaveHolidayState = Readonly<typeof initialState>;

// Reducer

export default (state: RestLeaveHolidayState = initialState, action): RestLeaveHolidayState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RESTLEAVEHOLIDAY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RESTLEAVEHOLIDAY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RESTLEAVEHOLIDAY):
    case REQUEST(ACTION_TYPES.UPDATE_RESTLEAVEHOLIDAY):
    case REQUEST(ACTION_TYPES.DELETE_RESTLEAVEHOLIDAY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_RESTLEAVEHOLIDAY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RESTLEAVEHOLIDAY):
    case FAILURE(ACTION_TYPES.CREATE_RESTLEAVEHOLIDAY):
    case FAILURE(ACTION_TYPES.UPDATE_RESTLEAVEHOLIDAY):
    case FAILURE(ACTION_TYPES.DELETE_RESTLEAVEHOLIDAY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESTLEAVEHOLIDAY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESTLEAVEHOLIDAY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RESTLEAVEHOLIDAY):
    case SUCCESS(ACTION_TYPES.UPDATE_RESTLEAVEHOLIDAY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RESTLEAVEHOLIDAY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/rest-leave-holidays';

// Actions

export const getEntities: ICrudGetAllAction<IRestLeaveHoliday> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_RESTLEAVEHOLIDAY_LIST,
  payload: axios.get<IRestLeaveHoliday>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IRestLeaveHoliday> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RESTLEAVEHOLIDAY,
    payload: axios.get<IRestLeaveHoliday>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRestLeaveHoliday> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RESTLEAVEHOLIDAY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRestLeaveHoliday> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RESTLEAVEHOLIDAY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRestLeaveHoliday> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RESTLEAVEHOLIDAY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
