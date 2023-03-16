"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transforms = void 0;
class Transforms {
    static assetToAssetDto(asset) {
        var _a, _b;
        return Object.assign(Object.assign({}, asset), { removingProtocol_id: null, attachments: (_b = (_a = asset.attachments) === null || _a === void 0 ? void 0 : _a.map((a) => Transforms.assetAttachmentToDto(a, asset.id))) !== null && _b !== void 0 ? _b : [] });
    }
    static assetAttachmentToDto(assetAttachment, assetId) {
        return {
            type: assetAttachment.type,
            url: '/assets/' +
                assetId +
                '/attachments/' +
                assetAttachment.attachment_id +
                '/' +
                assetAttachment.filename,
            filename: assetAttachment.filename,
            uuid: assetAttachment.attachment_id,
        };
    }
    static userToUserDto(u, reachableUsers) {
        return {
            id: u.id,
            username: u.username,
            name: u.name,
            surname: u.surname,
            reachable: !!reachableUsers.get(u.id),
            unit_id: u.unit.id,
        };
    }
}
exports.Transforms = Transforms;
//# sourceMappingURL=transforms.js.map