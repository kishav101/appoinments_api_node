import * as userRepository from '../../repositories/users/user_repository';
import {CreateUserDTO} from '../../repositories/users/user_repository';



export const getUsers = async () => {
    return await userRepository.findAll();
}

export const getUserByEmail = async (email: string) => {
    return await userRepository.findByEmail(email);
}

export const getUserById = async (id: string) => {
    return await userRepository.findById(id);
}

export const createUser = async (user: CreateUserDTO) => {
    return await userRepository.createUser(user);
}