package com.app.daos;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojos.Event;
import com.app.pojos.Guide;



@Repository
public interface EventDao extends JpaRepository<Event, Integer> {
	
	
	List<Event> findByGuide(Guide guideId,Sort sort);
	
	
	List<Event> findByEventcat(String pcat,Sort sort);
	
	
}
