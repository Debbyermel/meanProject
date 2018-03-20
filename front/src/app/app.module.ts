import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // changed for reactive form
import { HttpModule } from '@angular/http';
import {FormsModule} from '@angular/forms';

// Route importation
import { Routes, RouterModule } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserComponent } from './components/user/user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { FeedComponent } from './components/feed/feed.component';


// Services
import { UsersService } from './services/users.service';





// Routes view
const appRoutes: Routes = [
  { path: '', component: HomeComponent }, // Default Route
  { path: 'register', component: RegisterComponent }, // Register Route
  { path: 'login', component: LoginComponent }, // Login  Route
  { path: 'users', component: UsersListComponent }, // List of Ironhackers Route
  { path: 'users/:id', component: UserDetailComponent }, // User Detail ironhacker Route
  { path: 'dashboard', component: UserComponent }, // User Dashboard
  { path: 'feed', component: FeedComponent }, // User Dashboard
  { path: '**', component: HomeComponent } //  Catch-All Route
];


@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserComponent,
    NavbarComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    UserDetailComponent,
    FeedComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
