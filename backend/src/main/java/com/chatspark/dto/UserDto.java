package com.chatspark.dto;

import com.chatspark.entity.User;

public class UserDto {
    private String id;
    private String fullName;
    private String email;
    private String plan;

    public UserDto() {
    }

    public UserDto(String id, String fullName, String email, String plan) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.plan = plan;
    }

    public static UserDto fromEntity(User user) {
        return UserDto.builder()
                .id(String.valueOf(user.getId()))
                .fullName(user.getFullName())
                .email(user.getEmail())
                .plan(user.getPlan() != null ? user.getPlan() : "Free Plan")
                .build();
    }

    public static UserDtoBuilder builder() {
        return new UserDtoBuilder();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPlan() {
        return plan;
    }

    public void setPlan(String plan) {
        this.plan = plan;
    }

    public static class UserDtoBuilder {
        private String id;
        private String fullName;
        private String email;
        private String plan;

        UserDtoBuilder() {
        }

        public UserDtoBuilder id(String id) {
            this.id = id;
            return this;
        }

        public UserDtoBuilder fullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public UserDtoBuilder email(String email) {
            this.email = email;
            return this;
        }

        public UserDtoBuilder plan(String plan) {
            this.plan = plan;
            return this;
        }

        public UserDto build() {
            return new UserDto(id, fullName, email, plan);
        }
    }
}
