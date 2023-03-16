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
exports.RemovingProtocol = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/models/user.entity");
const assets_entity_1 = require("../../assets/models/assets.entity");
let RemovingProtocol = class RemovingProtocol extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RemovingProtocol.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: false }),
    __metadata("design:type", String)
], RemovingProtocol.prototype, "document", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp without time zone', nullable: false }),
    __metadata("design:type", Date)
], RemovingProtocol.prototype, "documentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp without time zone', nullable: false }),
    __metadata("design:type", Date)
], RemovingProtocol.prototype, "possibleRemovingDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp without time zone' }),
    __metadata("design:type", Date)
], RemovingProtocol.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User, (user) => user.id, {
        eager: true,
        cascade: true,
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], RemovingProtocol.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => assets_entity_1.Assets, (assets) => assets.removingProtocol),
    __metadata("design:type", Array)
], RemovingProtocol.prototype, "assets", void 0);
RemovingProtocol = __decorate([
    (0, typeorm_1.Entity)()
], RemovingProtocol);
exports.RemovingProtocol = RemovingProtocol;
//# sourceMappingURL=protocols.entity.js.map