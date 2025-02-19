package com.app.services;

import com.app.pojos.Address;

public interface AddressService {
	
	
	Address saveAddress(Address address);
	
	
	Address findAddress(int id);
	
	
}
