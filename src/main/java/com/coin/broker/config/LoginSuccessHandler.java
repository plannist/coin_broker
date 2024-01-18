package com.coin.broker.config;


import com.coin.broker.util.Utils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;


import java.io.IOException;

@Component
@Slf4j
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    /*filterChain 파라미터에 있으면 로그인 성공시 해당 메서드 사용 않는다.*/
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException, ServletException {
        HttpSession httpSession = request.getSession();
        int timeout = httpSession.getMaxInactiveInterval();
        log.info("session timeout: >>>> {}", timeout);


        String redirectUrl = "/admin/main";
        if(httpSession != null){
            String linkUrl = (String) httpSession.getAttribute("linkUrl");
            log.info("세션있을때 link Url: {}",linkUrl == null ? "널값으로 판단합니다." : linkUrl);
            if(Utils.isNotEmpty(linkUrl)){
                redirectUrl = linkUrl;
                httpSession.removeAttribute("linkUrl");
            }
        }
        log.info("로그인 성공시 redirect Url : {}", redirectUrl);
        super.setDefaultTargetUrl(redirectUrl);
        super.onAuthenticationSuccess(request, response, authentication);
    }
}
