package com.app.services;

import java.util.List;

import com.app.pojos.Customer;

public interface CustomerService {
	
	
	Customer registerCustomer(Customer cust);
	
	
	List<Customer> allCustomers();
	
	
	Customer findById(int id);
	
	
	Customer validate(String userid,String pwd);
	
	
	boolean verifyUserId(String userid);
	
	
	void updateProfile(Customer cust);
	
	
}
