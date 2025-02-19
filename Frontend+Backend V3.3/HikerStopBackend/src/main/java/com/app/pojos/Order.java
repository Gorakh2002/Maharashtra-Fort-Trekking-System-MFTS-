package com.app.pojos;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="orders")
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int orderid;
	
	
	private Date orderDate;
	
	
	@ManyToOne
	@JoinColumn(name="customerId")
	private Customer customer;
	
	
	@ManyToOne
	@JoinColumn(name="addressId")
	private Address address;
	
	
	@ManyToOne
	@JoinColumn(name="paymentId")
	private Payment payment;
	
	
}
