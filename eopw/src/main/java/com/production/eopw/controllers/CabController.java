package com.production.eopw.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.production.eopw.models.Cab;
import com.production.eopw.services.impl.CabServiceImpl;

@RestController
@RequestMapping("/cab")
@CrossOrigin("*")
public class CabController {

    @Autowired
    CabServiceImpl cabService;
    
    @PostMapping("/create/{username}")
    @PreAuthorize("#username == authentication.principal.username")
    public Cab createCab(@RequestBody Cab cab,@PathVariable("username") String username)
    {
        return cabService.createCab(cab,username);
    }

    
    @GetMapping("/{username}")
    @PreAuthorize("#username == authentication.principal.username")
    public List<Cab> getBookings(@PathVariable("username") String username)
    {
        System.out.println();
        return cabService.getCabs(username);
    }
    
    @DeleteMapping("/delete/{username}/{id}")
    @PreAuthorize("#username == authentication.principal.username")
    public Cab deleteCab(@PathVariable("id")Long id, @PathVariable("username") String username)
    {
       return cabService.deleteCab(id,username);
    }
 
}
