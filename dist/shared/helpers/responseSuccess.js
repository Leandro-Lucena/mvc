"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseSuccess = responseSuccess;
function responseSuccess(res, data, message = "Success", status = 200) {
    return res.status(status).json({ success: true, message, data });
}
