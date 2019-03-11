package cn.edu.tute.web.mapper;

import cn.edu.tute.entities.InitInfo;
import cn.edu.tute.entities.Msg;
import cn.edu.tute.entities.PlayImg;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
@Mapper
public interface InitInfoMapper {
    InitInfo selectInitInfo(String userId);
    List<Msg> selectAllMsg();
    List<PlayImg> selectAllPlayImg();
}
