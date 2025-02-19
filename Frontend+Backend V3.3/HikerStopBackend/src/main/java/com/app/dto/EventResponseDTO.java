package com.app.dto;

import java.util.Date;

import org.springframework.beans.BeanUtils;

import com.app.pojos.Event;

import lombok.Data;

@Data
public class EventResponseDTO {
	

	private String location;
	
	
	private int eventid;
	
	
	private String eventname;
	
	
	private String eventcat;
	
	
	private int price;
	
	
	private String description;
	
	
	private String noofdays;
	
	
	
	private String dailywiseschedule;
	
	
	private String thingstocarry;
	
	
	private String pickupanddroplocation;
	
	
	private int guideId;
	
	
	private String guideName;
	
	
	private String photo1;
	
	
	private String photo2;
	
	
	private String photo3;
	
	private Date date;
	
		
	public static EventResponseDTO fromEntity(Event entity) {
		EventResponseDTO dto = new EventResponseDTO();
		dto.setGuideId(entity.getGuide().getId());
		dto.setGuideName(entity.getGuide().getName());
		BeanUtils.copyProperties(entity, dto);
		
		return dto;
	}
}
