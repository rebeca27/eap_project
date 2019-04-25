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
import { getEntity, updateEntity, createEntity, reset } from './holiday.reducer';
import { getHolidayTypeList } from './holiday-type.reducer';
import { IHoliday } from 'app/shared/model/holiday.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { IHolidayType } from 'app/shared/model/holiday-type.model';

export interface IHolidayUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IHolidayUpdateState {
  isNew: boolean;
  employeeId: string;
  holidayTypes: IHolidayType[];
}

export class HolidayUpdate extends React.Component<IHolidayUpdateProps, IHolidayUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      employeeId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id,
      holidayTypes: getHolidayTypeList()
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

  disableReason = ev => {
    if (ev.target.value !== 'sick_leave') {
      document.getElementById('holiday-reason').setAttribute('disabled', 'true');
    } else {
      document.getElementById('holiday-reason').removeAttribute('disabled');
    }
  };

  render() {
    const { holidayEntity, employees, loading, updating } = this.props;
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
                  <Label for="employee.id">Employee</Label>
                  <AvInput id="holiday-employee" type="select" className="form-control" name="employee.id">
                    <option value="" key="0" />
                    {employees
                      ? employees.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.firstName} {otherEntity.lastName} ({otherEntity.company.name})
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="holidayType">Holiday Type</Label>
                  <AvInput
                    id="holiday-type"
                    type="select"
                    className="form-control"
                    name="holidayType"
                    onChange={this.disableReason.bind(this)}
                  >
                    <option value="" key="0" />
                    {this.state.holidayTypes
                      ? this.state.holidayTypes.map(otherEntity => (
                          <option value={otherEntity.type} key={otherEntity.type}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
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
                  <Label id="reasonLabel" for="reason">
                    Reason
                  </Label>
                  <AvField
                    id="holiday-reason"
                    type="text"
                    name="reason"
                    disabled
                    validate={{ maxLength: { value: 255, errorMessage: 'This field cannot be longer than 255 characters.' } }}
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
  holidayEntity: storeState.holiday.entity,
  loading: storeState.holiday.loading,
  updating: storeState.holiday.updating,
  updateSuccess: storeState.holiday.updateSuccess
});

const mapDispatchToProps = {
  getEmployees,
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
