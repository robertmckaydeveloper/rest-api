package com.example.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.restapi.entity.Customer;

import jakarta.transaction.Transactional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Transactional
    public int deleteByName(String name);

}
