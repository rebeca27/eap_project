import { Moment } from 'moment';
import { ICompany } from 'app/shared/model/company.model';
import { IDepartment } from 'app/shared/model/department.model';
import { IJob } from 'app/shared/model/job.model';
import { IHoliday } from 'app/shared/model/holiday.model';

export interface IEmployee {
  id?: number;
  firstName?: string;
  lastName?: string;
  cnp?: string;
  email?: string;
  phoneNumber?: string;
  hireDate?: Moment;
  salary?: number;
  company?: ICompany;
  department?: IDepartment;
  job?: IJob;
  employees?: IHoliday[];
}

export const defaultValue: Readonly<IEmployee> = {};
