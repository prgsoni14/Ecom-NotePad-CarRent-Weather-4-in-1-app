package com.production.eopw.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.production.eopw.customExceptions.EmailFoundException;
import com.production.eopw.customExceptions.UsernameFoundException;
import com.production.eopw.models.User;
import com.production.eopw.repos.UserRepo;
import com.production.eopw.services.UserService;

@Service 
public class UserServiceImpl implements UserService {
 
    @Autowired
    UserRepo userRepo;

    @Override
    public User createUser(User user) {
     
        String email=user.getEmail();
        String username=user.getUsername();

        if(userRepo.findByUsername(username)!= null)
        {
            try{
                throw new UsernameFoundException ("Username already exists");
            }
            catch(UsernameFoundException e){
                    System.out.println("Username already Exists");
            }
            User null_user=new User();
            null_user.setName("UsernameAlreadyExist");
            return null_user;
        }

        else if(userRepo.findByEmail(email) != null)
        {
            try{
                throw new EmailFoundException("Email already exists");
            }
            catch(EmailFoundException e){
                    System.out.println("Email already Exists");
            }
            User null_user=new User();
            null_user.setName("EmailAlreadyExist");
            return null_user;
        }
        else {
            User new_user=userRepo.save(user);
            return new_user;
        }
      
    }

    @Override
    public User deleteUser(Long id, String username) {
        User c = userRepo.findById(id).orElse(null);
        if(c==null)
        {
            try {
                throw new Exception("invalid Id");
            } catch (Exception e) {
                System.out.println("User does not exist");
            }
            User Fakeuser = new User();
            Fakeuser.setName("Doesn't Exist");
            return Fakeuser;
        }

        else{
            if(c.getUsername().equals(username))
            {
                userRepo.deleteById(id);
                User Fakeuser = new User();
                Fakeuser.setName("Successfully Deleted");
                return Fakeuser;
            }
            else
                return null;
        }
    }

    @Override
    public User getUser(String username) {
        return userRepo.findByUsername(username);
    }

    @Override
    public List<User> getUsers() {
        return userRepo.findAll();
    }

    @Override
    public User updateUser(User user, String username) {
        //to make sure he doesn't interefere with ID
        User owner = userRepo.findByUsername(username);
        if(owner.getId()!=user.getId())
        {
            return null;
        }
        else
        {
            //Role change is not allowed
            if(owner.getRole().equals(user.getRole()))
            {
                return userRepo.save(user);
            }
            else{
                return null;
            }
        }
        
    }
    
}
 