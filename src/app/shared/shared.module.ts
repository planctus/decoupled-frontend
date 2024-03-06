import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { EclAllModule } from '@eui/ecl';
import { ParagraphOeBannerComponent } from './components/paragraph-oe-banner/paragraph-oe-banner.component';
import { ParagraphOeAccordionComponent } from './components/paragraph-oe-accordion/paragraph-oe-accordion.component';
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
        ParagraphOeAccordionComponent,
        ParagraphOeBannerComponent,
        ParagraphOeRichTextComponent,
        ParagraphOeQuoteComponent,
        FeaturedComponent
    ],
    exports: [
        ...MODULES,
        ParagraphOeAccordionComponent,
        ParagraphOeBannerComponent,
        ParagraphOeRichTextComponent,
        ParagraphOeQuoteComponent,
        FeaturedComponent
    ],
})
export class SharedModule {}
