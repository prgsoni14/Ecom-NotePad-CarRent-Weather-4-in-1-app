package com.production.eopw.services;

import java.util.List;

import com.production.eopw.models.Credential;

public interface CredentialService {
    
        public Credential createCredential(Credential credential,String username);
        public List<Credential> getCredentials(String username);
        public Credential deleteCredential(Long id, String username);
}
