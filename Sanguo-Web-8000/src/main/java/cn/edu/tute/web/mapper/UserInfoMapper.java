package cn.edu.tute.web.mapper;

import cn.edu.tute.entities.RegisterUserInfo;
import cn.edu.tute.entities.UserLoginInfo;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface UserInfoMapper {

    @Results({@Result(property = "username" ,column = "u_nid"),@Result(property = "password",column = "u_password")})
    @Select("select u_nid,u_password from user where u_nid=#{userName}")
    UserLoginInfo getUserLoginInfo(String userName);

    @Results({@Result(property = "user",column = "u_nid")})
    @Select("select u_nid from user where u_nid=#{userCount}")
    RegisterUserInfo getRegisterUserInfo(String userCount);

    @Insert("insert into user(u_name,u_sex,u_nid,u_password,u_phone) values(#{userName},#{sex},#{userCount},#{password},#{telNum})")
    void registUserInfo(RegisterUserInfo registerUserInfo);
}
