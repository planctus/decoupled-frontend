import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {

    // @ts-ignore
    constructor(private store: Store<any>) {
    }

    ngOnDestroy() {
        console.log('destroying');
    }
}
