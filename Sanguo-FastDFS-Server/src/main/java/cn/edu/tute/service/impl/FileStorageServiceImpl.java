package cn.edu.tute.service.impl;

import cn.edu.tute.dao.FileStorageMapper;
import cn.edu.tute.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FileStorageServiceImpl implements FileStorageService {

    @Autowired
    FileStorageMapper fileStorageMapper;

    public void fileStorage(String fileName, String url, String createTime, int ownerId) {
        fileStorageMapper.fileInfoStorage(fileName,url,createTime,ownerId);
    }
}
