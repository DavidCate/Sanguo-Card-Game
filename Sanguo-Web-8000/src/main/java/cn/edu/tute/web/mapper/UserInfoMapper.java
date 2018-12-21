package cn.edu.tute.web.mapper;

import cn.edu.tute.entities.UserInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface UserInfoMapper {
    @Select("select * from userInfo where username=#{username}")
    UserInfo getUserInfo(String username);
}
