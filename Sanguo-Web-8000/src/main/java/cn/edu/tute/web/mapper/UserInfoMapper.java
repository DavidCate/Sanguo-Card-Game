package cn.edu.tute.web.mapper;

import cn.edu.tute.entities.RegisterUserInfo;
import cn.edu.tute.entities.UserInfo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface UserInfoMapper {
    @Select("select u_name,u_password from user where u_name=#{userName}")
    UserInfo getUserInfo(String userName);

    @Select("select u_nid from user where u_nid=#{userCount}")
    RegisterUserInfo getRegisterUserInfo(String userCount);

    @Insert("insert into user(u_name,u_sex,u_nid,u_password,u_phone) values(#{userName},#{sex},#{userCount},#{password},#{telNum})")
    void registUserInfo(RegisterUserInfo registerUserInfo);
}
