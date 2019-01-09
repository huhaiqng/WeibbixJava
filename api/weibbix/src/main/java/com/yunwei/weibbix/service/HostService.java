package com.yunwei.weibbix.service;

import com.yunwei.weibbix.entity.Host;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface HostService {
    public void importHost(String filename, MultipartFile file) throws Exception;
}
