import { Routes } from "@angular/router";
import { ContactPageComponent } from "./pages/contact-list/contact-list.component";
export const routes: Routes = [

  {
    path: "contacts",
    component: ContactPageComponent,
  },


  { path: "**", redirectTo: "contacts" },
];
