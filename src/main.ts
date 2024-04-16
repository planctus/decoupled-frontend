import { enableProdMode, APP_INITIALIZER, importProvidersFrom } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { preInitApp } from "@eui/core";

import { environment } from "./environments/environment";
import { AppComponent } from "./app/app.component";
import { withInterceptorsFromDi, provideHttpClient } from "@angular/common/http";
import { AppRoutingModule } from "./app/app-routing.module";
import { CoreModule } from "./app/core/core.module";
import { provideAnimations } from "@angular/platform-browser/animations";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { InMemoryCache } from "@apollo/client/core";
import { HttpLink } from "apollo-angular/http";
import { APOLLO_OPTIONS, ApolloModule } from "apollo-angular";
import { AppStarterService } from "./app/app-starter.service";

if (environment.production) {
    enableProdMode();
}

preInitApp(environment).then(() =>
    bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, CoreModule, AppRoutingModule, ApolloModule),
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
                        uri: environment.graphqlUri,
                        withCredentials: true,
                    }),
                };
            },
            deps: [HttpLink],
        },
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
    ]
})
        .catch((err) => console.error(err))
);

declare global {
    interface Window {
        global: Window;
    }
}
window.global = window;
