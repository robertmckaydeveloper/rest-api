package com.example.restapi.entity;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jpa.test.autoconfigure.TestEntityManager;

@DataJpaTest
public class CustomerTest {

    @Autowired
    private TestEntityManager entityManager;

    @Test
    public void shouldCreateCustomer() {

        var name = "robert";
        var email = "robert.mckay.developer@gmail.com";
        Customer customer = new Customer (name, email);

        entityManager.flush();

        assert customer.getName().equals(name);
        assert customer.getEmail().equals(email);
    }
}