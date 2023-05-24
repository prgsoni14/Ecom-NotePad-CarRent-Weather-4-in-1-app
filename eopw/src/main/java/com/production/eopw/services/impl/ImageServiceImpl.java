package com.production.eopw.services.impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.production.eopw.models.Image;
import com.production.eopw.models.Product;
import com.production.eopw.repos.ImageRepo;

@Service
public class ImageServiceImpl {

    @Autowired
    ImageRepo imageRepo;

    String folderPath = "C:\\Users\\Lenovo\\Desktop\\Production\\Ecom-Ola-Password-Weather\\eopw\\images";
    public Image uploadImage(MultipartFile img, String username, Product product)
    {
        String filePath = folderPath + "/" + username + "-" + img.getOriginalFilename();
        Image image = new Image(img.getOriginalFilename(), img.getContentType(), filePath, product);

        try {
            img.transferTo(new File(filePath)); 
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return imageRepo.save(image);
    }

    public byte[] downloadImage(Long id)
    {
        Image image = imageRepo.findById(id).orElse(null);
        if(image == null)
            return null;
        
        String filePath = image.getPath();
        try {
            byte[] img = Files.readAllBytes(new File(filePath).toPath());
            return img;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
