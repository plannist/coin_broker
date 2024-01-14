package com.coin.broker.front.model;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@Data
public class AdminMas implements UserDetails {

    private String id;
    private String password;

    private String name;
    private String auth;

    public enum UserRole{
        PRE_FIX("ROLE_"),
        CUSTOMER("고객"),
        SUPER("관리자");

        private String code;

        UserRole(String code){
            this.code = code;
        }

        public String getCode(){
            return this.code;
        }
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        ArrayList<GrantedAuthority> authorizes = new ArrayList<>();
        authorizes.add(new SimpleGrantedAuthority(AdminMas.UserRole.PRE_FIX.getCode() + auth));
        return authorizes;
    }

    @Override
    public String getUsername() {
        return this.name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
