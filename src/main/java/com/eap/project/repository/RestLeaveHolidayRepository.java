package com.eap.project.repository;

import com.eap.project.domain.RestLeaveHoliday;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RestLeaveHoliday entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RestLeaveHolidayRepository extends JpaRepository<RestLeaveHoliday, Long> {

}
