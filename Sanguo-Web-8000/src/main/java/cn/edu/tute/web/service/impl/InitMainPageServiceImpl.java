package cn.edu.tute.web.service.impl;

import cn.edu.tute.entities.InitInfo;
import cn.edu.tute.entities.Msg;
import cn.edu.tute.entities.PlayImg;
import cn.edu.tute.web.mapper.InitInfoMapper;
import cn.edu.tute.web.service.InitMainPageService;
import com.alibaba.fastjson.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class InitMainPageServiceImpl implements InitMainPageService {
    private static final Logger logger= LoggerFactory.getLogger(InitMainPageServiceImpl.class);

    @Autowired
    InitInfoMapper initInfoMapper;

    public String getInitInfo(String userId) {
        InitInfo initInfo=initInfoMapper.selectInitInfo(userId);
        List<Msg> msgList=initInfoMapper.selectAllMsg();
        List<PlayImg> imgList=initInfoMapper.selectAllPlayImg();
        System.out.println("sout+++++++++"+imgList.toString());
        initInfo.setMsgs(msgList);
        initInfo.setPlayImgs(imgList);
//        logger.warn("jsonMsg=====>"+JSON.toJSONString(initInfoMapper.selectInitInfo(userId)));
        return JSON.toJSONString(initInfo);
    }
}
