import { ICompany } from 'app/shared/model/company.model';
import { IDepartment } from 'app/shared/model/department.model';

export const enum JobType {
  PART_TIME = 'PART_TIME',
  FULL_TIME = 'FULL_TIME'
}

export interface IJob {
  id?: number;
  jobTitle?: string;
  minSalary?: number;
  maxSalary?: number;
  typeType?: JobType;
  company?: ICompany;
  department?: IDepartment;
}

export const defaultValue: Readonly<IJob> = {};
