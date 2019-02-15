package cn.edu.tute.server.controller;


import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.RequestLine;
import org.apache.http.entity.ContentType;
import org.apache.http.nio.entity.NStringEntity;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.client.Request;
import org.elasticsearch.client.Response;
import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.io.IOException;

@Controller
public class ESController {
    @Autowired
    private RestClient restClient;

    @RequestMapping(value = "es/test",method = RequestMethod.GET)
    public ResponseEntity<String> testES(){
        Request request=new Request("GET","/");
        request.addParameter("pretty","true");
        request.setEntity(new NStringEntity("", ContentType.APPLICATION_JSON));
        request.setJsonEntity("");

        Response response;
        try {
            response=restClient.performRequest(request);
            RequestLine requestLine = response.getRequestLine();
            HttpHost host = response.getHost();
            int statusCode = response.getStatusLine().getStatusCode();
            Header[] headers = response.getHeaders();
            String responseBody= EntityUtils.toString(response.getEntity());
            return new ResponseEntity<String>(responseBody, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
        }
            return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
    }

}
