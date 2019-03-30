package com.eap.project.repository;

import com.eap.project.domain.SickLeaveHoliday;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SickLeaveHoliday entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SickLeaveHolidayRepository extends JpaRepository<SickLeaveHoliday, Long> {

}
