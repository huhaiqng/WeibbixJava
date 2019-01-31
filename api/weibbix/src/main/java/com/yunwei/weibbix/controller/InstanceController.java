package com.yunwei.weibbix.controller;

import com.yunwei.weibbix.mapper.InstanceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class InstanceController {
    @Autowired(required = false)
    private InstanceMapper instanceMapper;

    @PostMapping("/api/getHostForCreateInstance")
    public List<Map> getHostForCreateInstance(@RequestBody Map<String,Object> objectMap){
        String hostGroup = (String)objectMap.get("hostGroup");
        String envType = (String)objectMap.get("envType");
        return instanceMapper.getHostForCreateInstanceSQL(hostGroup,envType);
    }
}
