import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/company">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Company
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/department">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Department
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/employee">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Employee
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/job">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Job
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/holiday">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Holiday
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/rest-leave-holiday">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Rest Leave Holiday
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/sick-leave-holiday">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;Sick Leave Holiday
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
