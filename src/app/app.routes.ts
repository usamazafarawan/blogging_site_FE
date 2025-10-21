import { Routes } from "@angular/router";
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegistrationUserComponent } from "./pages/register-user-page/register-user-page.component";
import { AdminLayoutComponent } from "./pages/adminModule/admin-layout/admin-layout.component";
import { AdminDashboardComponent } from "./pages/adminModule/admin-dashboard/admin-dashboard.component";
import { AuthGuard } from "./core/services/auth.guard";
import { BlogsListPageComponent } from "./pages/blogs-list/blogs-list.component";
import { AddBlogComponent } from "./pages/adminModule/add-blog/add-blog.component";
import { AdminBlogListComponent } from "./pages/adminModule/admin-blogs-list/admin-blogs-list.component";
import { BlogDetailPageComponent } from "./pages/blog-detail-page/blog-detail-page.component";
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
  path: "blogs-list/:id",
  component: BlogsListPageComponent,
},
{
  path: "blog-details/:id",
  component: BlogDetailPageComponent,
},

  {
    path: "admin",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "dashboard", component: AdminDashboardComponent },
      { path: "add-blog", component: AddBlogComponent },
      { path: "admin-blogs-list", component: AdminBlogListComponent },
      { path: "edit-blog/:id", component: AddBlogComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" }
    ]
  },


  { path: "**", redirectTo: "main-page" },
];
