package com.eap.project.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A RestLeaveHoliday.
 */
@Entity
@DiscriminatorValue(value = "rest_leave")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RestLeaveHoliday extends Holiday implements Serializable {

    private static final long serialVersionUID = 1L;

    public RestLeaveHoliday() {
    }

    public RestLeaveHoliday(Long id, Instant startDate, Instant endDate, Integer workingDays, String remarks, Employee employee) {
        super(id, startDate, endDate, workingDays, remarks, null, employee);
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
        RestLeaveHoliday restLeaveHoliday = (RestLeaveHoliday) o;
        if (restLeaveHoliday.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), restLeaveHoliday.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RestLeaveHoliday{"
                + "id=" + getId()
                + "}";
    }
}
