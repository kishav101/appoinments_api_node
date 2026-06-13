import pool from "../../config/db";

export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
};


export const findAll = async() => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
}


export const findByEmail = async (email: string) => {
    const result  = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
}

export const findById = async(id: string) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
}

export const createUser = async(user: CreateUserDTO) => {   

    const result = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [user.name, user.email, user.password]);
    return result.rows[0];
}

export const deleteUser = async(id: string) => {
   const result =  await pool.query("DELETE FROM users WHERE id = $1", [id]);
   return result.rows[0];
}

export const updateUser = async (id: string, user: CreateUserDTO) => {
    const result = await pool.query("UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *", [user.name, user.email, user.password, id]);
    return result.rows[0];
}