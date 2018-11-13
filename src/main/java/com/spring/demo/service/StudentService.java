package com.spring.demo.service;

import javax.inject.Inject;

import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.spring.demo.domain.Student;
import com.spring.demo.repository.StudentRepository;
import com.spring.demo.service.dto.StudentDTO;

/**
 * Service class for managing users.
 */
@Service
public class StudentService {

	private final Logger log = LoggerFactory.getLogger(StudentService.class);

	@Inject
	private StudentRepository studentRepository;

	/*
	 * Save Quiz
	 */
	public StudentDTO saveStudent(StudentDTO studentDTO) {
		Student student = new Student();
		studentDTO.setId(new ObjectId().toString());
		BeanUtils.copyProperties(studentDTO, student);
		studentRepository.save(student);
		//quizDTO.setAnswerA("Question saved Successfully  !");
		return studentDTO;
	}
	
	public StudentDTO updateStudent(StudentDTO studentDTO) {
		Student student = new Student();
		BeanUtils.copyProperties(studentDTO, student);
		studentRepository.save(student);
		//quizDTO.setAnswerA("Question saved Successfully  !");
		return studentDTO;
	}
	
	/*public Page<Quiz> getAllQuizQuestions(Pageable pageable) {
		
		
		return quizRepository.findAll(pageable);
	}


	public QuizDTO getQuizQuestionDetail(String id) {
		// TODO Auto-generated method stub
		return null;
	}


	public void deleteUser(String id) {
		quizRepository.delete(id);
		
	}*/

}
