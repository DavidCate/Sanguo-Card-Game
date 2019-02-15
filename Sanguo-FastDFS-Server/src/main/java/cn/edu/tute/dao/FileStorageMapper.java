package cn.edu.tute.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
public interface FileStorageMapper {
    @Insert("insert into file_info(fileName,url,createTime,ownerId) values(#{fileName},#{url},#{createTime},#{ownerId})")
    void fileInfoStorage(String fileName,String url,String createTime,int ownerId);
}
