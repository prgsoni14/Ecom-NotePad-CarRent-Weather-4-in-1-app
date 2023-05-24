package com.production.eopw.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.production.eopw.models.Product;

public interface ProductRepo extends JpaRepository<Product,Long> {
    
        public List<Product> findBySeller(String username);

        public List<Product> findByCategory(String category);

}
