package cn.edu.tute.web.mapper;

import cn.edu.tute.entities.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
@Mapper
public interface NewUserInfoOpMapper {
    boolean updateName(@Param("username") String username,@Param("newName") String newName);

    boolean addFriend(@Param("head") String head,@Param("username") String username,@Param("friendName") String friendName);

    SearchUserInfo searchUser(String username);

    GameUserInfo selectUserInfo(String username);

    List<Record> getRecord(int id);
}
