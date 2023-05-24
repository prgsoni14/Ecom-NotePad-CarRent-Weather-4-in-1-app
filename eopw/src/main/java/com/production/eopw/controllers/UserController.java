package com.production.eopw.controllers;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.production.eopw.helper.CustomUserDetailsService;
import com.production.eopw.helper.JwtRequest;
import com.production.eopw.helper.JwtResponse;
import com.production.eopw.helper.JwtUtil;
import com.production.eopw.models.User;
import com.production.eopw.services.impl.ImageServiceImpl;
import com.production.eopw.services.impl.UserServiceImpl;

@RestController
@RequestMapping("/user")
@CrossOrigin (origins = "*")
public class UserController {

    @Autowired
    UserServiceImpl userService;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    CustomUserDetailsService customUserDetailsService;

    @Autowired
    ImageServiceImpl imageService;

    @PostMapping("/create")
    public User createUser(@RequestPart("user") User user, @RequestParam("profilePic") MultipartFile profilePic)
    {
        if(user.getPassword().length()<3)
                return null;
                
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setProfilePic(imageService.uploadImage(profilePic, user.getUsername(), null));
        return userService.createUser(user);
    }

    @PostMapping("/generate-token")
    public JwtResponse tokenization(@RequestBody JwtRequest jwtRequest )
    {
        try {
            authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid Creds");
        }

        final UserDetails userDetails = customUserDetailsService.loadUserByUsername(jwtRequest.getUsername());
        final String token = jwtUtil.generateToken(userDetails);
        return new JwtResponse(token);
    } 

    @PutMapping("/update/{username}")
    @PreAuthorize("#username == authentication.principal.username")
    public User updateUser(@RequestBody User user, @PathVariable("username") String username)
    {
            if(user.getPassword().length()<3)
                return null;

            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            return userService.updateUser(user, username);
    }

    @DeleteMapping("/delete/{username}/{id}")
    @PreAuthorize("#username == authentication.principal.username")
    public User deleteUser(@PathVariable("id") Long id, @PathVariable("username") String username)
    {
        return userService.deleteUser(id,username);
    }

    @GetMapping("/current-user")
    public ResponseEntity<?> getCurrentUser(Principal principal)
    {
        Map<String, Object> responseMap = new HashMap<>();
        User user = userService.getUser(principal.getName());
        responseMap.put("user", user);
        responseMap.put("profilePic", imageService.downloadImage(user.getProfilePic().getId()));
        return ResponseEntity.ok().body(responseMap);
    }
 
}
