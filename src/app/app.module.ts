import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './components/users/users.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ContainerComponent } from './container/container.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SessionsComponent } from './components/sessions/sessions.component';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    TrackingComponent,
    NavigationComponent,
    ContainerComponent,
    SessionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
  providers: [MatNativeDateModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
