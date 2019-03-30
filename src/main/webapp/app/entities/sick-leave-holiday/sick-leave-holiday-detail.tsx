import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './sick-leave-holiday.reducer';
import { ISickLeaveHoliday } from 'app/shared/model/sick-leave-holiday.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISickLeaveHolidayDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SickLeaveHolidayDetail extends React.Component<ISickLeaveHolidayDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { sickLeaveHolidayEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            SickLeaveHoliday [<b>{sickLeaveHolidayEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="reason">Reason</span>
            </dt>
            <dd>{sickLeaveHolidayEntity.reason}</dd>
          </dl>
          <Button tag={Link} to="/entity/sick-leave-holiday" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/sick-leave-holiday/${sickLeaveHolidayEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ sickLeaveHoliday }: IRootState) => ({
  sickLeaveHolidayEntity: sickLeaveHoliday.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SickLeaveHolidayDetail);
