package cn.edu.tute.server.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface GameMapper {
    String insertRecord();
}
