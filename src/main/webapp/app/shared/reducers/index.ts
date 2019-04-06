import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
import sessions, { SessionsState } from 'app/modules/account/sessions/sessions.reducer';
// prettier-ignore
// prettier-ignore
import company, {
  CompanyState
} from 'app/entities/company/company.reducer';
// prettier-ignore
import department, {
  DepartmentState
} from 'app/entities/department/department.reducer';
// prettier-ignore
import employee, {
  EmployeeState
} from 'app/entities/employee/employee.reducer';
// prettier-ignore
import job, {
  JobState
} from 'app/entities/job/job.reducer';
// prettier-ignore
import holiday, {
  HolidayState
} from 'app/entities/holiday/holiday.reducer';
// prettier-ignore
import restLeaveHoliday, {
  RestLeaveHolidayState
} from 'app/entities/rest-leave-holiday/rest-leave-holiday.reducer';
// prettier-ignore
import sickLeaveHoliday, {
  SickLeaveHolidayState
} from 'app/entities/sick-leave-holiday/sick-leave-holiday.reducer';
// prettier-ignore
import holiday, {
  HolidayState
} from 'app/entities/holiday/holiday.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly sessions: SessionsState;
  readonly company: CompanyState;
  readonly department: DepartmentState;
  readonly employee: EmployeeState;
  readonly job: JobState;
  readonly holiday: HolidayState;
  readonly restLeaveHoliday: RestLeaveHolidayState;
  readonly sickLeaveHoliday: SickLeaveHolidayState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  sessions,
  company,
  department,
  employee,
  job,
  holiday,
  restLeaveHoliday,
  sickLeaveHoliday,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
