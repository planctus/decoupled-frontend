import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { EclAllModule } from '@eui/ecl';

const MODULES = [
    RouterModule,
    EclAllModule,
    TranslateModule,
    CommonModule,
];
@NgModule({
    imports: [...MODULES],
    declarations: [],
    exports: [...MODULES],
})
export class SharedModule {}
