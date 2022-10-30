import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { TopComponent } from './top/top.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { TvListComponent } from './tv-list/tv-list.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'details', component: DetailsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'top', component: TopComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'search', component: SearchResultComponent},
  {path: 'movielist', component: MovieListComponent},
  {path: 'tvlist', component: TvListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
