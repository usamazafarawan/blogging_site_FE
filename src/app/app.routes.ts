import { Routes } from "@angular/router";
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegistrationUserComponent } from "./pages/register-user-page/register-user-page.component";
import { AdminLayoutComponent } from "./pages/adminModule/admin-layout/admin-layout.component";
import { AdminDashboardComponent } from "./pages/adminModule/admin-dashboard/admin-dashboard.component";
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

  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      { path: "dashboard", component: AdminDashboardComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" }
    ]
  },


  { path: "**", redirectTo: "main-page" },
];
