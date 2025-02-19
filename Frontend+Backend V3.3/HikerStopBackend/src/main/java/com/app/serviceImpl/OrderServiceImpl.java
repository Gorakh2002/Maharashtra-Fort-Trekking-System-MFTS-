package com.app.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.daos.OrderDao;
import com.app.pojos.Customer;
import com.app.pojos.Order;
import com.app.services.OrderService;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired OrderDao dao;
	
	@Override
	public Order saveOrder(Order order) {
		
		return dao.save(order);
	}

	@Override
	public List<Order> getAllOrders() {
		
		return dao.findAll();
	}

	@Override
	public List<Order> getCustomerOrders(Customer customer) {
	
		return dao.findByCustomer(customer);
	}

	@Override
	public Order findById(int id) {
		
		return dao.getById(id);
	}

	
}
