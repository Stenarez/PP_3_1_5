package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }


    @GetMapping()
    public String vseUser(Model model) {
        model.addAttribute("user", userService.allUsers());
        return "admin";
    }

    @GetMapping("/new")
    public String newPerson(Model model) {
        model.addAttribute("user", new User());
        model.addAttribute("roles", roleService.allRoles());
        return "new";
    }

    @PostMapping("/new")
    public String create(@ModelAttribute("user") User user) {
        userService.addUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}/delete")
    public String delete(@PathVariable("id") int id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }

    @GetMapping("/{id}/edit")
    public String edit(@ModelAttribute("id") int id, ModelMap model) {
        model.addAttribute("user", userService.showUserById(id));
        model.addAttribute("roles", roleService.allRoles());
        return "edit";
    }

    @PatchMapping("/{id}")
    public String update(@ModelAttribute("user") User user) {
        userService.updateUser(user);
        return "redirect:/admin";
    }
}