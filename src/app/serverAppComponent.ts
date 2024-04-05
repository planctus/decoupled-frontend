import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppModule } from './app.module';

@Component({
  selector: 'app-bootstrap-application',
  template: '<div #root></div>',
  standalone: true,
})
export class ServerAppComponent {
}