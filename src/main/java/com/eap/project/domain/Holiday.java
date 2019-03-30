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

    @ManyToOne
    @JsonIgnoreProperties("employees")
    private Employee employee;

    @OneToOne
    @JoinColumn(unique = true)
    private RestLeaveHoliday restLeaveHoliday;

    @OneToOne
    @JoinColumn(unique = true)
    private SickLeaveHoliday sickLeaveHoliday;

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

    public RestLeaveHoliday getRestLeaveHoliday() {
        return restLeaveHoliday;
    }

    public Holiday restLeaveHoliday(RestLeaveHoliday restLeaveHoliday) {
        this.restLeaveHoliday = restLeaveHoliday;
        return this;
    }

    public void setRestLeaveHoliday(RestLeaveHoliday restLeaveHoliday) {
        this.restLeaveHoliday = restLeaveHoliday;
    }

    public SickLeaveHoliday getSickLeaveHoliday() {
        return sickLeaveHoliday;
    }

    public Holiday sickLeaveHoliday(SickLeaveHoliday sickLeaveHoliday) {
        this.sickLeaveHoliday = sickLeaveHoliday;
        return this;
    }

    public void setSickLeaveHoliday(SickLeaveHoliday sickLeaveHoliday) {
        this.sickLeaveHoliday = sickLeaveHoliday;
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
        return "Holiday{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", workingDays=" + getWorkingDays() +
            ", remarks='" + getRemarks() + "'" +
            "}";
    }
}
