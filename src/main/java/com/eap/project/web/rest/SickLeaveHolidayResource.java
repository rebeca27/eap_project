package com.eap.project.web.rest;
import com.eap.project.domain.SickLeaveHoliday;
import com.eap.project.service.SickLeaveHolidayService;
import com.eap.project.web.rest.errors.BadRequestAlertException;
import com.eap.project.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SickLeaveHoliday.
 */
@RestController
@RequestMapping("/api")
public class SickLeaveHolidayResource {

    private final Logger log = LoggerFactory.getLogger(SickLeaveHolidayResource.class);

    private static final String ENTITY_NAME = "sickLeaveHoliday";

    private final SickLeaveHolidayService sickLeaveHolidayService;

    public SickLeaveHolidayResource(SickLeaveHolidayService sickLeaveHolidayService) {
        this.sickLeaveHolidayService = sickLeaveHolidayService;
    }

    /**
     * POST  /sick-leave-holidays : Create a new sickLeaveHoliday.
     *
     * @param sickLeaveHoliday the sickLeaveHoliday to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sickLeaveHoliday, or with status 400 (Bad Request) if the sickLeaveHoliday has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sick-leave-holidays")
    public ResponseEntity<SickLeaveHoliday> createSickLeaveHoliday(@Valid @RequestBody SickLeaveHoliday sickLeaveHoliday) throws URISyntaxException {
        log.debug("REST request to save SickLeaveHoliday : {}", sickLeaveHoliday);
        if (sickLeaveHoliday.getId() != null) {
            throw new BadRequestAlertException("A new sickLeaveHoliday cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SickLeaveHoliday result = sickLeaveHolidayService.save(sickLeaveHoliday);
        return ResponseEntity.created(new URI("/api/sick-leave-holidays/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sick-leave-holidays : Updates an existing sickLeaveHoliday.
     *
     * @param sickLeaveHoliday the sickLeaveHoliday to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sickLeaveHoliday,
     * or with status 400 (Bad Request) if the sickLeaveHoliday is not valid,
     * or with status 500 (Internal Server Error) if the sickLeaveHoliday couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sick-leave-holidays")
    public ResponseEntity<SickLeaveHoliday> updateSickLeaveHoliday(@Valid @RequestBody SickLeaveHoliday sickLeaveHoliday) throws URISyntaxException {
        log.debug("REST request to update SickLeaveHoliday : {}", sickLeaveHoliday);
        if (sickLeaveHoliday.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SickLeaveHoliday result = sickLeaveHolidayService.save(sickLeaveHoliday);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sickLeaveHoliday.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sick-leave-holidays : get all the sickLeaveHolidays.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sickLeaveHolidays in body
     */
    @GetMapping("/sick-leave-holidays")
    public List<SickLeaveHoliday> getAllSickLeaveHolidays() {
        log.debug("REST request to get all SickLeaveHolidays");
        return sickLeaveHolidayService.findAll();
    }

    /**
     * GET  /sick-leave-holidays/:id : get the "id" sickLeaveHoliday.
     *
     * @param id the id of the sickLeaveHoliday to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sickLeaveHoliday, or with status 404 (Not Found)
     */
    @GetMapping("/sick-leave-holidays/{id}")
    public ResponseEntity<SickLeaveHoliday> getSickLeaveHoliday(@PathVariable Long id) {
        log.debug("REST request to get SickLeaveHoliday : {}", id);
        Optional<SickLeaveHoliday> sickLeaveHoliday = sickLeaveHolidayService.findOne(id);
        return ResponseUtil.wrapOrNotFound(sickLeaveHoliday);
    }

    /**
     * DELETE  /sick-leave-holidays/:id : delete the "id" sickLeaveHoliday.
     *
     * @param id the id of the sickLeaveHoliday to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sick-leave-holidays/{id}")
    public ResponseEntity<Void> deleteSickLeaveHoliday(@PathVariable Long id) {
        log.debug("REST request to delete SickLeaveHoliday : {}", id);
        sickLeaveHolidayService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
