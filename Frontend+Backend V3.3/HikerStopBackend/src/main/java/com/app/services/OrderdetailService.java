package com.app.services;

import java.util.List;

import com.app.pojos.Order;
import com.app.pojos.OrderDetails;

public interface OrderdetailService {
	

	void saveOrderDetails(OrderDetails od);
	
	
	OrderDetails findById(int id);
	
	
	List<OrderDetails> findByOrder(Order order);
	
	
}


