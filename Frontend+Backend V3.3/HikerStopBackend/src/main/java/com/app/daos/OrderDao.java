package com.app.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojos.Customer;
import com.app.pojos.Order;

@Repository
public interface OrderDao extends JpaRepository<Order, Integer> {
	
	
	List<Order> findByCustomer(Customer customer);
	
	
}
