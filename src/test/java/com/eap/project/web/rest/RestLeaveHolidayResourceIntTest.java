package com.eap.project.web.rest;

import com.eap.project.EapProjectApp;

import com.eap.project.domain.RestLeaveHoliday;
import com.eap.project.repository.RestLeaveHolidayRepository;
import com.eap.project.service.RestLeaveHolidayService;
import com.eap.project.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.eap.project.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RestLeaveHolidayResource REST controller.
 *
 * @see RestLeaveHolidayResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EapProjectApp.class)
public class RestLeaveHolidayResourceIntTest {

    @Autowired
    private RestLeaveHolidayRepository restLeaveHolidayRepository;

    @Autowired
    private RestLeaveHolidayService restLeaveHolidayService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restRestLeaveHolidayMockMvc;

    private RestLeaveHoliday restLeaveHoliday;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RestLeaveHolidayResource restLeaveHolidayResource = new RestLeaveHolidayResource(restLeaveHolidayService);
        this.restRestLeaveHolidayMockMvc = MockMvcBuilders.standaloneSetup(restLeaveHolidayResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RestLeaveHoliday createEntity(EntityManager em) {
        RestLeaveHoliday restLeaveHoliday = new RestLeaveHoliday();
        return restLeaveHoliday;
    }

    @Before
    public void initTest() {
        restLeaveHoliday = createEntity(em);
    }

    @Test
    @Transactional
    public void createRestLeaveHoliday() throws Exception {
        int databaseSizeBeforeCreate = restLeaveHolidayRepository.findAll().size();

        // Create the RestLeaveHoliday
        restRestLeaveHolidayMockMvc.perform(post("/api/rest-leave-holidays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restLeaveHoliday)))
            .andExpect(status().isCreated());

        // Validate the RestLeaveHoliday in the database
        List<RestLeaveHoliday> restLeaveHolidayList = restLeaveHolidayRepository.findAll();
        assertThat(restLeaveHolidayList).hasSize(databaseSizeBeforeCreate + 1);
        RestLeaveHoliday testRestLeaveHoliday = restLeaveHolidayList.get(restLeaveHolidayList.size() - 1);
    }

    @Test
    @Transactional
    public void createRestLeaveHolidayWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = restLeaveHolidayRepository.findAll().size();

        // Create the RestLeaveHoliday with an existing ID
        restLeaveHoliday.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRestLeaveHolidayMockMvc.perform(post("/api/rest-leave-holidays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restLeaveHoliday)))
            .andExpect(status().isBadRequest());

        // Validate the RestLeaveHoliday in the database
        List<RestLeaveHoliday> restLeaveHolidayList = restLeaveHolidayRepository.findAll();
        assertThat(restLeaveHolidayList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRestLeaveHolidays() throws Exception {
        // Initialize the database
        restLeaveHolidayRepository.saveAndFlush(restLeaveHoliday);

        // Get all the restLeaveHolidayList
        restRestLeaveHolidayMockMvc.perform(get("/api/rest-leave-holidays?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(restLeaveHoliday.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getRestLeaveHoliday() throws Exception {
        // Initialize the database
        restLeaveHolidayRepository.saveAndFlush(restLeaveHoliday);

        // Get the restLeaveHoliday
        restRestLeaveHolidayMockMvc.perform(get("/api/rest-leave-holidays/{id}", restLeaveHoliday.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(restLeaveHoliday.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRestLeaveHoliday() throws Exception {
        // Get the restLeaveHoliday
        restRestLeaveHolidayMockMvc.perform(get("/api/rest-leave-holidays/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRestLeaveHoliday() throws Exception {
        // Initialize the database
        restLeaveHolidayService.save(restLeaveHoliday);

        int databaseSizeBeforeUpdate = restLeaveHolidayRepository.findAll().size();

        // Update the restLeaveHoliday
        RestLeaveHoliday updatedRestLeaveHoliday = restLeaveHolidayRepository.findById(restLeaveHoliday.getId()).get();
        // Disconnect from session so that the updates on updatedRestLeaveHoliday are not directly saved in db
        em.detach(updatedRestLeaveHoliday);

        restRestLeaveHolidayMockMvc.perform(put("/api/rest-leave-holidays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRestLeaveHoliday)))
            .andExpect(status().isOk());

        // Validate the RestLeaveHoliday in the database
        List<RestLeaveHoliday> restLeaveHolidayList = restLeaveHolidayRepository.findAll();
        assertThat(restLeaveHolidayList).hasSize(databaseSizeBeforeUpdate);
        RestLeaveHoliday testRestLeaveHoliday = restLeaveHolidayList.get(restLeaveHolidayList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingRestLeaveHoliday() throws Exception {
        int databaseSizeBeforeUpdate = restLeaveHolidayRepository.findAll().size();

        // Create the RestLeaveHoliday

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRestLeaveHolidayMockMvc.perform(put("/api/rest-leave-holidays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restLeaveHoliday)))
            .andExpect(status().isBadRequest());

        // Validate the RestLeaveHoliday in the database
        List<RestLeaveHoliday> restLeaveHolidayList = restLeaveHolidayRepository.findAll();
        assertThat(restLeaveHolidayList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRestLeaveHoliday() throws Exception {
        // Initialize the database
        restLeaveHolidayService.save(restLeaveHoliday);

        int databaseSizeBeforeDelete = restLeaveHolidayRepository.findAll().size();

        // Delete the restLeaveHoliday
        restRestLeaveHolidayMockMvc.perform(delete("/api/rest-leave-holidays/{id}", restLeaveHoliday.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RestLeaveHoliday> restLeaveHolidayList = restLeaveHolidayRepository.findAll();
        assertThat(restLeaveHolidayList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RestLeaveHoliday.class);
        RestLeaveHoliday restLeaveHoliday1 = new RestLeaveHoliday();
        restLeaveHoliday1.setId(1L);
        RestLeaveHoliday restLeaveHoliday2 = new RestLeaveHoliday();
        restLeaveHoliday2.setId(restLeaveHoliday1.getId());
        assertThat(restLeaveHoliday1).isEqualTo(restLeaveHoliday2);
        restLeaveHoliday2.setId(2L);
        assertThat(restLeaveHoliday1).isNotEqualTo(restLeaveHoliday2);
        restLeaveHoliday1.setId(null);
        assertThat(restLeaveHoliday1).isNotEqualTo(restLeaveHoliday2);
    }
}
