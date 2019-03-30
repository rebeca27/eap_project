import { ICompany } from 'app/shared/model/company.model';
import { IEmployee } from 'app/shared/model/employee.model';
import { IJob } from 'app/shared/model/job.model';

export interface IDepartment {
  id?: number;
  departmentName?: string;
  company?: ICompany;
  employees?: IEmployee[];
  jobs?: IJob[];
}

export const defaultValue: Readonly<IDepartment> = {};
