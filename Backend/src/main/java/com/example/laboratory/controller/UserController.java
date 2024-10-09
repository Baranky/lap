package com.example.laboratory.controller;

import com.example.laboratory.dto.Requests.AuthRequest;
import com.example.laboratory.dto.Requests.CreateUserRequest;
import com.example.laboratory.entity.User;
import com.example.laboratory.services.JwtService;
import com.example.laboratory.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
@Slf4j
public class UserController {

    private final UserService service;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public UserController(UserService service, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.service = service;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/generateToken")
    public String generateToken(@RequestBody AuthRequest request) {
        // Kullanıcıyı authenticate ediyoruz
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        if (authentication.isAuthenticated()) {
            // Kullanıcı doğrulandıktan sonra UserDetails alınıyor
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            // Token oluşturuluyor
            return jwtService.generateToken(userDetails);
        }

        log.info("invalid username " + request.username());
        throw new UsernameNotFoundException("invalid username: " + request.username());
    }
}
