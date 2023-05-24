package com.production.eopw.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.production.eopw.models.Credential;
import com.production.eopw.models.User;
import com.production.eopw.repos.CredentialRepo;
import com.production.eopw.repos.UserRepo;
import com.production.eopw.services.CredentialService;

@Service 
public class CredentialServiceImpl implements CredentialService {

    @Autowired
    CredentialRepo credentialRepo;

    @Autowired
    UserRepo userRepo;

    //orElseThrow

    public List<Credential> getCredentials(String username) {
        User cur_user=userRepo.findByUsername(username);
        if(cur_user==null)
        return null;
        
        return credentialRepo.findByUser(cur_user);
    }

    @Override
    public Credential createCredential(Credential credential, String username) {
        User cur_user=userRepo.findByUsername(username);
        if(cur_user==null)
        return null;
        
        credential.setUser(cur_user);
        return credentialRepo.save(credential);
    }

    @Override
    public Credential deleteCredential(Long id, String username) {
        Credential response = new Credential();
        try {
            Credential credential=credentialRepo.findById(id).orElse(null);
            if(credential==null)
            {
                response.setTitle("Invalid Id");
            }
            else if(username.equals(credential.getUser().getUsername()))
            {        
                credentialRepo.deleteById(id);
                response.setTitle("Successfully deleted");
            }
            else
            {
                response.setTitle("You are not authorized");
            }
            return response;
        } catch (Exception e) {
            return null;
        }
    }

    
}
