package com.spring.demo.domain;

import java.io.Serializable;

/**
 * A user.
 */

@org.springframework.data.mongodb.core.mapping.Document(collection = "quiz")
public class Quiz extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    private String id;
   	private String  category;
       private String question;
       private String answerA;
       private String answerB;
       private String answerC;
       private String answerD;
       private String correctAns;
       private String selectedAns;
       
       
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}

	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public String getAnswerA() {
		return answerA;
	}
	public void setAnswerA(String answerA) {
		this.answerA = answerA;
	}
	public String getAnswerB() {
		return answerB;
	}
	public void setAnswerB(String answerB) {
		this.answerB = answerB;
	}
	public String getAnswerC() {
		return answerC;
	}
	public void setAnswerC(String answerC) {
		this.answerC = answerC;
	}
	public String getAnswerD() {
		return answerD;
	}
	public void setAnswerD(String answerD) {
		this.answerD = answerD;
	}
	public String getCorrectAns() {
		return correctAns;
	}
	public void setCorrectAns(String correctAns) {
		this.correctAns = correctAns;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getSelectedAns() {
		return selectedAns;
	}

	public void setSelectedAns(String selectedAns) {
		this.selectedAns = selectedAns;
	}
	
}
