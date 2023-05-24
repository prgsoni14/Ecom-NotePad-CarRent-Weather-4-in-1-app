package com.production.eopw.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.production.eopw.models.Credential;
import com.production.eopw.models.User;

@Component
public interface CredentialRepo extends JpaRepository<Credential,Long> {

        public List<Credential> findByUser(User user);
}
