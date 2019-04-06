import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model/employee.model';

export interface IHoliday {
  id?: number;
  startDate?: Moment;
  endDate?: Moment;
  workingDays?: number;
  remarks?: string;
  employee?: IEmployee;
}

export const defaultValue: Readonly<IHoliday> = {};
