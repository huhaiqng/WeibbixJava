package com.yunwei.weibbix.controller;

import com.yunwei.weibbix.entity.Software;
import com.yunwei.weibbix.mapper.SoftwareMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SoftwareController {

    @Autowired(required = false)
    SoftwareMapper softwareMapper;
    //获取软件名
    @GetMapping("/api/getSoftwareName")
    public List<String> getSoftwareName(){
        return softwareMapper.getSoftwareNameSQL();
    }
}
