import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: 'app/pages/home-page/home-page.module#HomePageModule', data: { className: 'homepage' } },
  { path: 'category', loadChildren: 'app/pages/category-page/category-page.module#CategoryPageModule' },
  { path: 'family', loadChildren: 'app/pages/family-page/family-page.module#FamilyPageModule' },
  { path: 'compare', loadChildren: 'app/pages/compare-page/compare-page.module#ComparePageModule' },
  { path: 'login', loadChildren: 'app/pages/account-login/account-login.module#AccountLoginModule' },
  { path: 'register', loadChildren: 'app/pages/registration-page/registration-page.module#RegistrationPageModule' },
  { path: 'wishlist', loadChildren: 'app/pages/wish-list-page/wish-list-page.module#WishlistPageModule' },
  { path: 'error', loadChildren: 'app/pages/error-page/error-page.module#ErrorPageModule', data: { className: 'errorpage' } },
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }