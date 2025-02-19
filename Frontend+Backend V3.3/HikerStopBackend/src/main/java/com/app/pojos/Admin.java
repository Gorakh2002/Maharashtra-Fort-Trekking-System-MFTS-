package com.app.pojos;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Admin {

	@Id
	private String userid; //email
	
	
	private String pwd;
	
	
	private String uname;
	
	
}