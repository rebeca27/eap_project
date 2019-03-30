package com.eap.project.service;

import com.eap.project.domain.SickLeaveHoliday;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing SickLeaveHoliday.
 */
public interface SickLeaveHolidayService {

    /**
     * Save a sickLeaveHoliday.
     *
     * @param sickLeaveHoliday the entity to save
     * @return the persisted entity
     */
    SickLeaveHoliday save(SickLeaveHoliday sickLeaveHoliday);

    /**
     * Get all the sickLeaveHolidays.
     *
     * @return the list of entities
     */
    List<SickLeaveHoliday> findAll();


    /**
     * Get the "id" sickLeaveHoliday.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SickLeaveHoliday> findOne(Long id);

    /**
     * Delete the "id" sickLeaveHoliday.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
