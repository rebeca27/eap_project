package com.eap.project.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Holiday.
 */
@Entity
@Table(name = "holiday")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "holiday_type")
@DiscriminatorValue(value = "default")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Holiday implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private Instant startDate;

    @NotNull
    @Column(name = "end_date", nullable = false)
    private Instant endDate;

    @NotNull
    @Column(name = "working_days", nullable = false)
    private Integer workingDays;

    @Size(max = 255)
    @Column(name = "remarks", length = 255)
    private String remarks;

    @Size(max = 255)
    @Column(name = "reason", length = 255)
    private String reason;

    @ManyToOne
    @JsonIgnoreProperties("employees")
    private Employee employee;

    public Holiday() {
    }

    public Holiday(Long id, Instant startDate, Instant endDate, Integer workingDays, String remarks, String reason, Employee employee) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.workingDays = workingDays;
        this.remarks = remarks;
        this.reason = reason;
        this.employee = employee;
    }

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public Holiday startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public Holiday endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Integer getWorkingDays() {
        return workingDays;
    }

    public Holiday workingDays(Integer workingDays) {
        this.workingDays = workingDays;
        return this;
    }

    public void setWorkingDays(Integer workingDays) {
        this.workingDays = workingDays;
    }

    public String getRemarks() {
        return remarks;
    }

    public Holiday remarks(String remarks) {
        this.remarks = remarks;
        return this;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Employee getEmployee() {
        return employee;
    }

    public Holiday employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getType() {
        return this.getClass().getName().equals(RestLeaveHoliday.class.getName()) ? "rest_leave" : "sick_leave";
    }
    
    public String getHolidayType() {
        return this.getClass().getName().equals(RestLeaveHoliday.class.getName()) ? "rest_leave" : "sick_leave";
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Holiday holiday = (Holiday) o;
        if (holiday.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), holiday.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Holiday{"
                + "id=" + getId()
                + ", startDate='" + getStartDate() + "'"
                + ", endDate='" + getEndDate() + "'"
                + ", workingDays=" + getWorkingDays()
                + ", remarks='" + getRemarks() + "'"
                + "}";
    }
}
