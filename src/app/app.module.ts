import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppStarterService } from './app-starter.service';
import { environment } from '../environments/environment';
import { CredentialsService } from './shared/services/credential.service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        AppRoutingModule,
        HttpClientModule,
        ApolloModule,
    ],
    providers: [
        AppStarterService,
        CredentialsService,
        {
            provide: APP_INITIALIZER,
            useFactory: (appStarterService) => () => new Promise<void>((resolve) => {
                    appStarterService.start().subscribe(() => resolve());
                }),
            deps: [AppStarterService],
            multi: true
        },
        {
            provide: APOLLO_OPTIONS,
            useFactory(httpLink: HttpLink, credentialsService: CredentialsService) {
              return {
                cache: new InMemoryCache(),
                link: httpLink.create({
                  uri: environment.graphqlUri,
                  withCredentials: true,
                  headers: new HttpHeaders().set('Authorization', credentialsService.getAuthorizationHeader()),
                }),
              };
            },
            deps: [HttpLink, CredentialsService],
        },
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {}
