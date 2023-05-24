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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.production.eopw.models.Purchase;
import com.production.eopw.services.impl.ImageServiceImpl;
import com.production.eopw.services.impl.PurchaseServiceImpl;

@RestController
@RequestMapping("/purchase")
@CrossOrigin("*")
public class PurchaseController {

    @Autowired
    PurchaseServiceImpl purchaseService;

    @Autowired
    ImageServiceImpl imageService;

    @PostMapping("/create/{username}/{product_id}")
    @PreAuthorize("#username == authentication.principal.username")
    public Purchase createPurchase(@RequestBody Purchase purchase,@PathVariable("username") String username,@PathVariable("product_id") Long id)
    {
        return purchaseService.createPurchase(purchase,username,id);
    }

    @GetMapping("/{username}")
    @PreAuthorize("#username == authentication.principal.username")
    public ResponseEntity<?> getPurchases(@PathVariable("username") String username)
    {
        Map<String,Object>response = new HashMap<>();
        List<Purchase> purchases = purchaseService.getPurchases(username);
        response.put("purchases", purchases);

        List<byte[]>imagesBytes= new ArrayList<>();
        for(Purchase purchase:purchases)
        {
            imagesBytes.add(imageService.downloadImage(purchase.getProduct().getImages().get(0).getId()));
        }
        response.put("imagesBytes", imagesBytes);
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/delete/{username}/{id}")
    @PreAuthorize("#username == authentication.principal.username")
    public Purchase deletePurchase(@PathVariable("id") Long id, @PathVariable("username") String username)
    {
        return purchaseService.deletePurchase(id,username);
    }

    @PutMapping("/update/{username}/{id}/{product_id}")
    @PreAuthorize("#username == authentication.principal.username")
    public Purchase updatePurchase(@PathVariable("id") Long id,@PathVariable("product_id") Long product_id, @PathVariable("username") String username, @RequestBody Purchase updated_purchase)
    {
        return purchaseService.updatePurchase(updated_purchase, id,product_id ,username);
    }
    
}
