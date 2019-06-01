package cn.edu.tute.web.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface FriendInfoMapper {
    int deleteFriend(@Param("userName") String userName, @Param("friendName") String friendName);
}
