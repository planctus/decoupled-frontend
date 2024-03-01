import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { EclAllModule } from '@eui/ecl';
import { BannerComponent } from './components/banner/banner.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { ParagraphOeRichTextComponent } from './components/paragraph-oe-rich-text/paragraph-oe-rich-text.component';
import { ParagraphOeQuoteComponent } from './components/paragraph-oe-quote/paragraph-oe-quote.component';
import { FeaturedComponent } from './components/featured/featured.component';

const MODULES = [
    RouterModule,
    EclAllModule,
    TranslateModule,
    CommonModule,
];
@NgModule({
    imports: [...MODULES],
    declarations: [
        AccordionComponent,
        BannerComponent,
        ParagraphOeRichTextComponent,
        ParagraphOeQuoteComponent,
        FeaturedComponent
    ],
    exports: [
        ...MODULES,
        AccordionComponent,
        BannerComponent,
        ParagraphOeRichTextComponent,
        ParagraphOeQuoteComponent,
        FeaturedComponent
    ],
})
export class SharedModule {}
