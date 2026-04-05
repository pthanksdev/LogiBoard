"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestWithUser = exports.ActiveUser = void 0;
class ActiveUser {
    userId;
    email;
    companyId;
    role;
}
exports.ActiveUser = ActiveUser;
class RequestWithUser extends Request {
    user;
}
exports.RequestWithUser = RequestWithUser;
//# sourceMappingURL=request-with-user.js.map