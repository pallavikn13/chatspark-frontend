package com.chatspark.service;

import com.chatspark.dto.AuthResponse;
import com.chatspark.dto.LoginRequest;
import com.chatspark.dto.RegisterRequest;
import com.chatspark.dto.UserDto;
import com.chatspark.entity.User;
import com.chatspark.exception.ResourceNotFoundException;
import com.chatspark.repository.UserRepository;
import com.chatspark.security.JwtTokenProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String email = request.getEmail().trim().toLowerCase();
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("User with email " + email + " already exists.");
        }

        User user = User.builder()
                .fullName(request.getResolvedName())
                .email(email)
                .password(passwordEncoder.encode(request.getPassword()))
                .plan("Free Plan")
                .build();

        user = userRepository.save(user);
        String token = tokenProvider.generateToken(user.getEmail());

        return AuthResponse.builder()
                .token(token)
                .user(UserDto.fromEntity(user))
                .build();
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        String email = request.getEmail().trim().toLowerCase();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password.");
        }

        String token = tokenProvider.generateToken(user.getEmail());

        return AuthResponse.builder()
                .token(token)
                .user(UserDto.fromEntity(user))
                .build();
    }

    @Transactional(readOnly = true)
    public UserDto getCurrentUser(User currentUser) {
        if (currentUser == null) {
            throw new ResourceNotFoundException("User not authenticated.");
        }
        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
        return UserDto.fromEntity(user);
    }
}
