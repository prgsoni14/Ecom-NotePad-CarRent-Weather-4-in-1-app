package com.production.eopw.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.production.eopw.models.Product;
import com.production.eopw.models.Purchase;
import com.production.eopw.models.User;
import com.production.eopw.repos.ProductRepo;
import com.production.eopw.repos.PurchaseRepo;
import com.production.eopw.repos.UserRepo;
import com.production.eopw.services.PurchaseService;

@Service 
public class PurchaseServiceImpl implements PurchaseService {

    @Autowired
    PurchaseRepo purchaseRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    ProductRepo productRepo;

    @Override
    public List<Purchase> getPurchases(String username) {
        User cur_user=userRepo.findByUsername(username);
        if(cur_user==null)
        return null;

        return purchaseRepo.findByUser(cur_user);
    }

    @Override
    public Purchase createPurchase(Purchase purchase,String username,Long product_id) {
        
        User cur_user=userRepo.findByUsername(username);
        if(cur_user==null)
        return null;

        Product cur_product=productRepo.findById(product_id).orElse(null);
        if(cur_product==null)
        return null;
    
        purchase.setProduct(cur_product);
        purchase.setUser(cur_user);
        purchase.setBuyer(username);
        return purchaseRepo.save(purchase);
    }

    @Override
    public Purchase deletePurchase(Long id, String username) {
        Purchase response = new Purchase();
        try {
            
            Purchase purchase=purchaseRepo.findById(id).orElse(null);
            
            if(purchase==null)
            {
                response.setOwner("Invalid Id");
            }
            else if(purchase.getStatus().startsWith("delivered"))
            {
                response.setOwner("Already Delivered");
            }
            else if(purchase.getStatus().equals("shipped"))
            {
                response.setOwner("Already shipped");
            }
            else if(username.equals(purchase.getUser().getUsername()))
            {        
                purchaseRepo.deleteById(id);
                response.setOwner("successful");
            }
            else
            {
                response.setOwner("Unauthorized");
            }
            return response;
        } catch (Exception e) {
            return null;
        }
    } 


        // Now here we will be handdling our order requests for Admin
        @Override
        public List<Purchase> purchaseRequests(String admin_username) {
            User cur_user=userRepo.findByUsername(admin_username);
            if(cur_user==null)
                return null;
    
            return purchaseRepo.findByProductSellerOrderByStatusDesc(admin_username);
        }


        // This will be used by both party
        @Override
        public Purchase updatePurchase(Purchase purchase, Long id ,Long product_id, String username) {

                //Not secure*************
                Product cur_product=productRepo.findById(product_id).orElse(null);
                if(cur_product==null){
                        System.out.println("Product null");
                        return null;
                        }
                    
                purchase.setUser(userRepo.findByUsername(purchase.getBuyer()));
                purchase.setProduct(cur_product);
                return purchaseRepo.save(purchase);
        }
}
