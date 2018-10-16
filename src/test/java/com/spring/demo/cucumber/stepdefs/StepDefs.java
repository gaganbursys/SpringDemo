package com.spring.demo.cucumber.stepdefs;

import com.spring.demo.SpringDemoApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = SpringDemoApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
