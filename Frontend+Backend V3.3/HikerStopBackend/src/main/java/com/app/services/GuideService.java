package com.app.services;

import java.util.List;

import com.app.pojos.Guide;


public interface GuideService {
	
	
	Guide registerGuide(Guide guide);
	
	
	List<Guide> allGuide();
	
	
	Guide findById(int id);
	
	
	Guide validate(String userid,String pwd);
	
	
	void deleteGuide(int id);
	
	
}
