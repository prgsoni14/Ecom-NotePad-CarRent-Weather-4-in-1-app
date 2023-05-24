package com.production.eopw.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.production.eopw.models.Credential;
import com.production.eopw.services.impl.CredentialServiceImpl;

@RestController
@RequestMapping("/credential")
@CrossOrigin("*")
public class CredentialController {
    @Autowired
    CredentialServiceImpl credentialService;

    @PostMapping("/create/{username}")
    @PreAuthorize("#username == authentication.principal.username")
    public Credential create(@RequestBody Credential credential, @PathVariable("username") String username)
    {
           return credentialService.createCredential(credential,username);
    }
    
    @GetMapping("/{username}")
    @PreAuthorize("#username == authentication.principal.username")
    public List<Credential> getCredentials(@PathVariable("username") String username)
    {
        return credentialService.getCredentials(username);
    }

    @DeleteMapping("/delete/{username}/{id}")
    @PreAuthorize("#username == authentication.principal.username")
    public Credential deleteCredential(@PathVariable("id") Long id, @PathVariable("username") String username)
    {
       return credentialService.deleteCredential(id,username);

    }
 
}
