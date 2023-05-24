package com.production.eopw.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.production.eopw.models.Purchase;
import com.production.eopw.models.User;

public interface PurchaseRepo extends JpaRepository<Purchase,Long> {
    public List<Purchase> findByUser(User user);
    public List<Purchase> findByProductSellerOrderByStatusDesc(String seller);
}
