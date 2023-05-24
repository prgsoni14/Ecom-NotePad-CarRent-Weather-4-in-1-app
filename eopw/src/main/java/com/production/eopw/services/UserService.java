package com.production.eopw.services;

import java.util.List;
import com.production.eopw.models.User;

public interface UserService {
    public User createUser(User user);
    public User updateUser(User user, String username);
    public User deleteUser(Long id, String username);
    public User getUser(String username);
    public List<User> getUsers();
}
