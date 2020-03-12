import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CardComponent} from './pages/card/card.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {SignMerchantComponent} from './pages/signup-merchant/signup-merchant.component';
import {DetailComponent} from './pages/product-detail/detail.component';
import {CartComponent} from './pages/cart/cart.component';
import {AuthGuard} from './_guards/auth.guard';
import {OrderComponent} from './pages/order/order.component';
import {OrderDetailComponent} from './pages/order-detail/order-detail.component';
import {UserDetailComponent} from './pages/user-edit/user-detail.component';
import {ProductEditComponent} from './pages/product-edit/product-edit.component';

import {Role} from './enum/Role';
import {ProductsListComponent} from './pages/product-list/products-list.component';


const routes: Routes = [
    {path: '', redirectTo: '/product', pathMatch: 'full'},
    {path: 'products/:id', component: DetailComponent},
    {path: 'category/:id', component: CardComponent},
    {path: 'product', component: CardComponent},
    {path: 'products', component: ProductsListComponent},
    {path: 'category', component: CardComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LoginComponent},
    {path: 'register', component: SignupComponent},
    {path: 'merchant_register', component: SignMerchantComponent},
    {path: 'cart', component: CartComponent},
    {path: 'success', component: SignupComponent},
    {path: 'order/:id', component: OrderDetailComponent, canActivate: [AuthGuard]},
    {path: 'order', component: OrderComponent, canActivate: [AuthGuard]},
    {path: 'seller', redirectTo: 'seller/product', pathMatch: 'full'},
    {
        path: 'seller/product',
        component: ProductsListComponent,
        canActivate: [AuthGuard],
        data: {roles: [Role.Admin, Role.Merchant]}
    },
    {
        path: 'profile',
        component: UserDetailComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'seller/product/:id/edit',
        component: ProductEditComponent,
        canActivate: [AuthGuard],
        data: {roles: [Role.Admin, Role.Merchant]}
    },
    {
        path: 'seller/product/:id/new',
        component: ProductEditComponent,
        canActivate: [AuthGuard],
        data: {roles: [Role.Merchant]}
    },

];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(routes)// {onSameUrlNavigation: 'reload'}
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
