package com.eap.project.web.rest;

import com.eap.project.EapProjectApp;

import com.eap.project.domain.SickLeaveHoliday;
import com.eap.project.repository.SickLeaveHolidayRepository;
import com.eap.project.service.SickLeaveHolidayService;
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
 * Test class for the SickLeaveHolidayResource REST controller.
 *
 * @see SickLeaveHolidayResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EapProjectApp.class)
public class SickLeaveHolidayResourceIntTest {

    private static final String DEFAULT_REASON = "AAAAAAAAAA";
    private static final String UPDATED_REASON = "BBBBBBBBBB";

    @Autowired
    private SickLeaveHolidayRepository sickLeaveHolidayRepository;

    @Autowired
    private SickLeaveHolidayService sickLeaveHolidayService;

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

    private MockMvc restSickLeaveHolidayMockMvc;

    private SickLeaveHoliday sickLeaveHoliday;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SickLeaveHolidayResource sickLeaveHolidayResource = new SickLeaveHolidayResource(sickLeaveHolidayService);
        this.restSickLeaveHolidayMockMvc = MockMvcBuilders.standaloneSetup(sickLeaveHolidayResource)
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
    public static SickLeaveHoliday createEntity(EntityManager em) {
        SickLeaveHoliday sickLeaveHoliday = new SickLeaveHoliday()
            .reason(DEFAULT_REASON);
        return sickLeaveHoliday;
    }

    @Before
    public void initTest() {
        sickLeaveHoliday = createEntity(em);
    }

    @Test
    @Transactional
    public void createSickLeaveHoliday() throws Exception {
        int databaseSizeBeforeCreate = sickLeaveHolidayRepository.findAll().size();

        // Create the SickLeaveHoliday
        restSickLeaveHolidayMockMvc.perform(post("/api/sick-leave-holidays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sickLeaveHoliday)))
            .andExpect(status().isCreated());

        // Validate the SickLeaveHoliday in the database
        List<SickLeaveHoliday> sickLeaveHolidayList = sickLeaveHolidayRepository.findAll();
        assertThat(sickLeaveHolidayList).hasSize(databaseSizeBeforeCreate + 1);
        SickLeaveHoliday testSickLeaveHoliday = sickLeaveHolidayList.get(sickLeaveHolidayList.size() - 1);
        assertThat(testSickLeaveHoliday.getReason()).isEqualTo(DEFAULT_REASON);
    }

    @Test
    @Transactional
    public void createSickLeaveHolidayWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sickLeaveHolidayRepository.findAll().size();

        // Create the SickLeaveHoliday with an existing ID
        sickLeaveHoliday.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSickLeaveHolidayMockMvc.perform(post("/api/sick-leave-holidays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sickLeaveHoliday)))
            .andExpect(status().isBadRequest());

        // Validate the SickLeaveHoliday in the database
        List<SickLeaveHoliday> sickLeaveHolidayList = sickLeaveHolidayRepository.findAll();
        assertThat(sickLeaveHolidayList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSickLeaveHolidays() throws Exception {
        // Initialize the database
        sickLeaveHolidayRepository.saveAndFlush(sickLeaveHoliday);

        // Get all the sickLeaveHolidayList
        restSickLeaveHolidayMockMvc.perform(get("/api/sick-leave-holidays?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sickLeaveHoliday.getId().intValue())))
            .andExpect(jsonPath("$.[*].reason").value(hasItem(DEFAULT_REASON.toString())));
    }
    
    @Test
    @Transactional
    public void getSickLeaveHoliday() throws Exception {
        // Initialize the database
        sickLeaveHolidayRepository.saveAndFlush(sickLeaveHoliday);

        // Get the sickLeaveHoliday
        restSickLeaveHolidayMockMvc.perform(get("/api/sick-leave-holidays/{id}", sickLeaveHoliday.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sickLeaveHoliday.getId().intValue()))
            .andExpect(jsonPath("$.reason").value(DEFAULT_REASON.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSickLeaveHoliday() throws Exception {
        // Get the sickLeaveHoliday
        restSickLeaveHolidayMockMvc.perform(get("/api/sick-leave-holidays/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSickLeaveHoliday() throws Exception {
        // Initialize the database
        sickLeaveHolidayService.save(sickLeaveHoliday);

        int databaseSizeBeforeUpdate = sickLeaveHolidayRepository.findAll().size();

        // Update the sickLeaveHoliday
        SickLeaveHoliday updatedSickLeaveHoliday = sickLeaveHolidayRepository.findById(sickLeaveHoliday.getId()).get();
        // Disconnect from session so that the updates on updatedSickLeaveHoliday are not directly saved in db
        em.detach(updatedSickLeaveHoliday);
        updatedSickLeaveHoliday
            .reason(UPDATED_REASON);

        restSickLeaveHolidayMockMvc.perform(put("/api/sick-leave-holidays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSickLeaveHoliday)))
            .andExpect(status().isOk());

        // Validate the SickLeaveHoliday in the database
        List<SickLeaveHoliday> sickLeaveHolidayList = sickLeaveHolidayRepository.findAll();
        assertThat(sickLeaveHolidayList).hasSize(databaseSizeBeforeUpdate);
        SickLeaveHoliday testSickLeaveHoliday = sickLeaveHolidayList.get(sickLeaveHolidayList.size() - 1);
        assertThat(testSickLeaveHoliday.getReason()).isEqualTo(UPDATED_REASON);
    }

    @Test
    @Transactional
    public void updateNonExistingSickLeaveHoliday() throws Exception {
        int databaseSizeBeforeUpdate = sickLeaveHolidayRepository.findAll().size();

        // Create the SickLeaveHoliday

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSickLeaveHolidayMockMvc.perform(put("/api/sick-leave-holidays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sickLeaveHoliday)))
            .andExpect(status().isBadRequest());

        // Validate the SickLeaveHoliday in the database
        List<SickLeaveHoliday> sickLeaveHolidayList = sickLeaveHolidayRepository.findAll();
        assertThat(sickLeaveHolidayList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSickLeaveHoliday() throws Exception {
        // Initialize the database
        sickLeaveHolidayService.save(sickLeaveHoliday);

        int databaseSizeBeforeDelete = sickLeaveHolidayRepository.findAll().size();

        // Delete the sickLeaveHoliday
        restSickLeaveHolidayMockMvc.perform(delete("/api/sick-leave-holidays/{id}", sickLeaveHoliday.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SickLeaveHoliday> sickLeaveHolidayList = sickLeaveHolidayRepository.findAll();
        assertThat(sickLeaveHolidayList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SickLeaveHoliday.class);
        SickLeaveHoliday sickLeaveHoliday1 = new SickLeaveHoliday();
        sickLeaveHoliday1.setId(1L);
        SickLeaveHoliday sickLeaveHoliday2 = new SickLeaveHoliday();
        sickLeaveHoliday2.setId(sickLeaveHoliday1.getId());
        assertThat(sickLeaveHoliday1).isEqualTo(sickLeaveHoliday2);
        sickLeaveHoliday2.setId(2L);
        assertThat(sickLeaveHoliday1).isNotEqualTo(sickLeaveHoliday2);
        sickLeaveHoliday1.setId(null);
        assertThat(sickLeaveHoliday1).isNotEqualTo(sickLeaveHoliday2);
    }
}
