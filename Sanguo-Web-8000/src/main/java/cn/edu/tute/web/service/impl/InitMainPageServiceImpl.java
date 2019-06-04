package cn.edu.tute.web.service.impl;

import cn.edu.tute.entities.InitInfo;
import cn.edu.tute.entities.Msg;
import cn.edu.tute.entities.PlayImg;
import cn.edu.tute.web.mapper.InitInfoMapper;
import cn.edu.tute.web.redis.RedisService;
import cn.edu.tute.web.service.InitMainPageService;
import com.alibaba.fastjson.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Component
public class InitMainPageServiceImpl implements InitMainPageService {
    private static final Logger logger= LoggerFactory.getLogger(InitMainPageServiceImpl.class);

    @Autowired
    InitInfoMapper initInfoMapper;

    @Autowired
    RedisService redisService;

    public String getInitInfo(String userId) {
        InitInfo initInfo=initInfoMapper.selectInitInfo(userId);
//        logger.info(JSON.toJSONString(initInfo));
        return JSON.toJSONString(initInfo);
    }

    public String getCardInfo() {
        return "";
    }
}
