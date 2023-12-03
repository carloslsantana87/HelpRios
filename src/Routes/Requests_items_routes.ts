
import { RequestItemsController } from "../controller/RequestItemsController"

export const Routesi = [{
    method: "get",
    route: "/client",
    controller: RequestItemsController,
    action: "all"
}, {
    method: "get",
    route: "/client/:id",
    controller: RequestItemsController,
    action: "one"
}, {
    method: "post",
    route: "/client",
    controller: RequestItemsController,
    action: "save"
}, {
    method: "delete",
    route: "/client/:id",
    controller: RequestItemsController,
    action: "remove"
}]