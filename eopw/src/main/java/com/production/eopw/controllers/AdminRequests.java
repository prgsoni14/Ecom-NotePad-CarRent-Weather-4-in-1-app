package com.production.eopw.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.production.eopw.models.Cab;
import com.production.eopw.models.Purchase;
import com.production.eopw.services.impl.CabServiceImpl;
import com.production.eopw.services.impl.ImageServiceImpl;
import com.production.eopw.services.impl.PurchaseServiceImpl;

@RestController
@RequestMapping("/adminr")
@CrossOrigin("*")
public class AdminRequests {

    @Autowired
    PurchaseServiceImpl purchaseService;

    @Autowired
    CabServiceImpl cabService;

    @PutMapping("/ecom/update/{username}/{id}/{product_id}")
    @PreAuthorize("#username == authentication.principal.username")
    public Purchase updatePurchase(@PathVariable("id") Long id, @PathVariable("product_id") Long product_id, @PathVariable("username") String username, @RequestBody Purchase updated_purchase)
    {
        return purchaseService.updatePurchase(updated_purchase,id,product_id,username);
    }

    @Autowired
    ImageServiceImpl imageService;

    @GetMapping("/ecom/request/{username}")
    @PreAuthorize("#username == authentication.principal.username")
    public ResponseEntity<?> getPurchaseRequest(@PathVariable("username") String username)
    {
        Map<String,Object>response = new HashMap<>();
        List<Purchase> purchases = purchaseService.purchaseRequests(username);
        response.put("purchases", purchases);

        List<byte[]>imagesBytes= new ArrayList<>();
        for(Purchase purchase:purchases)
        {
            imagesBytes.add(imageService.downloadImage(purchase.getProduct().getImages().get(0).getId()));
        }
        response.put("imagesBytes", imagesBytes);
        return ResponseEntity.ok().body(response);
    }


    @PutMapping("/cab/update/{username}/{id}")
    @PreAuthorize("#username == authentication.principal.username")
    public Cab updateCab(@PathVariable("id") Long id, @PathVariable("username") String username)
    {
        return cabService.updateCab(id,username);
    }

    @GetMapping("/cab/request/{username}")
    @PreAuthorize("#username == authentication.principal.username")
    public List<Cab> getCabRequest(@PathVariable("username") String username)
    {
        return cabService.cabRequests();
    }

    @GetMapping("/cab/approvals/{username}")
    @PreAuthorize("#username == authentication.principal.username")
    public List<Cab> getApprovalsByMe(@PathVariable("username") String username)
    {
        return cabService.cabApprovalsByAdmin(username);
    }


    // These admin changes are not secure, as we can't verify the actual user is, because these are admin requests and the data can be fake as well.
}
