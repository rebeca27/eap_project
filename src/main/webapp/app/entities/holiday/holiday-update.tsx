import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEmployee } from 'app/shared/model/employee.model';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';
import { IRestLeaveHoliday } from 'app/shared/model/rest-leave-holiday.model';
import { getEntities as getRestLeaveHolidays } from 'app/entities/rest-leave-holiday/rest-leave-holiday.reducer';
import { ISickLeaveHoliday } from 'app/shared/model/sick-leave-holiday.model';
import { getEntities as getSickLeaveHolidays } from 'app/entities/sick-leave-holiday/sick-leave-holiday.reducer';
import { getEntity, updateEntity, createEntity, reset } from './holiday.reducer';
import { IHoliday } from 'app/shared/model/holiday.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IHolidayUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IHolidayUpdateState {
  isNew: boolean;
  employeeId: string;
  restLeaveHolidayId: string;
  sickLeaveHolidayId: string;
}

export class HolidayUpdate extends React.Component<IHolidayUpdateProps, IHolidayUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      employeeId: '0',
      restLeaveHolidayId: '0',
      sickLeaveHolidayId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getEmployees();
    this.props.getRestLeaveHolidays();
    this.props.getSickLeaveHolidays();
  }

  saveEntity = (event, errors, values) => {
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);

    if (errors.length === 0) {
      const { holidayEntity } = this.props;
      const entity = {
        ...holidayEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/holiday');
  };

  render() {
    const { holidayEntity, employees, restLeaveHolidays, sickLeaveHolidays, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="eapProjectApp.holiday.home.createOrEditLabel">Create or edit a Holiday</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : holidayEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="holiday-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="startDateLabel" for="startDate">
                    Start Date
                  </Label>
                  <AvInput
                    id="holiday-startDate"
                    type="datetime-local"
                    className="form-control"
                    name="startDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.holidayEntity.startDate)}
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endDateLabel" for="endDate">
                    End Date
                  </Label>
                  <AvInput
                    id="holiday-endDate"
                    type="datetime-local"
                    className="form-control"
                    name="endDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.holidayEntity.endDate)}
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="workingDaysLabel" for="workingDays">
                    Working Days
                  </Label>
                  <AvField
                    id="holiday-workingDays"
                    type="string"
                    className="form-control"
                    name="workingDays"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="remarksLabel" for="remarks">
                    Remarks
                  </Label>
                  <AvField
                    id="holiday-remarks"
                    type="text"
                    name="remarks"
                    validate={{
                      maxLength: { value: 255, errorMessage: 'This field cannot be longer than 255 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="employee.id">Employee</Label>
                  <AvInput id="holiday-employee" type="select" className="form-control" name="employee.id">
                    <option value="" key="0" />
                    {employees
                      ? employees.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="restLeaveHoliday.id">Rest Leave Holiday</Label>
                  <AvInput id="holiday-restLeaveHoliday" type="select" className="form-control" name="restLeaveHoliday.id">
                    <option value="" key="0" />
                    {restLeaveHolidays
                      ? restLeaveHolidays.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="sickLeaveHoliday.id">Sick Leave Holiday</Label>
                  <AvInput id="holiday-sickLeaveHoliday" type="select" className="form-control" name="sickLeaveHoliday.id">
                    <option value="" key="0" />
                    {sickLeaveHolidays
                      ? sickLeaveHolidays.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/holiday" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  employees: storeState.employee.entities,
  restLeaveHolidays: storeState.restLeaveHoliday.entities,
  sickLeaveHolidays: storeState.sickLeaveHoliday.entities,
  holidayEntity: storeState.holiday.entity,
  loading: storeState.holiday.loading,
  updating: storeState.holiday.updating,
  updateSuccess: storeState.holiday.updateSuccess
});

const mapDispatchToProps = {
  getEmployees,
  getRestLeaveHolidays,
  getSickLeaveHolidays,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HolidayUpdate);
