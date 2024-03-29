import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { preInitApp } from "@eui/core";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
    enableProdMode();
}

preInitApp(environment).then(() =>
    platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .catch((err) => console.error(err))
);

declare global {
    interface Window {
        global: Window;
    }
}
window.global = window;
