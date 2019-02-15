package cn.edu.tute.web.mapper;

import cn.edu.tute.entities.UserInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface UserInfoMapper {
    @Select("select username,password from userInfo where username=#{userName}")
    UserInfo getUserInfo(String userName);
}
