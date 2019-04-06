import { IHolidayType, defaultValue } from 'app/shared/model/holiday-type.model';

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IHolidayType>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

// Actions

export const getHolidayTypeList = () => {
  const values: IHolidayType[] = [];

  values.push({ type: 'rest_leave', name: 'Rest Leave Holiday' });
  values.push({ type: 'sick_leave', name: 'Sick Leave Holiday' });

  return values;
};
