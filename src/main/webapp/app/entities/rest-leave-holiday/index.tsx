import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import RestLeaveHoliday from './rest-leave-holiday';
import RestLeaveHolidayDetail from './rest-leave-holiday-detail';
import RestLeaveHolidayUpdate from './rest-leave-holiday-update';
import RestLeaveHolidayDeleteDialog from './rest-leave-holiday-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RestLeaveHolidayUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RestLeaveHolidayUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RestLeaveHolidayDetail} />
      <ErrorBoundaryRoute path={match.url} component={RestLeaveHoliday} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={RestLeaveHolidayDeleteDialog} />
  </>
);

export default Routes;
