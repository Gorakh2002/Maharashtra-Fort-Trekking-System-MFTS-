package com.app.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.daos.PaymentDao;
import com.app.pojos.Payment;
import com.app.services.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService {

	@Autowired PaymentDao dao;
	
	@Override
	public Payment savePayment(Payment payment) {
		
		return dao.save(payment);
	}

	@Override
	public Payment findPaymentById(int id) {
		
		return dao.getById(id);
	}

}
