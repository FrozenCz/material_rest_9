"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RightsList = exports.RightsTag = exports.RightsCategoryEnum = void 0;
var RightsCategoryEnum;
(function (RightsCategoryEnum) {
    RightsCategoryEnum["categories"] = "categories";
    RightsCategoryEnum["assets"] = "assets";
    RightsCategoryEnum["locations"] = "locations";
    RightsCategoryEnum["rights"] = "rights";
    RightsCategoryEnum["units"] = "units";
    RightsCategoryEnum["users"] = "users";
})(RightsCategoryEnum = exports.RightsCategoryEnum || (exports.RightsCategoryEnum = {}));
var RightsTag;
(function (RightsTag) {
    RightsTag["createCategory"] = "createCategory";
    RightsTag["deleteCategory"] = "deleteCategory";
    RightsTag["updateCategory"] = "updateCategory";
    RightsTag["createLocation"] = "createLocation";
    RightsTag["deleteLocation"] = "deleteLocation";
    RightsTag["updateLocation"] = "updateLocation";
    RightsTag["createAssets"] = "createAssets";
    RightsTag["removeAssets"] = "removeAssets";
    RightsTag["changeAssetsUser"] = "changeAssetsUser";
    RightsTag["changeAssetsInformation"] = "changeAssetsInformation";
    RightsTag["getUser"] = "getUser";
    RightsTag["createUser"] = "createUser";
    RightsTag["deleteUser"] = "deleteUser";
    RightsTag["updateUsersInformation"] = "updateUsersInformation";
    RightsTag["settingRights"] = "settingRights";
    RightsTag["setRights"] = "setRights";
    RightsTag["createUnits"] = "createUnits";
    RightsTag["editUnits"] = "editUnits";
    RightsTag["deleteUnits"] = "deleteUnits";
    RightsTag["addManagerToUnits"] = "addManagerToUnits";
    RightsTag["removeManagerFromUnits"] = "removeManagerFromUnits";
})(RightsTag = exports.RightsTag || (exports.RightsTag = {}));
exports.RightsList = [
    { relatedTo: RightsCategoryEnum.categories, tag: RightsTag.createCategory, name: 'Tvorba kategorií majetku' },
    { relatedTo: RightsCategoryEnum.categories, tag: RightsTag.deleteCategory, name: 'Mazání kategorií majetku' },
    { relatedTo: RightsCategoryEnum.categories, tag: RightsTag.updateCategory, name: 'Úprava kategorií majetku' },
    { relatedTo: RightsCategoryEnum.assets, tag: RightsTag.createAssets, name: 'Přidávání majetku' },
    { relatedTo: RightsCategoryEnum.assets, tag: RightsTag.removeAssets, name: 'Vyřazování majetku' },
    { relatedTo: RightsCategoryEnum.assets, tag: RightsTag.changeAssetsUser, name: 'Změna uživatele u majetku' },
    { relatedTo: RightsCategoryEnum.assets, tag: RightsTag.changeAssetsInformation, name: 'Změna informací u majetku' },
    { relatedTo: RightsCategoryEnum.locations, tag: RightsTag.createLocation, name: 'Tvorba lokací' },
    { relatedTo: RightsCategoryEnum.locations, tag: RightsTag.deleteLocation, name: 'Úprava lokací' },
    { relatedTo: RightsCategoryEnum.locations, tag: RightsTag.updateLocation, name: 'Mazání lokací' },
    { relatedTo: RightsCategoryEnum.users, tag: RightsTag.getUser, name: 'zobrazení uživatele' },
    { relatedTo: RightsCategoryEnum.users, tag: RightsTag.createUser, name: 'tvorba uživatele' },
    { relatedTo: RightsCategoryEnum.users, tag: RightsTag.deleteUser, name: 'smazání uživatele' },
    { relatedTo: RightsCategoryEnum.users, tag: RightsTag.updateUsersInformation, name: 'aktualizace uživatelských informací', description: 'Aktualizace jména, příjmení a fotografie?' },
    { relatedTo: RightsCategoryEnum.users, tag: RightsTag.settingRights, name: 'nastavování práv uživatelů' },
    { relatedTo: RightsCategoryEnum.rights, tag: RightsTag.setRights, name: 'tvorba práv' },
    { relatedTo: RightsCategoryEnum.units, tag: RightsTag.createUnits, name: 'tvorba jednotek' },
    { relatedTo: RightsCategoryEnum.units, tag: RightsTag.editUnits, name: 'úprava jednotek' },
    { relatedTo: RightsCategoryEnum.units, tag: RightsTag.deleteUnits, name: 'mazání jednotek' },
    { relatedTo: RightsCategoryEnum.units, tag: RightsTag.addManagerToUnits, name: 'přidávání manažerů jednotkám' },
    { relatedTo: RightsCategoryEnum.units, tag: RightsTag.removeManagerFromUnits, name: 'odebírání manažerů z jednotek' },
];
//# sourceMappingURL=rights.list.js.map