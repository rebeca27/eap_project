package com.eap.project.web.rest;
import com.eap.project.domain.RestLeaveHoliday;
import com.eap.project.service.RestLeaveHolidayService;
import com.eap.project.web.rest.errors.BadRequestAlertException;
import com.eap.project.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing RestLeaveHoliday.
 */
@RestController
@RequestMapping("/api")
public class RestLeaveHolidayResource {

    private final Logger log = LoggerFactory.getLogger(RestLeaveHolidayResource.class);

    private static final String ENTITY_NAME = "restLeaveHoliday";

    private final RestLeaveHolidayService restLeaveHolidayService;

    public RestLeaveHolidayResource(RestLeaveHolidayService restLeaveHolidayService) {
        this.restLeaveHolidayService = restLeaveHolidayService;
    }

    /**
     * POST  /rest-leave-holidays : Create a new restLeaveHoliday.
     *
     * @param restLeaveHoliday the restLeaveHoliday to create
     * @return the ResponseEntity with status 201 (Created) and with body the new restLeaveHoliday, or with status 400 (Bad Request) if the restLeaveHoliday has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rest-leave-holidays")
    public ResponseEntity<RestLeaveHoliday> createRestLeaveHoliday(@RequestBody RestLeaveHoliday restLeaveHoliday) throws URISyntaxException {
        log.debug("REST request to save RestLeaveHoliday : {}", restLeaveHoliday);
        if (restLeaveHoliday.getId() != null) {
            throw new BadRequestAlertException("A new restLeaveHoliday cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RestLeaveHoliday result = restLeaveHolidayService.save(restLeaveHoliday);
        return ResponseEntity.created(new URI("/api/rest-leave-holidays/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rest-leave-holidays : Updates an existing restLeaveHoliday.
     *
     * @param restLeaveHoliday the restLeaveHoliday to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated restLeaveHoliday,
     * or with status 400 (Bad Request) if the restLeaveHoliday is not valid,
     * or with status 500 (Internal Server Error) if the restLeaveHoliday couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rest-leave-holidays")
    public ResponseEntity<RestLeaveHoliday> updateRestLeaveHoliday(@RequestBody RestLeaveHoliday restLeaveHoliday) throws URISyntaxException {
        log.debug("REST request to update RestLeaveHoliday : {}", restLeaveHoliday);
        if (restLeaveHoliday.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RestLeaveHoliday result = restLeaveHolidayService.save(restLeaveHoliday);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, restLeaveHoliday.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rest-leave-holidays : get all the restLeaveHolidays.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of restLeaveHolidays in body
     */
    @GetMapping("/rest-leave-holidays")
    public List<RestLeaveHoliday> getAllRestLeaveHolidays() {
        log.debug("REST request to get all RestLeaveHolidays");
        return restLeaveHolidayService.findAll();
    }

    /**
     * GET  /rest-leave-holidays/:id : get the "id" restLeaveHoliday.
     *
     * @param id the id of the restLeaveHoliday to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the restLeaveHoliday, or with status 404 (Not Found)
     */
    @GetMapping("/rest-leave-holidays/{id}")
    public ResponseEntity<RestLeaveHoliday> getRestLeaveHoliday(@PathVariable Long id) {
        log.debug("REST request to get RestLeaveHoliday : {}", id);
        Optional<RestLeaveHoliday> restLeaveHoliday = restLeaveHolidayService.findOne(id);
        return ResponseUtil.wrapOrNotFound(restLeaveHoliday);
    }

    /**
     * DELETE  /rest-leave-holidays/:id : delete the "id" restLeaveHoliday.
     *
     * @param id the id of the restLeaveHoliday to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rest-leave-holidays/{id}")
    public ResponseEntity<Void> deleteRestLeaveHoliday(@PathVariable Long id) {
        log.debug("REST request to delete RestLeaveHoliday : {}", id);
        restLeaveHolidayService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
