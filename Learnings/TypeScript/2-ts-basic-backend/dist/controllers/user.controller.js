"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.postUser = void 0;
const user_service_1 = require("../services/user.service");
const postUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const postInfo = await (0, user_service_1.pstInfo)(name, email);
        res.status(201).json({
            postInfo
        });
    }
    catch (jmt) {
        res.status(401).json({
            message: jmt
        });
    }
};
exports.postUser = postUser;
const getUser = async (req, res) => {
    try {
        const getUsers = await (0, user_service_1.getInfo)();
        res.status(200).json({
            getUsers
        });
    }
    catch (err) {
        res.status(401).json({
            message: err
        });
    }
};
exports.getUser = getUser;
