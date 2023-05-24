package com.production.eopw.services;

import java.util.List;

import com.production.eopw.models.Purchase;

public interface PurchaseService {
    
    public Purchase createPurchase(Purchase purchase, String username, Long product_id);
    public List<Purchase> getPurchases(String username);
    public Purchase deletePurchase(Long id, String username);


    //for admin handling..
    public List<Purchase> purchaseRequests(String admin_username);
    public Purchase updatePurchase(Purchase purchase, Long id ,Long product_id, String username);

}
