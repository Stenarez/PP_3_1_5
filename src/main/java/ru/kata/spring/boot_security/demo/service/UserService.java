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

    //    User findUser(int id);
    UserDetails loadUserByUsername(String username);

    User findByUsername(String name);

    User showUserById(int id);
}
