"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const logging_entity_1 = require("./logging.entity");
let LoggingInterceptor = class LoggingInterceptor {
    intercept(context, next) {
        var _a, _b, _c;
        const request = context.switchToHttp().getRequest();
        const newLogging = new logging_entity_1.LoggingEntity();
        const now = Date.now();
        newLogging.body = (_a = request.body) !== null && _a !== void 0 ? _a : null;
        newLogging.url = request.url;
        newLogging.method = request.method;
        newLogging.username = (_c = (_b = request.user) === null || _b === void 0 ? void 0 : _b.username) !== null && _c !== void 0 ? _c : null;
        return next
            .handle()
            .pipe((0, rxjs_1.tap)({
            next: (result) => {
                newLogging.result = result;
                newLogging.type = 'log';
                newLogging.time_ms = Date.now() - now;
                newLogging.save();
            }, error: (result) => {
                newLogging.result = result;
                newLogging.type = 'error';
                newLogging.time_ms = Date.now() - now;
                newLogging.save();
            }
        }));
    }
};
LoggingInterceptor = __decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);
exports.LoggingInterceptor = LoggingInterceptor;
//# sourceMappingURL=logging.interceptor.js.map