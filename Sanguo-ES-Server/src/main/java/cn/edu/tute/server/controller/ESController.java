package cn.edu.tute.server.controller;


import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;


import java.io.IOException;

@Controller
public class ESController {
    @Autowired
    private RestClient restClient;



}
