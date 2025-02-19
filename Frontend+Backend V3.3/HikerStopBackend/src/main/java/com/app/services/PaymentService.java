package com.app.services;

import com.app.pojos.Payment;

public interface PaymentService {
	
	
	Payment savePayment(Payment payment);
	
	
	Payment findPaymentById(int id);
	
	
}
