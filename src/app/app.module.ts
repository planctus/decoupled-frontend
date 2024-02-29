import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppStarterService } from './app-starter.service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        AppRoutingModule,
        HttpClientModule, // Import once for both Apollo and other services
        ApolloModule,
    ],
    providers: [
        AppStarterService,
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
            useFactory(httpLink: HttpLink) {
              return {
                cache: new InMemoryCache(),
                link: httpLink.create({
                  uri: 'http://localhost:8080/graphql',
                }),
              };
            },
            deps: [HttpLink],
        },
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {}

