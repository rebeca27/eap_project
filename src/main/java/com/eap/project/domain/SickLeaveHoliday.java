package com.eap.project.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A SickLeaveHoliday.
 */
@Entity
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@DiscriminatorValue(value = "sick_leave")
public class SickLeaveHoliday extends Holiday implements Serializable {

    private static final long serialVersionUID = 1L;

    public SickLeaveHoliday() {
    }

    public SickLeaveHoliday(Long id, Instant startDate, Instant endDate, Integer workingDays, String remarks, Employee employee, String reason) {
        super(id, startDate, endDate, workingDays, remarks, reason, employee);
    }

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SickLeaveHoliday sickLeaveHoliday = (SickLeaveHoliday) o;
        if (sickLeaveHoliday.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sickLeaveHoliday.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SickLeaveHoliday{"
                + "id=" + getId()
                + ", reason='" + getReason() + "'"
                + "}";
    }
}
