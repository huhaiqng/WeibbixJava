package com.yunwei.weibbix.controller;

import com.yunwei.weibbix.entity.Host;
import com.yunwei.weibbix.entity.PagesListResponse;
import com.yunwei.weibbix.mapper.HostMapper;
import com.yunwei.weibbix.service.HostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class HostController {

    @Autowired(required = false)
    private HostService hostService;
    @Autowired(required = false)
    private HostMapper hostMapper;

    @PostMapping("/api/import/host")
    public void importHost(@RequestParam("file") MultipartFile file) throws Exception{
        String fileName = file.getOriginalFilename();

        hostService.importHost(fileName,file);
    }

    @PostMapping("/api/get/hosts")
    public PagesListResponse getHosts(@RequestBody Map<String,Object> objectMap){
        String envType = (String)objectMap.get("envType");
        String hostGroup = (String)objectMap.get("hostGroup");
        String ip = (String)objectMap.get("ip");
        Integer currentPage = (Integer)objectMap.get("currentPage");
        Integer hostsCount = Integer.parseInt((String)objectMap.get("hostsCount"));
        Integer beforeNum = (currentPage-1)*hostsCount;

        PagesListResponse pagesListResponse = new PagesListResponse();

        System.out.println(envType+":"+hostGroup);
        if(envType.equals("all") && hostGroup.equals("all") && ip.equals("")){
            System.out.println("1");
            pagesListResponse.setHostList(hostMapper.selectALLHostsSQL(beforeNum,hostsCount));
            pagesListResponse.setPages(hostMapper.selectALLHostsCountSQL(beforeNum,hostsCount));
        }
        if(envType.equals("all") && hostGroup.equals("all") && !ip.equals("")){
            System.out.println("2");
            pagesListResponse.setHostList(hostMapper.selectHostsByIpSQL(ip,beforeNum,hostsCount));
        }
        if(envType.equals("all") && !hostGroup.equals("all") && ip.equals("")){
            System.out.println("3");
            pagesListResponse.setHostList(hostMapper.selectHostsByGroupSQL(hostGroup,beforeNum,hostsCount));
        }
        if(envType.equals("all") && !hostGroup.equals("all") && !ip.equals("")){
            System.out.println("4");
            pagesListResponse.setHostList(hostMapper.selectHostsByGroupIpSQL(hostGroup,ip,beforeNum,hostsCount));
        }
        if(!envType.equals("all") && hostGroup.equals("all") && ip.equals("")){
            System.out.println("5");
            pagesListResponse.setHostList(hostMapper.selectHostsByEnvSQL(envType,beforeNum,hostsCount));
        }
        if(!envType.equals("all") && hostGroup.equals("all") && !ip.equals("")){
            System.out.println("6");
            pagesListResponse.setHostList(hostMapper.selectHostsByEnvIpSQL(envType,ip,beforeNum,hostsCount));
        }
        if(!envType.equals("all") && !hostGroup.equals("all") && ip.equals("")){
            System.out.println("7");
            pagesListResponse.setHostList(hostMapper.selectHostsByEnvGroupSQL(envType,hostGroup,beforeNum,hostsCount));
        }
        if(!envType.equals("all") && !hostGroup.equals("all") && !ip.equals("")){
            System.out.println("8");
            pagesListResponse.setHostList(hostMapper.selectHostsByEnvGroupIpSQL(envType,hostGroup,ip,beforeNum,hostsCount));
        }
        return pagesListResponse;
    }
}
