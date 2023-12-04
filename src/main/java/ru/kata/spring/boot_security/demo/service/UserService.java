package ru.kata.spring.boot_security.demo.service;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService extends UserDetailsService {
    boolean addUser(User user);

    User updateUser(User user);

    void deleteUser(int id);

    List<User> allUsers();

    UserDetails loadUserByUsername(String email);

    User findByEmail(String email);

    User showUserById(int id);
}
