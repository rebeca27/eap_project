import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Company from './company';
import Department from './department';
import Employee from './employee';
import Job from './job';
import Holiday from './holiday';
import RestLeaveHoliday from './rest-leave-holiday';
import SickLeaveHoliday from './sick-leave-holiday';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/company`} component={Company} />
      <ErrorBoundaryRoute path={`${match.url}/department`} component={Department} />
      <ErrorBoundaryRoute path={`${match.url}/employee`} component={Employee} />
      <ErrorBoundaryRoute path={`${match.url}/job`} component={Job} />
      <ErrorBoundaryRoute path={`${match.url}/holiday`} component={Holiday} />
      <ErrorBoundaryRoute path={`${match.url}/rest-leave-holiday`} component={RestLeaveHoliday} />
      <ErrorBoundaryRoute path={`${match.url}/sick-leave-holiday`} component={SickLeaveHoliday} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
