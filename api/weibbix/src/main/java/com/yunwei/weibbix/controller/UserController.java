package com.yunwei.weibbix.controller;

import com.yunwei.weibbix.oauth.entity.MyUserDetails;
import com.yunwei.weibbix.oauth.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    private TokenStore tokenStore;

    @GetMapping("/api/user")
    public String bar(@RequestHeader("Authorization") String auth) {
//        System.out.println(auth);
        MyUserDetails userDetails = (MyUserDetails) tokenStore.readAuthentication(auth.split(" ")[1]).getPrincipal();
//        System.out.println(userDetails);
        User user = userDetails.getUser();
        return user.getUserName() + ":" + user.getPassword();
    }
}
