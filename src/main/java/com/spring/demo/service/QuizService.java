package com.spring.demo.service;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.spring.demo.domain.Quiz;
import com.spring.demo.repository.QuizRepository;
import com.spring.demo.service.dto.QuizDTO;

/**
 * Service class for managing users.
 */
@Service
public class QuizService {

	private final Logger log = LoggerFactory.getLogger(QuizService.class);

	@Inject
	private QuizRepository quizRepository;

	/*
	 * Save Quiz
	 */
	public QuizDTO saveQuiz(QuizDTO quizDTO) {
		Quiz quiz = new Quiz();
		BeanUtils.copyProperties(quizDTO, quiz);
		quizRepository.save(quiz);
		quizDTO.setAnswerA("Question saved Successfully  !");
		return quizDTO;
	}
	
	public Page<Quiz> getAllQuizQuestions(Pageable pageable) {
		
		
		return quizRepository.findAll(pageable);
	}


	public QuizDTO getQuizQuestionDetail(String id) {
		// TODO Auto-generated method stub
		return null;
	}


	public void deleteUser(String id) {
		quizRepository.delete(id);
		
	}

	public QuizDTO getQuiz(String id) {
		QuizDTO quizDTO = new QuizDTO();
		Quiz quiz = quizRepository.findOne(id);
		BeanUtils.copyProperties(quiz,quizDTO);
		return quizDTO;
	}

}
