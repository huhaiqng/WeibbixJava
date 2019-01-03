package com.yunwei.weibbix.controller;

import com.yunwei.weibbix.entity.*;
import com.yunwei.weibbix.mapper.UsersGroupMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.math.BigInteger;
import java.util.List;
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
            ajaxResponseBody.setMessage("组名已经存在！");
            return ajaxResponseBody;
        }

        usersGroupMapper.insertGroup(groupName,enabled);
        return null;
    }

    @PostMapping("/api/get/groups")
    public GroupsResponseBody selectGroups(@RequestBody Map<String,Object> objectMap){

        Integer currentPage = (Integer)objectMap.get("currentPage");
        Integer groupsCount = Integer.parseInt((String)objectMap.get("groupsCount"));
        String groupName = (String)objectMap.get("search_groupname");
        Integer beforeNum = (currentPage-1)*groupsCount;

        GroupsResponseBody groupsResponseBody = new GroupsResponseBody();
        float pages = 0;
        if(groupName == ""){
            groupsResponseBody.setGroups(usersGroupMapper.selectGroupsSQL(beforeNum,groupsCount));
            pages = (float)usersGroupMapper.selectGroupsCountSQL()/groupsCount;
        }else{
            groupsResponseBody.setGroups(usersGroupMapper.selectSearchGroupsSQL(beforeNum,groupsCount,"%"+groupName+"%"));
            pages = (float)usersGroupMapper.selectSearchGroupsCountSQL("%"+groupName+"%")/groupsCount;
        }
        groupsResponseBody.setPages((int)Math.ceil(pages));
        return groupsResponseBody;
//        ajaxResponseBody.setResult(usersGroupMapper.selectGroupsSQL());
//        return ajaxResponseBody;
    }

    @PostMapping("/api/delete/group")
    public void deleteGroup(@Valid @RequestBody UsersGroup usersGroup){
        usersGroupMapper.deleteGroupSQL(usersGroup.getGroupId());
    }

    @PostMapping("/api/change/group/status")
    public void changeGroupStatus(@Valid @RequestBody UsersGroup usersGroup){
        usersGroupMapper.changeGroupStatusSQL(usersGroup.isEnabled(),usersGroup.getGroupId());
    }

    @PostMapping("/api/update/group")
    public AjaxResponseBody updateGroup(@Valid @RequestBody UsersGroup usersGroup){
        AjaxResponseBody ajaxResponseBody = new AjaxResponseBody();
        UsersGroup usersGroup1 = usersGroupMapper.selectOneGroup(usersGroup.getGroupName());
        if( usersGroup1 != null){
            ajaxResponseBody.setStatus("error");
            ajaxResponseBody.setMessage("组名已经存在！");
            return ajaxResponseBody;
        }
        usersGroupMapper.updateGroupSQL(usersGroup);
        return null;
    }

    @GetMapping("/api/get/enabledGroups")
    public List<UsersGroup> selectEnabledGroups(){
        return usersGroupMapper.selectEnabledGroupsSQL();
    }

    @PostMapping("/api/get/userGroups")
    public List<String> getUserGroups(@Valid @RequestBody UsersGroups usersGroups){
        return usersGroupMapper.selectUserGroupsSQL(usersGroups.getUserId());
    }
}
