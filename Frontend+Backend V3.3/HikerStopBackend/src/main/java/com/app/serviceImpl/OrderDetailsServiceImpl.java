package com.app.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.daos.OrderDefailsDao;
import com.app.pojos.Order;
import com.app.pojos.OrderDetails;
import com.app.services.OrderdetailService;

@Service
public class OrderDetailsServiceImpl implements OrderdetailService {

	@Autowired OrderDefailsDao dao;
	@Override
	public void saveOrderDetails(OrderDetails od) {
		
		dao.save(od);
	}

	@Override
	public OrderDetails findById(int id) {
		
		return dao.getById(id);
	}

	@Override
	public List<OrderDetails> findByOrder(Order order) {
		
		return dao.findByOrder(order);
	}

}
