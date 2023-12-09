package ru.kata.spring.boot_security.demo.util;

import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import javax.annotation.PostConstruct;
import java.util.Set;

@Component
public class Init {
    private final RoleServiceImpl roleService;
    private final UserServiceImpl userService;

    public Init(RoleServiceImpl roleService, UserServiceImpl userService) {
        this.roleService = roleService;
        this.userService = userService;
    }

    @PostConstruct
    public void init() {
        Role admin = new Role("ROLE_ADMIN");
        Role user = new Role("ROLE_USER");
        Set<Role> adminSet = Set.of(admin);
        roleService.addRole(admin);
        roleService.addRole(user);

        User adminUser = new User();
        adminUser.setId(1);
        adminUser.setRoles(adminSet);
        adminUser.setFirstname("admin");
        adminUser.setLastname("admin");
        adminUser.setEmail("email");
        adminUser.setAge((byte) 56);
        adminUser.setPassword("admin");
        userService.addUser(adminUser);
    }

}
