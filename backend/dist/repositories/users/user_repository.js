"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.findById = exports.findByEmail = exports.findAll = void 0;
const db_1 = __importDefault(require("../../config/db"));
;
const findAll = async () => {
    const result = await db_1.default.query('SELECT * FROM users');
    return result.rows;
};
exports.findAll = findAll;
const findByEmail = async (email) => {
    const result = await db_1.default.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
};
exports.findByEmail = findByEmail;
const findById = async (id) => {
    const result = await db_1.default.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
};
exports.findById = findById;
const createUser = async (user) => {
    const result = await db_1.default.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [user.name, user.email, user.password]);
    return result.rows[0];
};
exports.createUser = createUser;
