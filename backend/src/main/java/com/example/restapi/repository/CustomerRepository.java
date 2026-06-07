package com.example.restapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.restapi.entity.Customer;


public interface CustomerRepository extends JpaRepository<Customer, Long> {

    public List<Customer> findByNameContainingIgnoreCase(String name);

}
