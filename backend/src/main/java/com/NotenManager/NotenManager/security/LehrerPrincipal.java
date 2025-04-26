package com.NotenManager.NotenManager.security;

import com.NotenManager.NotenManager.model.Lehrer;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@AllArgsConstructor
public class LehrerPrincipal implements UserDetails {

    private final Lehrer lehrer;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList(); // oder z. B. List.of(new SimpleGrantedAuthority("LEHRER"))
    }

    @Override
    public String getPassword() {
        return lehrer.getPassword();
    }

    @Override
    public String getUsername() {
        return lehrer.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Lehrer getLehrer() {
        return lehrer;
    }
}
