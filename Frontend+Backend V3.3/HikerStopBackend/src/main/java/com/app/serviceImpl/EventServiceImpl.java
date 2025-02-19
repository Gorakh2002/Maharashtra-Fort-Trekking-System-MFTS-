package com.app.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.daos.EventDao;
import com.app.pojos.Event;
import com.app.services.EventService;
import com.app.services.GuideService;
import com.app.utils.StorageService;

@Service
public class EventServiceImpl implements EventService{
	
	@Autowired EventDao dao;
	@Autowired
	private StorageService storageService;
	@Autowired GuideService guideService;
	@Override
	public void addEvent(Event p,MultipartFile pic1, MultipartFile pic2, MultipartFile pic3) {
		
		String photo1=storageService.store(pic1);
		String photo2=storageService.store(pic2);
		String photo3=storageService.store(pic3);
		p.setPhoto1(photo1);
		p.setPhoto2(photo2);
		p.setPhoto3(photo3);
		dao.save(p);
	}

	@Override
	public List<Event> findEvent(int guideId) {
		
		return dao.findByGuide(guideService.findById(guideId),Sort.by(Sort.Direction.DESC,"eventid"));
	}

	@Override
	public void updateEvent(Event p) {
		Event pp=dao.getById(p.getEventid());
		p.setGuide(pp.getGuide());
		dao.save(p);
	}

	@Override
	public void deleteEvent(int eventid) {
		
		Event p=dao.getById(eventid);
		dao.delete(p);
	}

	@Override
	public List<Event> allEvent() {
		
		return dao.findAll(Sort.by(Sort.Direction.DESC,"eventid"));
	}

	@Override
	public Event findEventById(int eventid) {
		
		return dao.getById(eventid);
	}

	@Override
	public List<Event> categoryEvent(String eventcat) {
		
		return dao.findByEventcat(eventcat,Sort.by(Sort.Direction.DESC,"eventid"));
	}

	@Override
	public Page<Event> allEventsPaginated(int page,int pagesize) {
		Page<Event> events=dao.findAll(PageRequest.of(page, pagesize,Sort.by(Direction.DESC, "eventid")));
		System.err.println(events.getSize());
		return events;
	}
}
