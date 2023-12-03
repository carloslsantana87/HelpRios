
import { RequestCliController } from "../controller/RequestCliController"

export const Routes = [{
    method: "get",
    route: "/client",
    controller: RequestCliController,
    action: "all"
}, {
    method: "get",
    route: "/client/:id",
    controller: RequestCliController,
    action: "one"
}, {
    method: "post",
    route: "/client",
    controller: RequestCliController,
    action: "save"
}, {
    method: "delete",
    route: "/client/:id",
    controller: RequestCliController,
    action: "remove"
}]