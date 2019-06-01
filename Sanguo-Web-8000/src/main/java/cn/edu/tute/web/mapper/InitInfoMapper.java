package cn.edu.tute.web.mapper;

import cn.edu.tute.entities.InitInfo;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;



@Repository
@Mapper
public interface InitInfoMapper {
    InitInfo selectInitInfo(String userName);
//    List<Msg> selectAllMsg();
//    List<PlayImg> selectAllPlayImg();
}
