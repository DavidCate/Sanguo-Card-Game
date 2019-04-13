package cn.edu.tute.server.init.impl;

import cn.edu.tute.entities.Card;
import cn.edu.tute.entities.CardsInfo;
import cn.edu.tute.server.dao.InitMapper;
import cn.edu.tute.server.init.InitService;
import cn.edu.tute.server.redis.RedisService;
import com.alibaba.fastjson.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class InitServiceImpl implements InitService {
    @Autowired
    RedisService redisService;

    @Autowired
    InitMapper initMapper;

    public void init() {
       initCardsInfo();
    }

    public void initCardsInfo(){
        List<Card> cards=initMapper.getCardsInfo();
        for (int i=0;i<cards.size();i++){
            Card card=cards.get(i);
            String redisKey="cardName:"+card.getName();
            redisService.set(redisKey, JSON.toJSONString(card));
        }
    }
}
