import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  private basicAuthUsername: string;
  private basicAuthPassword: string;

  constructor() {
    this.basicAuthUsername = environment.basicAuthUsername || '';
    this.basicAuthPassword = environment.basicAuthPassword || '';
  }

  getAuthorizationHeader(): string {
    const authString = `${this.basicAuthUsername}:${this.basicAuthPassword}`;
    const base64AuthString = btoa(authString); // Encode credentials as Base64
    return `Basic ${base64AuthString}`;
  }
}
