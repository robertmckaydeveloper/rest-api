package com.example.restapi.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.restapi.entity.Customer;
import com.example.restapi.repository.CustomerRepository;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public void deleteCustomerById(Long id) {
        customerRepository.deleteById(id);
    }

    public int deleteCustomerByName(String name) {
        return customerRepository.deleteByName(name);
    }

}