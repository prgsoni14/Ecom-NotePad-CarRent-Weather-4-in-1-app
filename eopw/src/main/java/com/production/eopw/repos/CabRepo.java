package com.production.eopw.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.production.eopw.models.Cab;
import com.production.eopw.models.User;

public interface CabRepo extends JpaRepository<Cab,Long> {
     
    public List<Cab> findByUser(User user);

    public List<Cab> findByStatus(String status);

    public List<Cab> findByApprover(String username);
}
