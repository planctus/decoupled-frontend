import { bootstrapApplication } from '@angular/platform-browser';
import { ServerAppComponent } from './app/serverAppComponent';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(ServerAppComponent, config);

export default bootstrap;

