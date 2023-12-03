
import { RequestItemsController } from "../controller/RequestItemsController"

export const Routesi = [{
    method: "get",
    route: "/RequestItem",
    controller: RequestItemsController,
    action: "all"
}, {
    method: "get",
    route: "/RequestItem/:id",
    controller: RequestItemsController,
    action: "one"
}, {
    method: "post",
    route: "/RequestItem",
    controller: RequestItemsController,
    action: "save"
}, {
    method: "delete",
    route: "/RequestItem/:id",
    controller: RequestItemsController,
    action: "remove"
}]