"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("./config/express");
const PORT = process.env.PORT || 3000;
express_1.app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
