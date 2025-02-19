package com.app.dto;

import org.springframework.beans.BeanUtils;

import com.app.pojos.Event;
import com.app.pojos.OrderDetails;

import lombok.Data;


@Data
public class OrderDetailsDTO {
	
	
	private int id;
	
	
	private Event event;
	
	
	private int qty;
	

	public static OrderDetailsDTO fromEntity(OrderDetails entity) {
		OrderDetailsDTO dto = new OrderDetailsDTO();
		BeanUtils.copyProperties(entity, dto);		
		return dto;
	}
}
