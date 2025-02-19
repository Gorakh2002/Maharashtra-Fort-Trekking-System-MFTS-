package com.app.dto;

import java.time.LocalDateTime;

import lombok.Data;


@Data
public class ErrorResponse {
	
	
	private String message;
	
	
	private String errorDetails;
	
	
	private LocalDateTime timeStamp;
	
	
	public ErrorResponse(String message, String errorDetails) {
		super();
		this.message = message;
		this.errorDetails = errorDetails;
		timeStamp=LocalDateTime.now();
	}	
}

