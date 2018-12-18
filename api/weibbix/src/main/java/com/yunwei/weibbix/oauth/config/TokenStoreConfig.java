package com.yunwei.weibbix.oauth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.InMemoryTokenStore;

@Configuration
public class TokenStoreConfig {

    @Bean
    public TokenStore tokenStore() {
        //使用内存的tokenStore
        return new InMemoryTokenStore();
    }
}
