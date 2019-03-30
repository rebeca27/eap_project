import { IDepartment } from 'app/shared/model/department.model';
import { IEmployee } from 'app/shared/model/employee.model';
import { IJob } from 'app/shared/model/job.model';

export interface ICompany {
  id?: number;
  name?: string;
  cui?: string;
  departments?: IDepartment[];
  employees?: IEmployee[];
  jobs?: IJob[];
}

export const defaultValue: Readonly<ICompany> = {};
