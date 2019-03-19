package cn.edu.tute.server.util;

import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

@Component
public class PropertyUtil {
    public Properties getProperties(String fileName){
        InputStream inputStream = PropertyUtil.class.getClassLoader().getResourceAsStream(fileName);
        Properties properties = new Properties();
        try

        {
            properties.load(inputStream);
        } catch(
                IOException e)

        {
            e.printStackTrace();
        }
        return properties;
    }
}
