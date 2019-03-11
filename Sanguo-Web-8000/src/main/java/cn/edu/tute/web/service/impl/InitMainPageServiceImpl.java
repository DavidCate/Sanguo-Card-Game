package cn.edu.tute.web.service.impl;

import cn.edu.tute.web.mapper.InitInfoMapper;
import cn.edu.tute.web.service.InitMainPageService;
import com.alibaba.fastjson.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class InitMainPageServiceImpl implements InitMainPageService {
    @Autowired
    InitInfoMapper initInfoMapper;

    public String getInitInfo() {
        return JSON.toJSONString(initInfoMapper.selectAllInfo());
    }
}
