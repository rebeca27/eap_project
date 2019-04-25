/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eap.project.domain.requests;

import com.eap.project.domain.Employee;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.Instant;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author Alina
 */
public class HolidayRequest {

    public Long id;

    @NotNull
    public Instant startDate;

    @NotNull
    public Instant endDate;

    @NotNull
    public Integer workingDays;

    @Size(max = 255)
    public String remarks;

    @JsonIgnoreProperties("employees")
    public Employee employee;

    public String holidayType;

    public String holidayReason;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Integer getWorkingDays() {
        return workingDays;
    }

    public void setWorkingDays(Integer workingDays) {
        this.workingDays = workingDays;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public String getHolidayType() {
        return holidayType;
    }

    public void setHolidayType(String holidayType) {
        this.holidayType = holidayType;
    }

    public String getHolidayReason() {
        return holidayReason;
    }

    public void setHolidayReason(String holidayReason) {
        this.holidayReason = holidayReason;
    }

}
