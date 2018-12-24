//package com.yunwei.weibbix.service;
//
//import com.yunwei.weibbix.entity.AjaxResponseBody;
//import com.yunwei.weibbix.entity.User;
//import com.yunwei.weibbix.mapper.UserMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//
//
//public class UserService {
//
//    AjaxResponseBody ajaxResponseBody;
//
//    @Autowired
//    private UserMapper userMapper;
//
//    public void getUser(String userName){
//        User user=userMapper.selectOneUser(userName);
//    }
//
//    public void setAjaxResponseBody(AjaxResponseBody ajaxResponseBody) {
//        ajaxResponseBody.setStatus("error");
//        this.ajaxResponseBody = ajaxResponseBody;
//    }
//
//    //    public AjaxResponseBody getAjaxResponseBody(String userName) {
////        user = userMapper.selectOneUser(userName);
////        if( user != null){
////            ajaxResponseBody.setStatus("error");
////            ajaxResponseBody.setMessage("用户名已经存在!");
////        }
////        return ajaxResponseBody;
////    }
//}
