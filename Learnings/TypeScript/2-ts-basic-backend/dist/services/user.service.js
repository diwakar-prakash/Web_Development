"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pstInfo = exports.getInfo = void 0;
let users = [];
const getInfo = () => {
    return users;
};
exports.getInfo = getInfo;
const pstInfo = (name, email) => {
    const newUser = {
        id: Date.now(),
        name,
        email
    };
    users.push(newUser);
    return newUser;
};
exports.pstInfo = pstInfo;
