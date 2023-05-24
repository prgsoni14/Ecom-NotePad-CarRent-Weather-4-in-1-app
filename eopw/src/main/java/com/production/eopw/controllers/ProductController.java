package com.production.eopw.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.production.eopw.models.Image;
import com.production.eopw.models.Product;
import com.production.eopw.repos.ProductRepo;
import com.production.eopw.services.impl.ImageServiceImpl;
import com.production.eopw.services.impl.ProductServiceImpl;

@RestController
@RequestMapping("/product")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    ProductServiceImpl productService;

    @Autowired
    ImageServiceImpl imageService;

    @Autowired
    ProductRepo productRepo;

    @PostMapping("/create/{username}")
    @PreAuthorize("#username==authentication.principal.username")
    public ResponseEntity<?> createProduct(@RequestPart("product") Product product, @RequestParam("images") MultipartFile[] images, @PathVariable("username") String username)
    {
        Product curProduct = productService.createProduct(product, username);

        List<Image>productImages = new ArrayList<>();
        for(MultipartFile file : images)
        {
           productImages.add(imageService.uploadImage(file, username, curProduct));
        }

        curProduct.setImages(productImages);
        productRepo.save(curProduct);

        Map<String,Object>response = new HashMap<>();
        response.put("product", curProduct);
        response.put("imageBytes", imageService.downloadImage(productImages.get(0).getId()));
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/products")
    public ResponseEntity<?> getAll()
    {
        Map<String,Object>response = new HashMap<>();
        List<Product>products = productService.getProducts();
        response.put("products", products);
        List<byte[]> imagesByteArray = new ArrayList<>();
        for(Product product : products)
        {   
            imagesByteArray.add(imageService.downloadImage(product.getImages().get(0).getId()));
        }
        response.put("images", imagesByteArray);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/products/OneProduct/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id") Long id)
    {
        Map<String,Object>response = new HashMap<>();
        Product product = productService.getOne(id);
        response.put("product", product);
        List<byte[]> imagesByteArray = new ArrayList<>();
        for(Image image : product.getImages())
        {
            imagesByteArray.add(imageService.downloadImage(image.getId()));
        }
        response.put("images", imagesByteArray);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/products/category/{category}")
    public ResponseEntity<?> getByCategory(@PathVariable("category") String category)
    {
        Map<String,Object>response = new HashMap<>();
        List<Product>products = productService.getProductsByCategory(category);
        response.put("products", products);
        List<byte[]> imagesByteArray = new ArrayList<>();
        for(Product product : products)
        {   
            imagesByteArray.add(imageService.downloadImage(product.getImages().get(0).getId()));
        }
        response.put("images", imagesByteArray);
        return ResponseEntity.ok().body(response);
    }

    

    @GetMapping("/products/{username}")
    @PreAuthorize("#username==authentication.principal.username")
    public ResponseEntity<?> getByAdmin(@PathVariable("username") String username)
    {
        Map<String,Object>response = new HashMap<>();
        List<Product>products = productService.getProductsByAdmin(username);
        response.put("products", products);
        List<byte[]> imagesByteArray = new ArrayList<>();
        for(Product product : products)
        {   
            imagesByteArray.add(imageService.downloadImage(product.getImages().get(0).getId()));
        }
        response.put("images", imagesByteArray);
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/delete/{seller}/{id}")
    @PreAuthorize("#seller==authentication.principal.username")
    public Product deleteProduct(@PathVariable("id") Long id, @PathVariable("seller") String seller)
    {
        return productService.deleteProduct(id);
    }
 
}
