import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ISickLeaveHoliday } from 'app/shared/model/sick-leave-holiday.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './sick-leave-holiday.reducer';

export interface ISickLeaveHolidayDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SickLeaveHolidayDeleteDialog extends React.Component<ISickLeaveHolidayDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.sickLeaveHolidayEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { sickLeaveHolidayEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>Confirm delete operation</ModalHeader>
        <ModalBody id="eapProjectApp.sickLeaveHoliday.delete.question">Are you sure you want to delete this SickLeaveHoliday?</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp; Cancel
          </Button>
          <Button id="jhi-confirm-delete-sickLeaveHoliday" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp; Delete
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ sickLeaveHoliday }: IRootState) => ({
  sickLeaveHolidayEntity: sickLeaveHoliday.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SickLeaveHolidayDeleteDialog);
