package com.yunwei.weibbix.controller;

import com.yunwei.weibbix.entity.User;
import com.yunwei.weibbix.entity.UsersGroup;
import com.yunwei.weibbix.entity.UsersGroups;
import com.yunwei.weibbix.mapper.UserMapper;
import com.yunwei.weibbix.oauth.entity.MyUserDetails;
import org.codehaus.jackson.map.util.JSONPObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Map;

@RestController
public class UserController {
    @Autowired
    private TokenStore tokenStore;

    @PostMapping("/api/user")
    public String bar(@RequestHeader("Authorization") String auth) {
        System.out.println(auth);
        MyUserDetails userDetails = (MyUserDetails) tokenStore.readAuthentication(auth.split(" ")[1]).getPrincipal();
//        System.out.println(userDetails);
        User user = userDetails.getUser();
        return user.getUserName() + ":" + user.getPassword();
    }

    @Autowired
    private UserMapper userMapper;

    @PostMapping("/api/user/add")
    public void addUser(@RequestBody Map<String, Object> objectMap){
//        userMapper.insertUser((String)objectMap.get("userName"),(String)objectMap.get("password"),(Boolean)objectMap.get("enabled"));
        String userName = (String)objectMap.get("userName");
        String password = (String)objectMap.get("password");
        Boolean enabled = (Boolean)objectMap.get("enabled");
        BCryptPasswordEncoder encoder =new BCryptPasswordEncoder();
        password = encoder.encode(password.trim());
        System.out.println(userName);
        System.out.println(password);
        System.out.println(enabled);
        userMapper.insertUser(userName,password,enabled);
    }
}
