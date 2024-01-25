package com.coin.broker.admin.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class BasicInfMng {
    private Integer     idx                     ;
    @NotBlank
    private String      salName                 ;
    @NotBlank
    private String      salSno                  ;
    @NotBlank
    private String      metaTag                 ;
    @NotBlank
    private String      kakaoOpenUrl            ;
    @NotBlank
    private String      phoneNo                 ;
    @NotBlank
    private String      oderName                ;
    @NotBlank
    private String      firstPhoneNo            ;
    @NotBlank
    private String      telegramId              ;
    @NotBlank
    private String      email                   ;
    @NotBlank
    private String      bankAcc1                ;
    private String      bankAcc2                ;
    private String      bankAcc3                ;
    private String      bankAcc4                ;
    private String      adminId                 ;
    private String      regDttm                 ;

    private List<AdminMas> adminList            ;

}
