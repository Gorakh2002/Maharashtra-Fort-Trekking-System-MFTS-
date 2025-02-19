package com.app.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojos.Guide;

@Repository
public interface GuideDao extends JpaRepository<Guide, Integer> {
	
	
	Guide findByUserid(String userid);

}
