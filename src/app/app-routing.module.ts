import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {'path': '', redirectTo:'companies', pathMatch:'full'},
  {'path':'companies', component:CompanyListComponent},
  {'path':'company/:companyCode', component:CompanyDetailsComponent},
  {'path': 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
