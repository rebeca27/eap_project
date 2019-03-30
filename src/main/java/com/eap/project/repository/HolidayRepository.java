package com.eap.project.repository;

import com.eap.project.domain.Holiday;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Holiday entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HolidayRepository extends JpaRepository<Holiday, Long> {

}
