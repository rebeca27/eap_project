import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SickLeaveHoliday from './sick-leave-holiday';
import SickLeaveHolidayDetail from './sick-leave-holiday-detail';
import SickLeaveHolidayUpdate from './sick-leave-holiday-update';
import SickLeaveHolidayDeleteDialog from './sick-leave-holiday-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SickLeaveHolidayUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SickLeaveHolidayUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SickLeaveHolidayDetail} />
      <ErrorBoundaryRoute path={match.url} component={SickLeaveHoliday} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SickLeaveHolidayDeleteDialog} />
  </>
);

export default Routes;
