import { addressController } from "../controller/addressController"

export const Routes = [{
    method: "get",
    route: "/address",
    controller: addressController,
    action: "all"
}, {
    method: "get",
    route: "/address/:id",
    controller: addressController,
    action: "one"
}, {
    method: "post",
    route: "/address",
    controller: addressController,
    action: "save"
}, {
    method: "delete",
    route: "/address/:id",
    controller: addressController,
    action: "remove"
}]