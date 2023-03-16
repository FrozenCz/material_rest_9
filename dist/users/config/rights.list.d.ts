import { CreateRightsDto } from "../dto/create-rights.dto";
export declare enum RightsCategoryEnum {
    categories = "categories",
    assets = "assets",
    locations = "locations",
    rights = "rights",
    units = "units",
    users = "users"
}
export declare enum RightsTag {
    createCategory = "createCategory",
    deleteCategory = "deleteCategory",
    updateCategory = "updateCategory",
    createLocation = "createLocation",
    deleteLocation = "deleteLocation",
    updateLocation = "updateLocation",
    createAssets = "createAssets",
    removeAssets = "removeAssets",
    changeAssetsUser = "changeAssetsUser",
    changeAssetsInformation = "changeAssetsInformation",
    getUser = "getUser",
    createUser = "createUser",
    deleteUser = "deleteUser",
    updateUsersInformation = "updateUsersInformation",
    settingRights = "settingRights",
    setRights = "setRights",
    createUnits = "createUnits",
    editUnits = "editUnits",
    deleteUnits = "deleteUnits",
    addManagerToUnits = "addManagerToUnits",
    removeManagerFromUnits = "removeManagerFromUnits"
}
export declare const RightsList: CreateRightsDto[];
