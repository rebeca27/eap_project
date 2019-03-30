import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { IDepartment } from 'app/shared/model/department.model';
import { getEntities as getDepartments } from 'app/entities/department/department.reducer';
import { IJob } from 'app/shared/model/job.model';
import { getEntities as getJobs } from 'app/entities/job/job.reducer';
import { getEntity, updateEntity, createEntity, reset } from './employee.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEmployeeUpdateState {
  isNew: boolean;
  companyId: string;
  departmentId: string;
  jobId: string;
}

export class EmployeeUpdate extends React.Component<IEmployeeUpdateProps, IEmployeeUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      companyId: '0',
      departmentId: '0',
      jobId: '0',
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

    this.props.getCompanies();
    this.props.getDepartments();
    this.props.getJobs();
  }

  saveEntity = (event, errors, values) => {
    values.hireDate = convertDateTimeToServer(values.hireDate);

    if (errors.length === 0) {
      const { employeeEntity } = this.props;
      const entity = {
        ...employeeEntity,
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
    this.props.history.push('/entity/employee');
  };

  render() {
    const { employeeEntity, companies, departments, jobs, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="eapProjectApp.employee.home.createOrEditLabel">Create or edit a Employee</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : employeeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="employee-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="firstNameLabel" for="firstName">
                    First Name
                  </Label>
                  <AvField
                    id="employee-firstName"
                    type="text"
                    name="firstName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      minLength: { value: 1, errorMessage: 'This field is required to be at least 1 characters.' },
                      maxLength: { value: 64, errorMessage: 'This field cannot be longer than 64 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="lastName">
                    Last Name
                  </Label>
                  <AvField
                    id="employee-lastName"
                    type="text"
                    name="lastName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      minLength: { value: 1, errorMessage: 'This field is required to be at least 1 characters.' },
                      maxLength: { value: 64, errorMessage: 'This field cannot be longer than 64 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="cnpLabel" for="cnp">
                    Cnp
                  </Label>
                  <AvField
                    id="employee-cnp"
                    type="text"
                    name="cnp"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      minLength: { value: 13, errorMessage: 'This field is required to be at least 13 characters.' },
                      maxLength: { value: 13, errorMessage: 'This field cannot be longer than 13 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="email">
                    Email
                  </Label>
                  <AvField
                    id="employee-email"
                    type="text"
                    name="email"
                    validate={{
                      maxLength: { value: 128, errorMessage: 'This field cannot be longer than 128 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneNumberLabel" for="phoneNumber">
                    Phone Number
                  </Label>
                  <AvField
                    id="employee-phoneNumber"
                    type="text"
                    name="phoneNumber"
                    validate={{
                      maxLength: { value: 32, errorMessage: 'This field cannot be longer than 32 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="hireDateLabel" for="hireDate">
                    Hire Date
                  </Label>
                  <AvInput
                    id="employee-hireDate"
                    type="datetime-local"
                    className="form-control"
                    name="hireDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.employeeEntity.hireDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="salaryLabel" for="salary">
                    Salary
                  </Label>
                  <AvField
                    id="employee-salary"
                    type="string"
                    className="form-control"
                    name="salary"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="company.id">Company</Label>
                  <AvInput id="employee-company" type="select" className="form-control" name="company.id">
                    <option value="" key="0" />
                    {companies
                      ? companies.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="department.id">Department</Label>
                  <AvInput id="employee-department" type="select" className="form-control" name="department.id">
                    <option value="" key="0" />
                    {departments
                      ? departments.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="job.id">Job</Label>
                  <AvInput id="employee-job" type="select" className="form-control" name="job.id">
                    <option value="" key="0" />
                    {jobs
                      ? jobs.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/employee" replace color="info">
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
  companies: storeState.company.entities,
  departments: storeState.department.entities,
  jobs: storeState.job.entities,
  employeeEntity: storeState.employee.entity,
  loading: storeState.employee.loading,
  updating: storeState.employee.updating,
  updateSuccess: storeState.employee.updateSuccess
});

const mapDispatchToProps = {
  getCompanies,
  getDepartments,
  getJobs,
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
)(EmployeeUpdate);
