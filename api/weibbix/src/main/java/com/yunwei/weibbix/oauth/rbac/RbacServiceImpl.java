package com.yunwei.weibbix.oauth.rbac;

import com.yunwei.weibbix.oauth.entity.MyUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;

import javax.servlet.http.HttpServletRequest;
import java.util.HashSet;
import java.util.Set;

@Component("rbacService")
public class RbacServiceImpl implements RbacService {

    AntPathMatcher antPathMatcher = new AntPathMatcher();

    @Override
    public Boolean hasPermission(HttpServletRequest request, Authentication authentication) {
        boolean hasPermission = false;
        Object principal = authentication.getPrincipal();
        if (principal instanceof MyUserDetails){
            String username = ((MyUserDetails)principal).getUsername();
//            System.out.println("获取用户 "+username + " 的权限！");
            Set<String> urls = new HashSet<>();
            //读取权限rul
            urls.add("/api/bar");
            urls.add("/api/user");
            for(String url : urls){
                if(antPathMatcher.match(url,request.getRequestURI())){
                    hasPermission = true;
                    break;
                }
            }
        }
        return hasPermission;
    }
}
