package com.app.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.daos.GuideDao;
import com.app.pojos.Guide;
import com.app.services.GuideService;


@Service
public class GuideServiceImpl implements GuideService {

	@Autowired 
	private GuideDao dao;
	@Autowired
	private EmailService emailService;
	PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	
	@Override
	public Guide registerGuide(Guide guide) {
		emailService.sendEmailForNewRegistration(guide.getUserid(), guide.getPwd());
		guide.setPwd(this.passwordEncoder.encode(guide.getPwd()));
		
		return dao.save(guide);
	}

	@Override
	public List<Guide> allGuide() {
		
		return dao.findAll();
	}

	@Override
	public Guide findById(int id) {
		
		return dao.getById(id);
	}

	@Override
	public Guide validate(String userid, String pwd) {
		Guide seller=dao.findByUserid(userid);
		if(seller!=null && passwordEncoder.matches(pwd, seller.getPwd())) {
			return seller;
		}
		return null;
	}

	@Override
	public void deleteGuide(int id) {
		
		Guide guide=dao.getById(id);
		dao.delete(guide);
	}

}
