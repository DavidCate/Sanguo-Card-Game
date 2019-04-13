package cn.edu.tute.server.dao;

import cn.edu.tute.entities.Card;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface InitMapper {
    List<Card> getCardsInfo();
}
