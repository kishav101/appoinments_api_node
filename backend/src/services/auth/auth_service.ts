import * as userRepository from "../../repositories/users/user_repository";
import { hashPassword, comparePassword } from "../../utils/password";
import {
  generateAccessToken,
  gnerateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt";
import { CreateUserDTO } from "../../repositories/users/user_repository";

// register()
//   -> hash password
//   -> create user

// login()
//   -> find user
//   -> verify password
//   -> create access token
//   -> create refresh token
//   -> save refresh token

// refresh()
//   -> validate refresh token
//   -> issue new access token

// logout()
//   -> remove refresh token

export const register = async (user: CreateUserDTO) => {
  const existingUser = await userRepository.findByEmail(user.email);
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await hashPassword(user.password);

  return userRepository.createUser({
    name: user.name,
    email: user.email,
    password: hashedPassword,
  });
};

export const login = async (email: string, password: string) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = gnerateRefreshToken(user.id);

  await userRepository.saveRefreshToken(user.id, refreshToken);

  return {
    accessToken,
    refreshToken,
  };
};

export const refresh = async (token: string) => {
  const payload = verifyRefreshToken(token);
  const user = await userRepository.findById(payload.userId.toString());

  if (!user || user.refresh_token !== token) {
    throw new Error("Invalid refresh token");
  }

  const accessToken = generateAccessToken(user.id);

  return {
    accessToken,
  };
};

export const logout = async (refreshToken: string) => {
  const payload = verifyRefreshToken(refreshToken);

  await userRepository.clearRefreshToken(payload.userId.toString());

  return {
    message: "|Logged out successfully|",
  };
};


