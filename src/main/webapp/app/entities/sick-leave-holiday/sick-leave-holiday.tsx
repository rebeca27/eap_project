import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './sick-leave-holiday.reducer';
import { ISickLeaveHoliday } from 'app/shared/model/sick-leave-holiday.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISickLeaveHolidayProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class SickLeaveHoliday extends React.Component<ISickLeaveHolidayProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { sickLeaveHolidayList, match } = this.props;
    return (
      <div>
        <h2 id="sick-leave-holiday-heading">
          Sick Leave Holidays
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Sick Leave Holiday
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Reason</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {sickLeaveHolidayList.map((sickLeaveHoliday, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${sickLeaveHoliday.id}`} color="link" size="sm">
                      {sickLeaveHoliday.id}
                    </Button>
                  </td>
                  <td>{sickLeaveHoliday.reason}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${sickLeaveHoliday.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${sickLeaveHoliday.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${sickLeaveHoliday.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ sickLeaveHoliday }: IRootState) => ({
  sickLeaveHolidayList: sickLeaveHoliday.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SickLeaveHoliday);
