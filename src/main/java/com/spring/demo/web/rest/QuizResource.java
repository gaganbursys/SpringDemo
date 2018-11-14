package com.spring.demo.web.rest;

import java.net.URISyntaxException;
import java.util.List;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;
import com.spring.demo.domain.Quiz;
import com.spring.demo.security.AuthoritiesConstants;
import com.spring.demo.service.QuizService;
import com.spring.demo.service.dto.QuizDTO;
import com.spring.demo.web.rest.util.HeaderUtil;
import com.spring.demo.web.rest.util.PaginationUtil;


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
    
    
    /**
     * GET /users : get all users.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and with body all users
     */
    @GetMapping("/quiz")
    @Timed
    public ResponseEntity<List<Quiz>> getAllUsers(Pageable pageable) {
        final Page<Quiz> page = quizService.getAllQuizQuestions(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/quiz");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/quiz/{id}",
	method   = RequestMethod.GET,
	produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<QuizDTO> getQuiz(@PathVariable String id) {
        log.debug(":::ID::::", id);
        QuizDTO dto = quizService.getQuizQuestionDetail(id);
        return new ResponseEntity<>(dto,HttpStatus.OK);
    }
    
    
    /**
     * DELETE /users/:login : delete the "login" User.
     *
     * @param login the login of the user to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/quiz/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        log.debug("REST request to delete quiz: {}", id);
        quizService.deleteUser(id);
        return ResponseEntity.ok().headers(HeaderUtil.createAlert( "Deleted", id)).build();
    }
    
}
