import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './holiday.reducer';
import { IHoliday } from 'app/shared/model/holiday.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IHolidayProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IHolidayState = IPaginationBaseState;

export class Holiday extends React.Component<IHolidayProps, IHolidayState> {
  state: IHolidayState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { holidayList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="holiday-heading">
          Holidays
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Holiday
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('startDate')}>
                  Start Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('endDate')}>
                  End Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('workingDays')}>
                  Working Days <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand">Type</th>
                <th className="hand" onClick={this.sort('remarks')}>
                  Remarks <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('remarks')}>
                  Reason <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Employee <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {holidayList.map((holiday, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${holiday.id}`} color="link" size="sm">
                      {holiday.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={holiday.startDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={holiday.endDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{holiday.workingDays}</td>
                  <td>{holiday.type === 'rest_leave' ? 'Rest Leave' : 'Sick Leave'}</td>
                  <td>{holiday.remarks}</td>
                  <td>{holiday.reason}</td>
                  <td>{holiday.employee ? <Link to={`employee/${holiday.employee.id}`}>{holiday.employee.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${holiday.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${holiday.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${holiday.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Row className="justify-content-center">
          <JhiPagination
            items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
            activePage={this.state.activePage}
            onSelect={this.handlePagination}
            maxButtons={5}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ holiday }: IRootState) => ({
  holidayList: holiday.entities,
  totalItems: holiday.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Holiday);
