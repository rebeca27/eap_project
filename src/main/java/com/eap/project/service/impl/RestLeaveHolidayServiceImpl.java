package com.eap.project.service.impl;

import com.eap.project.service.RestLeaveHolidayService;
import com.eap.project.domain.RestLeaveHoliday;
import com.eap.project.repository.RestLeaveHolidayRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing RestLeaveHoliday.
 */
@Service
@Transactional
public class RestLeaveHolidayServiceImpl implements RestLeaveHolidayService {

    private final Logger log = LoggerFactory.getLogger(RestLeaveHolidayServiceImpl.class);

    private final RestLeaveHolidayRepository restLeaveHolidayRepository;

    public RestLeaveHolidayServiceImpl(RestLeaveHolidayRepository restLeaveHolidayRepository) {
        this.restLeaveHolidayRepository = restLeaveHolidayRepository;
    }

    /**
     * Save a restLeaveHoliday.
     *
     * @param restLeaveHoliday the entity to save
     * @return the persisted entity
     */
    @Override
    public RestLeaveHoliday save(RestLeaveHoliday restLeaveHoliday) {
        log.debug("Request to save RestLeaveHoliday : {}", restLeaveHoliday);
        return restLeaveHolidayRepository.save(restLeaveHoliday);
    }

    /**
     * Get all the restLeaveHolidays.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<RestLeaveHoliday> findAll() {
        log.debug("Request to get all RestLeaveHolidays");
        return restLeaveHolidayRepository.findAll();
    }


    /**
     * Get one restLeaveHoliday by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RestLeaveHoliday> findOne(Long id) {
        log.debug("Request to get RestLeaveHoliday : {}", id);
        return restLeaveHolidayRepository.findById(id);
    }

    /**
     * Delete the restLeaveHoliday by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RestLeaveHoliday : {}", id);
        restLeaveHolidayRepository.deleteById(id);
    }
}
