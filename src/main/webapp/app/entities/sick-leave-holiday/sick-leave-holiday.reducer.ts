import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISickLeaveHoliday, defaultValue } from 'app/shared/model/sick-leave-holiday.model';

export const ACTION_TYPES = {
  FETCH_SICKLEAVEHOLIDAY_LIST: 'sickLeaveHoliday/FETCH_SICKLEAVEHOLIDAY_LIST',
  FETCH_SICKLEAVEHOLIDAY: 'sickLeaveHoliday/FETCH_SICKLEAVEHOLIDAY',
  CREATE_SICKLEAVEHOLIDAY: 'sickLeaveHoliday/CREATE_SICKLEAVEHOLIDAY',
  UPDATE_SICKLEAVEHOLIDAY: 'sickLeaveHoliday/UPDATE_SICKLEAVEHOLIDAY',
  DELETE_SICKLEAVEHOLIDAY: 'sickLeaveHoliday/DELETE_SICKLEAVEHOLIDAY',
  RESET: 'sickLeaveHoliday/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISickLeaveHoliday>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type SickLeaveHolidayState = Readonly<typeof initialState>;

// Reducer

export default (state: SickLeaveHolidayState = initialState, action): SickLeaveHolidayState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SICKLEAVEHOLIDAY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SICKLEAVEHOLIDAY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SICKLEAVEHOLIDAY):
    case REQUEST(ACTION_TYPES.UPDATE_SICKLEAVEHOLIDAY):
    case REQUEST(ACTION_TYPES.DELETE_SICKLEAVEHOLIDAY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SICKLEAVEHOLIDAY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SICKLEAVEHOLIDAY):
    case FAILURE(ACTION_TYPES.CREATE_SICKLEAVEHOLIDAY):
    case FAILURE(ACTION_TYPES.UPDATE_SICKLEAVEHOLIDAY):
    case FAILURE(ACTION_TYPES.DELETE_SICKLEAVEHOLIDAY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SICKLEAVEHOLIDAY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SICKLEAVEHOLIDAY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SICKLEAVEHOLIDAY):
    case SUCCESS(ACTION_TYPES.UPDATE_SICKLEAVEHOLIDAY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SICKLEAVEHOLIDAY):
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

const apiUrl = 'api/sick-leave-holidays';

// Actions

export const getEntities: ICrudGetAllAction<ISickLeaveHoliday> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SICKLEAVEHOLIDAY_LIST,
  payload: axios.get<ISickLeaveHoliday>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ISickLeaveHoliday> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SICKLEAVEHOLIDAY,
    payload: axios.get<ISickLeaveHoliday>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISickLeaveHoliday> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SICKLEAVEHOLIDAY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISickLeaveHoliday> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SICKLEAVEHOLIDAY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISickLeaveHoliday> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SICKLEAVEHOLIDAY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
