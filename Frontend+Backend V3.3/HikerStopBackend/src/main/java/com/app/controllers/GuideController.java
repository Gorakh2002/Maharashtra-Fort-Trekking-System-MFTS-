package com.app.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ErrorResponse;
import com.app.dto.LoginDTO;
import com.app.dto.Response;
import com.app.pojos.Guide;
import com.app.services.GuideService;


@CrossOrigin
@RestController
@RequestMapping("/api/guide")
public class GuideController {

	@Autowired 
	private GuideService guideService;
	
	@PostMapping
	public ResponseEntity<?> save(@Valid @RequestBody Guide seller) {		
		
		try {	
			return new ResponseEntity<>(guideService.registerGuide(seller), HttpStatus.CREATED);

		}catch (RuntimeException e) {
			System.out.println("err in add " + e);
			return new ResponseEntity<>(new ErrorResponse("Adding Seller failed!!!!!", e.getMessage()),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
//		sellerService.registerSeller(seller);
//		return Response.success(seller);
	}
	
	@GetMapping
	public ResponseEntity<?> findAllCustomers() {
		List<Guide> result = guideService.allGuide();
		return Response.success(result);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<?> findSellerProfile(@PathVariable("id") int id) {
		Guide result = guideService.findById(id);
		return Response.success(result);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<?> deleteSeller(@PathVariable("id") int id) {
		guideService.deleteGuide(id);
		return Response.status(HttpStatus.OK);
	}
	
	@PostMapping("/validate")
	public ResponseEntity<?> validateUser(@RequestBody LoginDTO dto) {
		System.out.println(dto);
		Guide user=guideService.validate(dto.getUserid(),dto.getPwd());
		if(user!=null)
			return Response.success(user);
		else
			return Response.status(HttpStatus.NOT_FOUND);
	}
	
}
