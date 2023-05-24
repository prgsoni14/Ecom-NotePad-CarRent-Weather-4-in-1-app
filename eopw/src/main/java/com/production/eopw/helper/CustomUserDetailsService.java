package com.production.eopw.helper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.production.eopw.models.User;
import com.production.eopw.repos.UserRepo;

@Service
public class CustomUserDetailsService implements UserDetailsService  {

    @Autowired
    UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       
          User user =  userRepo.findByUsername(username);
          
          if(user == null)
          {
              throw new UsernameNotFoundException("User doesn't exis");
          }


          return new CustomUserDetails(user);
    }
    
}
