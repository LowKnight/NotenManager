package com.NotenManager.NotenManager.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    private String vorname;
    private String nachname;
    private String email;
    private String password;
}
