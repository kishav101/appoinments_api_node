"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errMiddleware = void 0;
const errMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res
        .status(500)
        .json({
        success: false,
        message: err.stack?.toString() || "Internal Server Error",
    });
};
exports.errMiddleware = errMiddleware;
