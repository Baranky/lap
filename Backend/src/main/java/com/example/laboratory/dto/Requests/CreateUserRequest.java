package com.example.laboratory.dto.Requests;
import com.example.laboratory.enums.Role;

import lombok.Builder;

import java.util.Set;

@Builder
public record CreateUserRequest(
        String name,
        String username,
        String password,
        Set<Role> authorities
){
}