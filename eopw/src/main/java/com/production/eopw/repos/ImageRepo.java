package com.production.eopw.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.production.eopw.models.Image;

public interface ImageRepo extends JpaRepository<Image,Long> {

    
    
}
