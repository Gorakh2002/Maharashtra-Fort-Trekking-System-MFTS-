package com.app.dto;

import java.util.List;

import com.app.pojos.Order;

import lombok.Data;

@Data
public class OrderResponseDTO {

	private Order order;
	
	
	private List<OrderDetailsDTO> details;
		
	
}
