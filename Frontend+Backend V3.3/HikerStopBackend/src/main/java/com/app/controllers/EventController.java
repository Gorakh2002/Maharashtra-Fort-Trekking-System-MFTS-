package com.app.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.EventDTO;
import com.app.dto.EventPagedResponseDTO;
import com.app.dto.EventResponseDTO;
import com.app.dto.Response;
import com.app.pojos.Event;
import com.app.pojos.Guide;
import com.app.services.EventService;
import com.app.services.GuideService;



@CrossOrigin
@RestController
@RequestMapping("/api/events")
public class EventController {
	
	@Autowired EventService eventService;
	@Autowired GuideService guideService;
	
	@PostMapping
	public ResponseEntity<?> saveEvent(EventDTO dto) {
		System.out.println(dto +"dto object");
		Event event=EventDTO.toEntity(dto);
		event.setDate(dto.getDate());
		Guide guide= guideService.findById(dto.getGuideId());
		event.setGuide(guide);
		eventService.addEvent(event,dto.getPic1(), dto.getPic2(), dto.getPic3());
//		eventService.addEvent(event,dto.getPic2());
//		eventService.addEvent(event,dto.getPic3());
		return Response.success(event);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<?> updateEvent(@RequestBody Event event,@PathVariable("id") int id) {
		System.out.println(event);		
		eventService.updateEvent(event);
		return Response.success(event);		
	}
	
	@GetMapping("{id}")
	public ResponseEntity<?> findEvent(@PathVariable("id")int id) {
		System.out.println(id);
		
		Event event=eventService.findEventById(id);
		System.out.println("get evnt detail : "+event);
		return Response.success(EventResponseDTO.fromEntity(event));
	}
	
	@GetMapping
	public ResponseEntity<?> findAllEvents(Optional<Integer> guideid,Optional<String> cat) {
		System.out.println("whyyyyyy");
		List<EventResponseDTO> result = new ArrayList<EventResponseDTO>();
		
		if(guideid.isPresent()) {
			
			for(Event p : eventService.findEvent(guideid.get())) {
				result.add(EventResponseDTO.fromEntity(p));
				System.out.println(result);
			}
		}
		else if(cat.isPresent()) {
			for(Event p : eventService.categoryEvent(cat.get())) {
				result.add(EventResponseDTO.fromEntity(p));
			}
		}
		else {
			for(Event p : eventService.allEvent()) {
				result.add(EventResponseDTO.fromEntity(p));
			}
		}
		
		return Response.success(result);
	}
	
	@GetMapping("/paginated")
	public ResponseEntity<?> paginatedEvents(int page,int pagesize) {
		List<EventResponseDTO> result = new ArrayList<EventResponseDTO>();
		Page<Event> data=eventService.allEventsPaginated(page, pagesize);
		data.forEach(item-> {
			result.add(EventResponseDTO.fromEntity(item));
		});
		EventPagedResponseDTO resp=new EventPagedResponseDTO();
		resp.setPagesize(pagesize);
		resp.setCurrent(page);
		resp.setTotal(data.getTotalElements());
		resp.setEventlist(result);
		return Response.success(resp);
	}
	
	
	@DeleteMapping("{id}")
	public ResponseEntity<?> deleteEvent(@PathVariable("id") int id) {
		eventService.deleteEvent(id);
		return Response.status(HttpStatus.OK);
	}
}
