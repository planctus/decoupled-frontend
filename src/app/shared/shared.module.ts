import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { EclAllModule } from '@eui/ecl';
import { ParagraphOeBannerComponent } from './components/paragraph-oe-banner/paragraph-oe-banner.component';
import { ParagraphOeAccordionComponent } from './components/paragraph-oe-accordion/paragraph-oe-accordion.component';
import { ParagraphOeRichTextComponent } from './components/paragraph-oe-rich-text/paragraph-oe-rich-text.component';
import { BlockquoteComponent } from './components/blockquote/blockquote.component';
import { FeaturedItemComponent } from './components/featured-item/featured-item.component';

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
        BlockquoteComponent,
        FeaturedItemComponent
    ],
    exports: [
        ...MODULES,
        ParagraphOeAccordionComponent,
        ParagraphOeBannerComponent,
        ParagraphOeRichTextComponent,
        BlockquoteComponent,
        FeaturedItemComponent
    ],
})
export class SharedModule {}
