package com.production.eopw.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Purchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String owner;
    private String address;
    private Long contact;
    private String orderDate;
    private Long count;
    private Long cost;
    private String payment;
    private String status;
    private String buyer;


    @OneToOne
    @JoinColumn(nullable = false)
    private Product product;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(nullable = false)
    private User user;

    public Purchase()
    {

    }


    public Purchase(String owner, String address, Long contact, String orderDate, Long count, Long cost, String payment,
            String status, String buyer, Product product, User user) {
        this.owner = owner;
        this.address = address;
        this.contact = contact;
        this.orderDate = orderDate;
        this.count = count;
        this.cost = cost;
        this.payment = payment;
        this.status = status;
        this.buyer = buyer;
        this.product = product;
        this.user = user;
    }




    public String getOwner() {
        return owner;
    }



    public void setOwner(String owner) {
        this.owner = owner;
    }


    public String getOrderDate() {
        return orderDate;
    }



    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public String getAddress() {
        return address;
    }



    public void setAddress(String address) {
        this.address = address;
    }



    public Long getContact() {
        return contact;
    }



    public void setContact(Long contact) {
        this.contact = contact;
    }



    public Long getCost() {
        return cost;
    }



    public void setCost(Long cost) {
        this.cost = cost;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }









    public String getPayment() {
        return payment;
    }









    public void setPayment(String payment) {
        this.payment = payment;
    }






    public String getStatus() {
        return status;
    }






    public void setStatus(String status) {
        this.status = status;
    }




    public String getBuyer() {
        return buyer;
    }




    public void setBuyer(String buyer) {
        this.buyer = buyer;
    }

    
     
}
