package cn.edu.tute.web.mapper;

import cn.edu.tute.entities.*;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface UserInfoMapper {

    @Results({@Result(property = "username" ,column = "username"),@Result(property = "password",column = "password")})
    @Select("select username,password from user where username=#{userName}")
    UserLoginInfo getUserLoginInfo(String userName);

    @Results({@Result(property = "user",column = "u_nid")})
    @Select("select username from user where username=#{userCount}")
    RegisterUserInfo getRegisterUserInfo(String userCount);

    @Insert("insert into user(username,name,password,phone,sex) values(#{username},#{name},#{password},#{phone},#{sex})")
    void registUserInfo(RegisterUserInfo registerUserInfo);


}
