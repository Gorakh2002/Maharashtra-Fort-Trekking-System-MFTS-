package com.app.dto;

import java.util.List;

import com.app.pojos.Address;
import com.app.pojos.Payment;

import lombok.Data;


@Data
public class PlaceOrderDTO {

	private Address address;
	
	
	private List<CartDTO> cart;
	
	
	private Payment payment;
	
	
	private int customerid;
	
	
	

}
