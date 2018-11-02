package com.spring.demo.web.rest;

import java.net.URISyntaxException;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;
import com.spring.demo.security.AuthoritiesConstants;
import com.spring.demo.service.QuizService;
import com.spring.demo.service.dto.QuizDTO;


@RestController
@RequestMapping("/api")
public class QuizResource {

    private final Logger log = LoggerFactory.getLogger(QuizResource.class);
    
    @Inject
    private QuizService quizService;
  
    @PostMapping("/quiz")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<QuizDTO> createQuiz( @RequestBody QuizDTO quizDTO) throws URISyntaxException {
        log.debug("REST request to save User : {}", quizDTO);
        return new ResponseEntity<>(quizService.saveQuiz(quizDTO),HttpStatus.OK);
    
    }
    
}
