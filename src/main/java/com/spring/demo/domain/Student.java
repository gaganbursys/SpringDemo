package com.spring.demo.domain;

import java.io.Serializable;
import java.util.List;

/**
 * A DTO representing a user, with his authorities.
 */
@org.springframework.data.mongodb.core.mapping.Document(collection = "student")
public class Student extends AbstractAuditingEntity implements Serializable {

    private String id;
	private String name;
    private String email;
    private String mno;
    private List<Quiz> result;
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

	public List<Quiz> getResult() {
		return result;
	}
	public void setResult(List<Quiz> result) {
		this.result = result;
	}
   

}
