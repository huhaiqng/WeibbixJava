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

        if(envType.equals("all") && hostGroup.equals("all") && ip.equals("")){
            pagesListResponse.setPageList(hostMapper.selectALLHostsSQL(beforeNum,hostsCount));
            pagesListResponse.setPages((int)Math.ceil((float)hostMapper.selectALLHostsCountSQL()/hostsCount));
        }
        if(envType.equals("all") && hostGroup.equals("all") && !ip.equals("")){
            pagesListResponse.setPageList(hostMapper.selectHostsByIpSQL(ip,beforeNum,hostsCount));
            pagesListResponse.setPages((int)Math.ceil((float)hostMapper.selectHostsByIpCountSQL(ip)/hostsCount));
        }
        if(envType.equals("all") && !hostGroup.equals("all") && ip.equals("")){
            pagesListResponse.setPageList(hostMapper.selectHostsByGroupSQL(hostGroup,beforeNum,hostsCount));
            pagesListResponse.setPages((int)Math.ceil((float)hostMapper.selectHostsByGroupCountSQL(hostGroup)/hostsCount));
        }
        if(envType.equals("all") && !hostGroup.equals("all") && !ip.equals("")){
            pagesListResponse.setPageList(hostMapper.selectHostsByGroupIpSQL(hostGroup,ip,beforeNum,hostsCount));
            pagesListResponse.setPages((int)Math.ceil((float)hostMapper.selectHostsByGroupIpCountSQL(hostGroup,ip)/hostsCount));
        }
        if(!envType.equals("all") && hostGroup.equals("all") && ip.equals("")){
            pagesListResponse.setPageList(hostMapper.selectHostsByEnvSQL(envType,beforeNum,hostsCount));
            pagesListResponse.setPages((int)Math.ceil((float)hostMapper.selectHostsByEnvCountSQL(envType)/hostsCount));
        }
        if(!envType.equals("all") && hostGroup.equals("all") && !ip.equals("")){
            pagesListResponse.setPageList(hostMapper.selectHostsByEnvIpSQL(envType,ip,beforeNum,hostsCount));
            pagesListResponse.setPages((int)Math.ceil((float)hostMapper.selectHostsByEnvIpCountSQL(envType,ip)/hostsCount));
        }
        if(!envType.equals("all") && !hostGroup.equals("all") && ip.equals("")){
            pagesListResponse.setPageList(hostMapper.selectHostsByEnvGroupSQL(envType,hostGroup,beforeNum,hostsCount));
            pagesListResponse.setPages((int)Math.ceil((float)hostMapper.selectHostsByEnvGroupCountSQL(envType,hostGroup)/hostsCount));
        }
        if(!envType.equals("all") && !hostGroup.equals("all") && !ip.equals("")){
            pagesListResponse.setPageList(hostMapper.selectHostsByEnvGroupIpSQL(envType,hostGroup,ip,beforeNum,hostsCount));
            pagesListResponse.setPages((int)Math.ceil((float)hostMapper.selectHostsByEnvGroupIpCountSQL(envType,hostGroup,ip)/hostsCount));
        }
        return pagesListResponse;
    }

    @PostMapping("/api/delete/host")
    public void deleteHost(@RequestBody Map<String,Object> objectMap){
        String hostId = (String)objectMap.get("hostId");
        hostMapper.deleteHostSQL(hostId);
    }

    @PostMapping("/api/change/host/status")
    public void changeHostStatus(@RequestBody Map<String,Object> objectMap){
        String hostId = (String)objectMap.get("hostId");
        Boolean enabled = (Boolean)objectMap.get("enabled");
        hostMapper.updateHostStatusSQL(hostId,enabled);
    }

    @PostMapping("/api/get/groupNotAllocatedHosts")
    public List<Map> getGroupNotAllocatedHosts(@RequestBody Map<String,Object> objectMap){
        String hostGroup = (String)objectMap.get("hostGroup");
        String envType = (String)objectMap.get("envType");
        return hostMapper.selectGroupNotAllocatedHostsSQL(hostGroup,envType);
    }

//    通过实例ID获取主机
    @PostMapping("/api/getHostByIp")
    public Host getHostByIp(@RequestBody Map<String,Object> objectMap){
        String ip = (String)objectMap.get("ip");
        return hostMapper.getHostByIpSQL(ip);
    }
}
