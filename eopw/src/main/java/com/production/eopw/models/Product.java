package com.production.eopw.models;

import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;

    @OneToMany(cascade = CascadeType.ALL, fetch=FetchType.LAZY, mappedBy = "product")
    private List<Image> images;

    private String description;
    private String description2;
    private String description3;
    private String category;
    
    private BigDecimal price;
    @Column(nullable = false)
    private String seller;

    @ManyToOne()
    @JsonIgnore
    @JoinColumn(nullable = false)
    private User user;

    public Product()
    {

    }
   

    public Product(String name, List<Image> images, String description, String description2, String description3,
            String category, BigDecimal price, String seller, User user) {
        this.name = name;
        this.images = images;
        this.description = description;
        this.description2 = description2;
        this.description3 = description3;
        this.category = category;
        this.price = price;
        this.seller = seller;
        this.user = user;
    }

    public String getDescription2() {
        return description2;
    }


    public void setDescription2(String description2) {
        this.description2 = description2;
    }


    public String getDescription3() {
        return description3;
    }





    public void setDescription3(String description3) {
        this.description3 = description3;
    }





    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getSeller() {
        return seller;
    }

    public void setSeller(String seller) {
        this.seller = seller;
    }



    public String getCategory() {
        return category;
    }



    public void setCategory(String category) {
        this.category = category;
    }




    public List<Image> getImages() {
        return images;
    }




    public void setImages(List<Image> images) {
        this.images = images;
    }

    


}
