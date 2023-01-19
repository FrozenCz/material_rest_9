"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const rights_entity_1 = require("./rights.entity");
const unit_entity_1 = require("../../units/unit.entity");
let User = class User extends typeorm_1.BaseEntity {
    async validatePassword(password) {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], User.prototype, "surname", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false }),
    __metadata("design:type", String)
], User.prototype, "salt", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => rights_entity_1.Rights, { cascade: true, eager: true }),
    (0, typeorm_1.JoinTable)({
        name: 'users_rights',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'rights_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], User.prototype, "rights", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => unit_entity_1.Unit, (unit) => unit.id, { eager: true, cascade: false }),
    __metadata("design:type", unit_entity_1.Unit)
], User.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false, default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.VersionColumn)({ default: 1 }),
    __metadata("design:type", Number)
], User.prototype, "version", void 0);
User = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['username'])
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map