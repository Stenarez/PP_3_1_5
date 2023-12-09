package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.exceptions.NoSuchUserException;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class AdminRestController {

    private final UserService userService;


    @Autowired
    public AdminRestController(UserService userService) {
        this.userService = userService;

    }

    @GetMapping("/admin")
    public ResponseEntity<List<User>> vseUser() {
        List<User> vseUser = userService.allUsers();
        return new ResponseEntity<>(vseUser, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<User> oneUser(Principal principal) {
        User user = userService.findByEmail(principal.getName());
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/admin/{id}")
    public ResponseEntity<User> showById(@PathVariable int id) throws NoSuchUserException {
        User user = userService.showUserById(id);
        if (user == null) {
            throw new NoSuchUserException("There is no user with ID " + id + "in Database");
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/admin")
    public ResponseEntity<User> create(@RequestBody User user) {
        userService.addUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/admin/{id}")
    public void delete(@PathVariable("id") int id) throws NoSuchUserException {
        User user = userService.showUserById(id);
        if (user == null) {
            throw new NoSuchUserException("There is no user with ID " + id + "in Database");
        }
        userService.deleteUser(id);
    }

    @PatchMapping("/admin/{id}")
    public ResponseEntity<User> update(@RequestBody User user) {
        userService.updateUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}