package cn.edu.tute.server.mapper;

import cn.edu.tute.entities.GameUserInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface GameMapper {
    int insertRecord(@Param("time") String time,@Param("player") String player,@Param("result") String result,@Param("userid") int userid);
    GameUserInfo selectUserInfo(String username);
}
