import { Routes } from "@angular/router";
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegistrationUserComponent } from "./pages/register-user-page/register-user-page.component";
export const routes: Routes = [

  {
    path: "main-page",
    component: MainPageComponent,
  },

    {
    path: "login",
    component: LoginComponent,
  },

    {
    path: "register",
    component: RegistrationUserComponent,
  },


  { path: "**", redirectTo: "main-page" },
];
