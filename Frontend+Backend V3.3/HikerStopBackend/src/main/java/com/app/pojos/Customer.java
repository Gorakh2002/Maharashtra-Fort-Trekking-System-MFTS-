package com.app.pojos;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;

import lombok.Data;

@Entity
@Data
public class Customer {
	
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	
	private int id;
	
	
	private String name;
	
	
	private String city;
	
	
	@Email(message="Please provide a valid email address")
	@Column(name = "email", unique = true)
	private String userid;
	
	
	private String pwd;
	
	
	@Pattern(regexp="(^[0-9]{10}$)")
	private String phone;
	
	
	private String gender;
	
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_timestamp")
	private Date createdTimestamp=new Date();
	

}