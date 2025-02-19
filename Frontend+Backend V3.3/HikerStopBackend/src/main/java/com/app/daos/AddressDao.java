package com.app.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojos.Address;

@Repository
public interface AddressDao extends JpaRepository<Address, Integer> {

}
