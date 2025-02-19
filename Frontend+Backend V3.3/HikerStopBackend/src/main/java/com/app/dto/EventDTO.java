package com.app.dto;

import java.sql.Date;

import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;

import com.app.pojos.Event;

import lombok.Data;


@Data
public class EventDTO {
	
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
	
	
	private String location;
	
	
	private MultipartFile pic1;
	
	
	private MultipartFile pic2;
	
	
	private MultipartFile pic3;
	
	 private Date date;
	
	
	public static Event toEntity(EventDTO dto) {
		Event entity=new Event();
		BeanUtils.copyProperties(dto, entity, "pic1", "pic2", "pic3");		
		return entity;
	}
	
}
