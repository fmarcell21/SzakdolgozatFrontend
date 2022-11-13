import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';

import { DetailsComponent } from './details/details.component';

import { MoviedetailComponent } from './moviedetail/moviedetail.component';
import { TvdetailComponent } from './tvdetail/tvdetail.component';
import { ModalComponent } from './modal/modal.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EpisodecountComponent } from './episodecount/episodecount.component';
import { TopComponent } from './top/top.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {NgxPaginationModule} from 'ngx-pagination';
import { ProfileComponent } from './profile/profile.component'

import { FormsModule } from '@angular/forms';

import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { TvListComponent } from './tv-list/tv-list.component';
import { PersondetailComponent } from './persondetail/persondetail.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { JwtInterceptor } from './jwtInterceptor';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

//import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent, 
    HomeComponent, MoviedetailComponent, TvdetailComponent,
    DetailsComponent,
    ModalComponent,
    LoginComponent,
    RegisterComponent,
    EpisodecountComponent,
    TopComponent,
    ProfileComponent,
    CanvasJSChart,
    SearchResultComponent,
    MovieListComponent,
    TvListComponent,
    PersondetailComponent,
    AdvancedSearchComponent,
    ConfirmationModalComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule
    
    
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
