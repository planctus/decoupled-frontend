import { Inject, Injectable } from '@angular/core';
import {
    CONFIG_TOKEN,
    UserService,
    EuiAppConfig,
    UserDetails,
    UserPreferences,
    I18nService,
} from '@eui/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AppStarterService {
    defaultUserPreferences: UserPreferences;

    constructor(
        protected i18nService: I18nService,
        @Inject(CONFIG_TOKEN) private config: EuiAppConfig,
        protected http: HttpClient,
    ) {
    }
}
