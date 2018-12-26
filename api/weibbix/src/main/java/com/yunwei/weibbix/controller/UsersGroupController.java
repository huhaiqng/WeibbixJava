package com.yunwei.weibbix.controller;

import com.yunwei.weibbix.entity.AjaxResponseBody;
import com.yunwei.weibbix.entity.UsersGroup;
import com.yunwei.weibbix.mapper.UsersGroupMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UsersGroupController {

    @Autowired(required = false)
    private UsersGroupMapper usersGroupMapper;
    @PostMapping("/api/group/add")
    public AjaxResponseBody addGroup(@RequestBody Map<String,Object> mapObject){
        String groupName = (String)mapObject.get("groupName");
        String enabled_string = (String)mapObject.get("enabled");
        boolean enabled = Boolean.parseBoolean(enabled_string);

        AjaxResponseBody ajaxResponseBody = new AjaxResponseBody();
        UsersGroup usersGroup = usersGroupMapper.selectOneGroup(groupName);
        if( usersGroup != null){
            ajaxResponseBody.setStatus("error");
            ajaxResponseBody.setMessage("用户名已经存在！");
            return ajaxResponseBody;
        }

        usersGroupMapper.insertGroup(groupName,enabled);
        return null;
    }
}
