package com.spring.demo.service.dto;

import java.util.List;

/**
 * A DTO representing a user, with his authorities.
 */
public class StudentDTO {

    private String id;
	private String name;
    private String email;
    private String mno;
    private List<QuizDTO> result;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMno() {
		return mno;
	}
	public void setMno(String mno) {
		this.mno = mno;
	}
	public List<QuizDTO> getResult() {
		return result;
	}
	public void setResult(List<QuizDTO> result) {
		this.result = result;
	}


   

}
