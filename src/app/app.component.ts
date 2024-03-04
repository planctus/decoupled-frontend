import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import {
    EclMenuItemSelectEvent,
} from '@eui/ecl';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
    // an array to keep all subscriptions and easily unsubscribe
    subs: Subscription[] = [];

    constructor(
        private store: Store<any>,
    ) {
    }

    ngOnDestroy() {
        this.subs.forEach((s: Subscription) => s.unsubscribe());
    }

    onMenuItemSelected(evt: EclMenuItemSelectEvent) {
        console.log('menu item selected', evt);
    }
}
