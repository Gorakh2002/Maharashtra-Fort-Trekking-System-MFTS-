package com.app.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import com.app.pojos.Event;


public interface EventService {
	
	
	void addEvent(Event p,MultipartFile pic1, MultipartFile pic2, MultipartFile pic3);
	
	
	List<Event> findEvent(int guideId);
	
	
	void updateEvent(Event e);
	
	
	void deleteEvent(int eventid);
	
	
	List<Event> allEvent();
	
	
	List<Event> categoryEvent(String eventcat);
	
	
	Event findEventById(int eventid);
	
	
	Page<Event> allEventsPaginated(int page,int pagesize);
	
	
}




