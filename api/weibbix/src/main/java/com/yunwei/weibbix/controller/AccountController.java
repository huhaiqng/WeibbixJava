package com.yunwei.weibbix.controller;

import com.yunwei.weibbix.entity.Account;
import com.yunwei.weibbix.entity.PagesListResponse;
import com.yunwei.weibbix.mapper.AccountMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class AccountController {
    @Autowired(required = false)
    private AccountMapper accountMapper;

    //获取账号类型
    @GetMapping("/api/getAccountType")
    public List<String> getAccountType(){
        return accountMapper.getAccountTypeSQL();
    }

    //保存账号
    @PostMapping("/api/saveAccount")
    public void saveAccount(@RequestBody Account account){
        accountMapper.saveAccountSQL(account);
    }

    //获取账号
    @PostMapping("/api/getOnePageAccount")
    public PagesListResponse getOnePageAccount(@RequestBody Map<String,Object> objectMap){
        PagesListResponse pagesListResponse = new PagesListResponse();
        String user = (String)objectMap.get("user");
        String type= (String)objectMap.get("type");
        Integer currentPage = (Integer)objectMap.get("currentPage");
        Integer count = Integer.parseInt((String)objectMap.get("count"));
        Integer beforeNum = (currentPage-1)*count;

        if(user.equals("")){
            pagesListResponse.setPageList(accountMapper.selectAccountByTypeSQL(beforeNum,count,type));
            pagesListResponse.setPages((int)Math.ceil((float)accountMapper.selectAccountCountByTypeSQL(type)/count));
        }else{
            pagesListResponse.setPageList(accountMapper.selectAccountByTypeUserSQL("%"+user+"%",beforeNum,count,type));
            pagesListResponse.setPages((int)Math.ceil((float)accountMapper.selectAccountByTypeUserCountSQL("%"+user+"%",type)/count));
        }
        return pagesListResponse;
    }

    //删除账号
    @PostMapping("/api/deleteAccount")
    public void deleteAccount(@RequestBody Map<String,Object> objectMap){
        String id = (String)objectMap.get("id");
        accountMapper.deleteAccountSQL(id);
    }
}
