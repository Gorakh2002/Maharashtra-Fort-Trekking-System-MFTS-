package com.app.dto;

import java.util.List;

import lombok.Data;

@Data
public class EventPagedResponseDTO {
	
	
	private List<EventResponseDTO> eventlist;
	
	
	private int current;
	
	
	private long total;
	
	
	private int pagesize;
	
//	public List<EventResponseDTO> eventlist() {
//		return eventlist;
//	}
//	public void eventlist(List<EventResponseDTO> eventlist) {
//		this.eventlist = eventlist;
//	}
		
	
}
