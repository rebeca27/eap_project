import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './rest-leave-holiday.reducer';
import { IRestLeaveHoliday } from 'app/shared/model/rest-leave-holiday.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRestLeaveHolidayDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RestLeaveHolidayDetail extends React.Component<IRestLeaveHolidayDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { restLeaveHolidayEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            RestLeaveHoliday [<b>{restLeaveHolidayEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details" />
          <Button tag={Link} to="/entity/rest-leave-holiday" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/rest-leave-holiday/${restLeaveHolidayEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ restLeaveHoliday }: IRootState) => ({
  restLeaveHolidayEntity: restLeaveHoliday.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestLeaveHolidayDetail);
