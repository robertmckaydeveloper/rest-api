package com.example.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.restapi.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
