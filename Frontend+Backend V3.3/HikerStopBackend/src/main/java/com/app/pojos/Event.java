package com.app.pojos;

import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Entity
@Data
@Table(name="event")
public class Event {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int eventid;
	
	
	private String eventname;
	
	
	private String location;
	
	
	private String eventcat;
	
	
	private String noofdays;
	
	@Column(length = 4000)
	private String dailywiseschedule;
	
	@Column(length = 4000)
	private String thingstocarry;
	
	
	private String pickupanddroplocation;
	
	
	private int price;
	
	@Column(length = 4000)
	private String description;
	
	
	private String photo1;
	
	
	private String photo2;
	
	
	private String photo3;
	
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_timestamp", insertable = false, updatable = false)
	private Date createdTimestamp;
	
	@Basic
	private Date date;
	
	@ManyToOne
	@JoinColumn(name="guided")
	private Guide guide;
	
	
	
}