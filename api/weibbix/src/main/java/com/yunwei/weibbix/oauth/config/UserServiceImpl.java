package com.yunwei.weibbix.oauth.config;

import com.yunwei.weibbix.entity.User;
import com.yunwei.weibbix.mapper.UserMapper;
import com.yunwei.weibbix.oauth.entity.MyUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Primary
@Service("userService")
public class UserServiceImpl implements UserService {

//    private final static Set<User> users = new HashSet<>();
//
//    static {
//        users.add(new User(1, "test-user1", "123451"));
//        users.add(new User(2, "test-user2", "123452"));
//        users.add(new User(3, "test-user3", "123453"));
//        users.add(new User(4, "test-user4", "123454"));
//    }

    @Autowired(required = false)
    private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

//        Optional<User> userWrapper = users.stream()
//                .filter((u) -> u.getUserName().equals(s))
//                .findFirst();
//        if (!userWrapper.isPresent()) {
//            throw new UsernameNotFoundException("there's no user founded!");
//        }else {
//            System.out.println(userWrapper.get());
//            return new MyUserDetails(userWrapper.get());
//        }

        User user = userMapper.selectOneUser(userName);
        if(user == null){
            throw new UsernameNotFoundException("there's no user founded!");
        }else{
            return new MyUserDetails(user);
        }
    }
}
