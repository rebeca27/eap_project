package com.eap.project.service.impl;

import com.eap.project.service.SickLeaveHolidayService;
import com.eap.project.domain.SickLeaveHoliday;
import com.eap.project.repository.SickLeaveHolidayRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing SickLeaveHoliday.
 */
@Service
@Transactional
public class SickLeaveHolidayServiceImpl implements SickLeaveHolidayService {

    private final Logger log = LoggerFactory.getLogger(SickLeaveHolidayServiceImpl.class);

    private final SickLeaveHolidayRepository sickLeaveHolidayRepository;

    public SickLeaveHolidayServiceImpl(SickLeaveHolidayRepository sickLeaveHolidayRepository) {
        this.sickLeaveHolidayRepository = sickLeaveHolidayRepository;
    }

    /**
     * Save a sickLeaveHoliday.
     *
     * @param sickLeaveHoliday the entity to save
     * @return the persisted entity
     */
    @Override
    public SickLeaveHoliday save(SickLeaveHoliday sickLeaveHoliday) {
        log.debug("Request to save SickLeaveHoliday : {}", sickLeaveHoliday);
        return sickLeaveHolidayRepository.save(sickLeaveHoliday);
    }

    /**
     * Get all the sickLeaveHolidays.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SickLeaveHoliday> findAll() {
        log.debug("Request to get all SickLeaveHolidays");
        return sickLeaveHolidayRepository.findAll();
    }


    /**
     * Get one sickLeaveHoliday by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SickLeaveHoliday> findOne(Long id) {
        log.debug("Request to get SickLeaveHoliday : {}", id);
        return sickLeaveHolidayRepository.findById(id);
    }

    /**
     * Delete the sickLeaveHoliday by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SickLeaveHoliday : {}", id);
        sickLeaveHolidayRepository.deleteById(id);
    }
}
