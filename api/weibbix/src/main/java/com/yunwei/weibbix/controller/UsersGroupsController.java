package com.yunwei.weibbix.controller;

import com.yunwei.weibbix.mapper.UserMapper;
import com.yunwei.weibbix.mapper.UsersGroupMapper;
import com.yunwei.weibbix.mapper.UsersGroupsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;
import java.util.List;
import java.util.Map;

@RestController
public class UsersGroupsController {

    @Autowired(required = false)
    private UsersGroupsMapper usersGroupsMapper;

    @Autowired(required = false)
    private UserMapper userMapper;

    @Autowired(required = false)
    private UsersGroupMapper usersGroupMapper;

    @PostMapping("/api/add/userGroups")
    public void addUsersGroups(@RequestBody Map<String,Object> objectMap){
        String userName = (String)objectMap.get("userName");
        String groupName = (String)objectMap.get("groupName");
        BigInteger userId = userMapper.selectOneUser(userName).getUserId();
        BigInteger groupId = usersGroupMapper.selectOneGroup(groupName).getGroupId();
        usersGroupsMapper.insertUserGroupsSQL(userId,groupId);
    }

    @PostMapping("/api/delete/userGroup")
    public void deleteUserGroup(@RequestBody Map<String,Object> objectMap){
        String userName = (String)objectMap.get("userName");
        String groupName = (String)objectMap.get("groupName");
        BigInteger userId = userMapper.selectOneUser(userName).getUserId();
        BigInteger groupId = usersGroupMapper.selectOneGroup(groupName).getGroupId();
        usersGroupsMapper.deleteUserGroupSQL(userId,groupId);
    }
}
