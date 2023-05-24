package com.production.eopw.services;

import java.util.List;

import com.production.eopw.models.Product;

public interface ProductService {
    
    public Product createProduct(Product product, String username);
    public List<Product> getProducts();
    public Product getOne(Long id);
    public List<Product> getProductsByAdmin(String username);
    public Product deleteProduct(Long id);

    public List<Product> getProductsByCategory(String category);
}
