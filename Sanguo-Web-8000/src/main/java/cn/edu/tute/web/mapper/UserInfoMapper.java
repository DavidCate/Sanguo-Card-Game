package cn.edu.tute.web.mapper;

import cn.edu.tute.entities.UserInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface UserInfoMapper {
    @Select("select u_name,u_password from user where u_name=#{userName}")
    UserInfo getUserInfo(String userName);
}
