package cn.edu.tute.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class CenterController {
    private static final String REST_URL_PREFIX="http://localhost:8000";
    @Autowired
    RestTemplate restTemplate;

    @RequestMapping("/consumer/discoverty")
    public String discovery(){
        return restTemplate.getForObject(REST_URL_PREFIX+"/xxx",String.class);
    }
}
