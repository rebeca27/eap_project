package com.eap.project.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Company.
 */
@Entity
@Table(name = "company")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Company implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 1, max = 64)
    @Column(name = "name", length = 64, nullable = false)
    private String name;

    @NotNull
    @Size(min = 9, max = 9)
    @Column(name = "cui", length = 9, nullable = false)
    private String cui;

    @OneToMany(mappedBy = "company")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Department> departments = new HashSet<>();
    @OneToMany(mappedBy = "company")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Employee> employees = new HashSet<>();
    @OneToMany(mappedBy = "company")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Job> jobs = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Company name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCui() {
        return cui;
    }

    public Company cui(String cui) {
        this.cui = cui;
        return this;
    }

    public void setCui(String cui) {
        this.cui = cui;
    }

    public Set<Department> getDepartments() {
        return departments;
    }

    public Company departments(Set<Department> departments) {
        this.departments = departments;
        return this;
    }

    public Company addDepartment(Department department) {
        this.departments.add(department);
        department.setCompany(this);
        return this;
    }

    public Company removeDepartment(Department department) {
        this.departments.remove(department);
        department.setCompany(null);
        return this;
    }

    public void setDepartments(Set<Department> departments) {
        this.departments = departments;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public Company employees(Set<Employee> employees) {
        this.employees = employees;
        return this;
    }

    public Company addEmployee(Employee employee) {
        this.employees.add(employee);
        employee.setCompany(this);
        return this;
    }

    public Company removeEmployee(Employee employee) {
        this.employees.remove(employee);
        employee.setCompany(null);
        return this;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
    }

    public Set<Job> getJobs() {
        return jobs;
    }

    public Company jobs(Set<Job> jobs) {
        this.jobs = jobs;
        return this;
    }

    public Company addJob(Job job) {
        this.jobs.add(job);
        job.setCompany(this);
        return this;
    }

    public Company removeJob(Job job) {
        this.jobs.remove(job);
        job.setCompany(null);
        return this;
    }

    public void setJobs(Set<Job> jobs) {
        this.jobs = jobs;
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
        Company company = (Company) o;
        if (company.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), company.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Company{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", cui='" + getCui() + "'" +
            "}";
    }
}
