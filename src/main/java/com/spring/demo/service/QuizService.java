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
		Quiz quiz=quizRepository.findOne(id);
		QuizDTO dto=new QuizDTO();
		dto.setId(quiz.getId());
		dto.setAnswerA(quiz.getAnswerA());
		dto.setAnswerB(quiz.getAnswerB());
		dto.setAnswerC(quiz.getAnswerC());
		dto.setAnswerD(quiz.getAnswerD());
		dto.setCategory(quiz.getCategory());
		dto.setCorrectAns(quiz.getCorrectAns());
		dto.setQuestion(quiz.getQuestion());
		return dto;
	}


	public void deleteUser(String id) {
		quizRepository.delete(id);
		
	}

}
