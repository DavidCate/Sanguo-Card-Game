package cn.edu.tute.service;

import org.springframework.stereotype.Service;

@Service
public interface FileStorageService {
    void fileStorage(String fileName,String url,String createTime,int ownerId);
}
