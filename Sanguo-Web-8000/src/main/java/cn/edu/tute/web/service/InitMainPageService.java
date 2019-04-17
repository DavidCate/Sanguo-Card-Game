package cn.edu.tute.web.service;

import org.springframework.stereotype.Service;

@Service
public interface InitMainPageService {
    String getInitInfo(String userId);
    String getCardInfo();
}
