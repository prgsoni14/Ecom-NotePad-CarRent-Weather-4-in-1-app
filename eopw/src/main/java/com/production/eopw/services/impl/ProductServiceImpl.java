package com.production.eopw.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.production.eopw.models.Product;
import com.production.eopw.models.User;
import com.production.eopw.repos.ProductRepo;
import com.production.eopw.repos.UserRepo;
import com.production.eopw.services.ProductService;

@Service 
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepo productRepo;

    @Autowired
    UserRepo userRepo;

    @Override
    public Product createProduct(Product product, String username) {
        User cur_user=userRepo.findByUsername(username);
        if(cur_user==null)
        return null;
        
        product.setUser(cur_user);
        return productRepo.save(product);
    }
    
    @Override
    public List<Product> getProducts() {
        return productRepo.findAll();
    }

    @Override
    public List<Product> getProductsByAdmin(String username) {
       return productRepo.findBySeller(username);
    }

    @Override
    public List<Product> getProductsByCategory(String category)
    {
       return productRepo.findByCategory(category);
    }

    @Override
    public Product deleteProduct(Long id) {
        try {
            productRepo.deleteById(id);
            Product handler = new Product();
            handler.setName("Product successfully deleted");
            return handler;
        } catch (Exception e) {
            Product handler = new Product();
            handler.setName("product is already purchased by user");
            return handler;
        }
    }

    @Override
    public Product getOne(Long id) {
       return productRepo.findById(id).orElse(null);
    }
}
