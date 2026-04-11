package com.example.restapi.repository;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jpa.test.autoconfigure.TestEntityManager;

import com.example.restapi.entity.Customer;

@DataJpaTest
public class CustomerRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private CustomerRepository repository;

    @Test
    void shouldDeleteCustomerByName() {

        Customer customer = new Customer("robert", "robert@email.com");
        entityManager.persistAndFlush(customer);
        assertTrue(repository.existsById(customer.getId()));

        repository.deleteByName("robert");
        assertFalse(repository.existsById(customer.getId()));

    }

}
