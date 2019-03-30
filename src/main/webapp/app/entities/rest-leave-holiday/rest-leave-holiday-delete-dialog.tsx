import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRestLeaveHoliday } from 'app/shared/model/rest-leave-holiday.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './rest-leave-holiday.reducer';

export interface IRestLeaveHolidayDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RestLeaveHolidayDeleteDialog extends React.Component<IRestLeaveHolidayDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.restLeaveHolidayEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { restLeaveHolidayEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>Confirm delete operation</ModalHeader>
        <ModalBody id="eapProjectApp.restLeaveHoliday.delete.question">Are you sure you want to delete this RestLeaveHoliday?</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp; Cancel
          </Button>
          <Button id="jhi-confirm-delete-restLeaveHoliday" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp; Delete
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ restLeaveHoliday }: IRootState) => ({
  restLeaveHolidayEntity: restLeaveHoliday.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestLeaveHolidayDeleteDialog);
