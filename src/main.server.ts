import { bootstrapApplication } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppModule, config);

export default bootstrap;

