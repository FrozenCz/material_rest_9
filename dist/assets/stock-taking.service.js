"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockTakingService = void 0;
const common_1 = require("@nestjs/common");
const stock_taking_entity_1 = require("./models/stock-taking.entity");
const stock_taking_item_entity_1 = require("./models/stock-taking-item.entity");
let StockTakingService = class StockTakingService {
    getStockTaking() {
        return stock_taking_entity_1.StockTakingEntity.find();
    }
    createStockTaking(param) {
        const { solverId, user, name, assets } = param;
        const newStockTaking = new stock_taking_entity_1.StockTakingEntity();
        newStockTaking.authorId = user.id;
        newStockTaking.solverId = solverId;
        newStockTaking.name = name;
        newStockTaking.items = this.prepareItems(assets);
        return newStockTaking.save();
    }
    prepareItems(assets) {
        return assets.map((asset) => {
            const newItem = new stock_taking_item_entity_1.StockTakingItemEntity();
            newItem.assetId = asset.id;
            return newItem;
        });
    }
};
StockTakingService = __decorate([
    (0, common_1.Injectable)()
], StockTakingService);
exports.StockTakingService = StockTakingService;
//# sourceMappingURL=stock-taking.service.js.map