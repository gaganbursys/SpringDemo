package com.spring.demo.repository;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.spring.demo.domain.Quiz;

/**
 * Spring Data MongoDB repository for the User entity.
 */
@Repository
public interface QuizRepository extends MongoRepository<Quiz, String> {

	Page<Quiz> findAll(Pageable pageable);
	
}
