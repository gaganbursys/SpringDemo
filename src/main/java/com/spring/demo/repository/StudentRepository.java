package com.spring.demo.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.spring.demo.domain.Student;

/**
 * Spring Data MongoDB repository for the User entity.
 */
@Repository
public interface StudentRepository extends MongoRepository<Student, String> {


   
}
