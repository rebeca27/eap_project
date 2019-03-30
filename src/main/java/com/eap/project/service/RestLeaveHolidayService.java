package com.eap.project.service;

import com.eap.project.domain.RestLeaveHoliday;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing RestLeaveHoliday.
 */
public interface RestLeaveHolidayService {

    /**
     * Save a restLeaveHoliday.
     *
     * @param restLeaveHoliday the entity to save
     * @return the persisted entity
     */
    RestLeaveHoliday save(RestLeaveHoliday restLeaveHoliday);

    /**
     * Get all the restLeaveHolidays.
     *
     * @return the list of entities
     */
    List<RestLeaveHoliday> findAll();


    /**
     * Get the "id" restLeaveHoliday.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<RestLeaveHoliday> findOne(Long id);

    /**
     * Delete the "id" restLeaveHoliday.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
