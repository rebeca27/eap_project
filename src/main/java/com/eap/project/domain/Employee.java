package com.eap.project.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Employee.
 */
@Entity
@Table(name = "employee")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 1, max = 64)
    @Column(name = "first_name", length = 64, nullable = false)
    private String firstName;

    @NotNull
    @Size(min = 1, max = 64)
    @Column(name = "last_name", length = 64, nullable = false)
    private String lastName;

    @NotNull
    @Size(min = 13, max = 13)
    @Column(name = "cnp", length = 13, nullable = false)
    private String cnp;

    @Size(max = 128)
    @Column(name = "email", length = 128)
    private String email;

    @Size(max = 32)
    @Column(name = "phone_number", length = 32)
    private String phoneNumber;

    @Column(name = "hire_date")
    private Instant hireDate;

    @NotNull
    @Column(name = "salary", nullable = false)
    private Long salary;

    @ManyToOne
    @JsonIgnoreProperties("employees")
    private Company company;

    @ManyToOne
    @JsonIgnoreProperties("employees")
    private Department department;

    @OneToOne
    @JoinColumn(unique = true)
    private Job job;

    @OneToMany(mappedBy = "employee")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Holiday> employees = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Employee firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Employee lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCnp() {
        return cnp;
    }

    public Employee cnp(String cnp) {
        this.cnp = cnp;
        return this;
    }

    public void setCnp(String cnp) {
        this.cnp = cnp;
    }

    public String getEmail() {
        return email;
    }

    public Employee email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Employee phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Instant getHireDate() {
        return hireDate;
    }

    public Employee hireDate(Instant hireDate) {
        this.hireDate = hireDate;
        return this;
    }

    public void setHireDate(Instant hireDate) {
        this.hireDate = hireDate;
    }

    public Long getSalary() {
        return salary;
    }

    public Employee salary(Long salary) {
        this.salary = salary;
        return this;
    }

    public void setSalary(Long salary) {
        this.salary = salary;
    }

    public Company getCompany() {
        return company;
    }

    public Employee company(Company company) {
        this.company = company;
        return this;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Department getDepartment() {
        return department;
    }

    public Employee department(Department department) {
        this.department = department;
        return this;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Job getJob() {
        return job;
    }

    public Employee job(Job job) {
        this.job = job;
        return this;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public Set<Holiday> getEmployees() {
        return employees;
    }

    public Employee employees(Set<Holiday> holidays) {
        this.employees = holidays;
        return this;
    }

    public Employee addEmployee(Holiday holiday) {
        this.employees.add(holiday);
        holiday.setEmployee(this);
        return this;
    }

    public Employee removeEmployee(Holiday holiday) {
        this.employees.remove(holiday);
        holiday.setEmployee(null);
        return this;
    }

    public void setEmployees(Set<Holiday> holidays) {
        this.employees = holidays;
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
        Employee employee = (Employee) o;
        if (employee.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), employee.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Employee{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", cnp='" + getCnp() + "'" +
            ", email='" + getEmail() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", hireDate='" + getHireDate() + "'" +
            ", salary=" + getSalary() +
            "}";
    }
}
