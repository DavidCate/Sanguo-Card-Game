package cn.edu.tute.server.dao;

import cn.edu.tute.entities.CardsInfo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface InitMapper {
    CardsInfo getCardsInfo();
}
