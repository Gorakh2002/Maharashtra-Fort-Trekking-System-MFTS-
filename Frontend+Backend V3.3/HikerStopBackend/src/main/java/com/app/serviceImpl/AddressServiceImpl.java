package com.app.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.daos.AddressDao;
import com.app.pojos.Address;
import com.app.services.AddressService;

@Service
public class AddressServiceImpl implements AddressService {

	@Autowired AddressDao dao;
	
	@Override
	public Address saveAddress(Address address) {
		
		return dao.save(address);
	}

	@Override
	public Address findAddress(int id) {
		
		return dao.getById(id);
	}

}
