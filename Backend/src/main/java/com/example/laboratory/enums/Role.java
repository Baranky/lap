package com.example.laboratory.enums;

import org.springframework.security.core.GrantedAuthority;

public enum Role  implements GrantedAuthority {
    ROLE_ADMIN("ADMIN"),
    ROLE_WORKER("WORKER"),
    ROLE_PATIENT("PATIENT");

    private String value;

    Role(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }

    @Override
    public String getAuthority() {
        return name();
    }
}

