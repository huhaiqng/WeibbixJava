package com.yunwei.weibbix.controller;

import com.yunwei.weibbix.entity.*;
import com.yunwei.weibbix.mapper.UserMapper;
import com.yunwei.weibbix.oauth.entity.MyUserDetails;
import org.codehaus.jackson.map.util.JSONPObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.math.BigInteger;
import java.util.List;
import java.util.Map;

@RestController
public class UserController {
    @Autowired
    private TokenStore tokenStore;

    @PostMapping("/api/user")
    public String bar(@RequestHeader("Authorization") String auth) {
        System.out.println(auth);
        MyUserDetails userDetails = (MyUserDetails) tokenStore.readAuthentication(auth.split(" ")[1]).getPrincipal();
        User user = userDetails.getUser();
        return user.getUserName() + ":" + user.getPassword();
    }

    @Autowired(required = false)
    private UserMapper userMapper;

    @PostMapping("/api/user/add")
    public AjaxResponseBody addUser(@RequestBody Map<String, Object> objectMap){
        String userName = (String)objectMap.get("userName");
        String password = (String)objectMap.get("password");
        String enabled_string = (String)objectMap.get("enabled");
        boolean enabled = Boolean.parseBoolean(enabled_string);

        User user = userMapper.selectOneUser(userName);

        AjaxResponseBody ajaxResponseBody = new AjaxResponseBody();
        if( user != null){
            ajaxResponseBody.setStatus("error");
            ajaxResponseBody.setMessage("用户名已经存在！");
            return ajaxResponseBody;
        }

        BCryptPasswordEncoder encoder =new BCryptPasswordEncoder();
        password = encoder.encode(password.trim());
        userMapper.insertUser(userName,password,enabled);

        return null;
    }

    @PostMapping("/api/get/users")
    public UsersResponseBody getUsers(@RequestBody Map<String,Object> objectMap){
        Integer currentPage = (Integer) objectMap.get("currentPage");
        Integer usersCount = Integer.parseInt((String)objectMap.get("usersCount"));
        Integer beforeNum = (currentPage-1)*usersCount;
        String userNameLike = (String)objectMap.get("search_username");

        UsersResponseBody usersResponseBody = new UsersResponseBody();
        float pages=0;
        if(userNameLike == ""){
            usersResponseBody.setUsers(userMapper.selectUsersSQL(beforeNum,usersCount));
            pages = (float)userMapper.selectUsersCountSQL()/usersCount;
        }else{
            usersResponseBody.setUsers(userMapper.selectSearchUsersSQL(beforeNum,usersCount,"%"+userNameLike+"%"));
            pages = (float)userMapper.selectSearchUsersCountSQL("%"+userNameLike+"%")/usersCount;
        }
        usersResponseBody.setPages((int)Math.ceil(pages));
        return usersResponseBody;
    }

    @PostMapping("/api/delete/user")
    public void deleteUser(@Valid @RequestBody User user){
        userMapper.deleteUserSQL(user);
    }

    @PostMapping("/api/change/user/status")
    public void changeUserStatus(@Valid @RequestBody User user){
        userMapper.changeUserStatusSQL(user);
    }

    @PostMapping("/api/get/groupUsers")
    public List<String> getGroupUsers(@Valid @RequestBody String groupId){
       return userMapper.selectGroupUsersSQL(Integer.parseInt(groupId));
    }

    @PostMapping("/api/update/user")
    public void updateUser(@Valid @RequestBody User user){
        userMapper.updateUserSQL(user);
    }

    @PostMapping("/api/update/userPassword")
    public void updateUserPassword(@Valid @RequestBody User user){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(user.getPassword()).trim());
        userMapper.updateUserPasswordSQL(user);
    }
}
