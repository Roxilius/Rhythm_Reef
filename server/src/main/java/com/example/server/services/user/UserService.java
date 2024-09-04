package com.example.server.services.user;

import java.io.IOException;
import java.sql.SQLException;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import com.example.server.data_transfer_object.user.ChangePasswordRequest;
import com.example.server.data_transfer_object.user.LoginRequest;
import com.example.server.data_transfer_object.user.LoginResponse;
import com.example.server.data_transfer_object.user.Register;
import com.example.server.data_transfer_object.user.UserRequest;
import com.example.server.data_transfer_object.user.UserResponse;

public interface UserService {
    Register register(Register request);
    void uploadUserImage(MultipartFile userImage) throws IOException, SQLException;
    LoginResponse login(LoginRequest request);
    UserRequest editProfile(UserRequest request);
    UserResponse profile();
    void verifyEmail(@PathVariable String email);
    void verifyOtp(@PathVariable Integer otp, @PathVariable String email);
    void changePasswordHandler(@RequestBody ChangePasswordRequest request, @PathVariable String email);
}
