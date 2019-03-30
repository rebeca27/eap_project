import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model/employee.model';
import { IRestLeaveHoliday } from 'app/shared/model/rest-leave-holiday.model';
import { ISickLeaveHoliday } from 'app/shared/model/sick-leave-holiday.model';

export interface IHoliday {
  id?: number;
  startDate?: Moment;
  endDate?: Moment;
  workingDays?: number;
  remarks?: string;
  employee?: IEmployee;
  restLeaveHoliday?: IRestLeaveHoliday;
  sickLeaveHoliday?: ISickLeaveHoliday;
}

export const defaultValue: Readonly<IHoliday> = {};
