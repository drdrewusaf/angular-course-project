import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
    declarations: [AuthComponent],
    imports: [
        CommonModule,
        SharedModule,
        AuthRoutingModule,
    ]
})

export class AuthModule {

}