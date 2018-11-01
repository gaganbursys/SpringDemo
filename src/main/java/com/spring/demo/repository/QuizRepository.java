package com.spring.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.spring.demo.domain.Quiz;

/**
 * Spring Data MongoDB repository for the User entity.
 */
@Repository
public interface QuizRepository extends MongoRepository<Quiz, String> {

   
}
