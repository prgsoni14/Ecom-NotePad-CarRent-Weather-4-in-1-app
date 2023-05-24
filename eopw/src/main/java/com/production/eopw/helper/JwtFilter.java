package com.production.eopw.helper;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class JwtFilter extends OncePerRequestFilter{


    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

                final String fullString = request.getHeader("Authorization");
                System.out.println(fullString);
                
                String username=null;
                String jwtToken=null;
                if(fullString != null && fullString.startsWith("Bearer "))
                {
                        jwtToken=fullString.substring(7);
                        try {
                            username=jwtUtil.extractUsername(jwtToken);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }     
                }
                else
                {
                    System.out.println("Invalid Token");
                }

                if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null)
                {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    if(jwtUtil.validateToken(jwtToken, userDetails ))
                    {

                        UsernamePasswordAuthenticationToken usernamePasswordAuthentication = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                        
                        usernamePasswordAuthentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthentication);
                    }   
                }

                filterChain.doFilter(request, response);
            
    }
    
}
