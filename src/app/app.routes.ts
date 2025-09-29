import { Routes } from "@angular/router";
import { ContactPageComponent } from "./pages/contact-list/contact-list.component";
import { MainPageComponent } from "./pages/main-page/main-page.component";
export const routes: Routes = [

  {
    path: "main-page",
    component: MainPageComponent,
  },


  { path: "**", redirectTo: "main-page" },
];
