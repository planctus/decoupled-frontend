"use strict";exports.id=658,exports.ids=[658],exports.modules={658:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Module:()=>Module});var router=__webpack_require__(6055),core=__webpack_require__(7533),cjs=__webpack_require__(2859);let MockService=(()=>{class MockService2{constructor(){}getHomepageData(){return(0,cjs.of)({data:{content:{id:"1",entityRevisionId:"22",nid:1,title:"Homepage",moderationState:"published",status:!0,paragraphs:[{__typename:"ParagraphOeBanner",id:"1",fieldOeBannerSize:"m",fieldOeBannerFullWidth:!0,fieldOeBannerAlignment:"center",oeParagraphsVariant:"plain-background",fieldOeTitle:"Headline sed elit lorem. Donec dictum.",fieldOeText:"Pellentesque tempor tincidunt quam, finibus vulputate eros iaculis pharetra orci arcu, dictum maximus arcu pellentesque eget. Cras massa nunc.",credit:"\xa9 Copyright or credit",fieldOeMedia:{mediaFileUrl:"https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg",mediaFileAlt:"alt of image"},fieldOeLink:{title:"Subscribe",uri:"/"}},{__typename:"ParagraphOeRichText",fieldOeTextLong:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a varius justo, sed accumsan turpis. Aenean ac vehicula felis. Nam porta elit blandit, consequat erat accumsan, ullamcorper ex. Nam sem ligula, cursus eget imperdiet facilisis, egestas gravida quam. Vivamus nec aliquam odio. Etiam sed est in nulla commodo tincidunt at sed nisl. Vestibulum vitae turpis rutrum, commodo quam ut, tempus ante. Nunc eget nibh eu elit volutpat dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in felis congue, volutpat urna et, feugiat leo. In non nisi condimentum, mattis eros sit amet, pretium eros.</p>\n                <p>Phasellus maximus metus metus, vel ornare nisl molestie ut. Suspendisse potenti. Aenean non augue turpis. Sed ultrices felis nec ex dapibus, a sollicitudin sem egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur enim neque, consequat in eros at, maximus posuere arcu. Duis efficitur sem enim, ac sollicitudin neque scelerisque at.</p>\n                <p>Fusce vel lectus volutpat, lobortis sapien et, bibendum sem. Nullam suscipit interdum feugiat. Integer vitae urna pretium, feugiat sapien non, ullamcorper diam. Fusce lorem quam, imperdiet at ex id, auctor finibus risus. Suspendisse diam mi, ornare id auctor ullamcorper, congue tempor ligula. Suspendisse tincidunt lobortis metus vitae scelerisque. Nullam dapibus congue leo. Fusce vel velit eget lorem laoreet imperdiet.</p>"},{__typename:"ParagraphOeQuote",fieldOePlainTextLong:"Fusce convallis metus id felis luctus adipiscing. Vivamus consectetuer hendrerit lacus. Phasellus blandit leo ut odio. Aenean commodo ligula eget dolor. Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus.",fieldOeText:"John Smith",imageAlt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit",imageUrl:"https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"},{__typename:"ParagraphOeAccordion",id:"1",fieldOeParagraphs:[{id:"4",fieldOeText:"Lorem Ipsum accordion Item",fieldOeTextLong:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a varius justo, sed accumsan turpis. Aenean ac vehicula felis. Nam porta elit blandit, consequat erat accumsan, ullamcorper ex. Nam sem ligula, cursus eget imperdiet facilisis, egestas gravida quam. Vivamus nec aliquam odio. Etiam sed est in nulla commodo tincidunt at sed nisl. Vestibulum vitae turpis rutrum, commodo quam ut, tempus ante. Nunc eget nibh eu elit volutpat dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in felis congue, volutpat urna et, feugiat leo. In non nisi condimentum, mattis eros sit amet, pretium eros.</p>\n                  <p>Phasellus maximus metus metus, vel ornare nisl molestie ut. Suspendisse potenti. Aenean non augue turpis. Sed ultrices felis nec ex dapibus, a sollicitudin sem egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur enim neque, consequat in eros at, maximus posuere arcu. Duis efficitur sem enim, ac sollicitudin neque scelerisque at.</p>\n                  <p>Fusce vel lectus volutpat, lobortis sapien et, bibendum sem. Nullam suscipit interdum feugiat. Integer vitae urna pretium, feugiat sapien non, ullamcorper diam. Fusce lorem quam, imperdiet at ex id, auctor finibus risus. Suspendisse diam mi, ornare id auctor ullamcorper, congue tempor ligula. Suspendisse tincidunt lobortis metus vitae scelerisque. Nullam dapibus congue leo. Fusce vel velit eget lorem laoreet imperdiet.</p>",fieldOeIcon:"arrow-down"},{id:"5",fieldOeText:"Lorem Ipsum accordion Item",fieldOeTextLong:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a varius justo, sed accumsan turpis. Aenean ac vehicula felis. Nam porta elit blandit, consequat erat accumsan, ullamcorper ex. Nam sem ligula, cursus eget imperdiet facilisis, egestas gravida quam. Vivamus nec aliquam odio. Etiam sed est in nulla commodo tincidunt at sed nisl. Vestibulum vitae turpis rutrum, commodo quam ut, tempus ante. Nunc eget nibh eu elit volutpat dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in felis congue, volutpat urna et, feugiat leo. In non nisi condimentum, mattis eros sit amet, pretium eros.</p>\n                  <p>Phasellus maximus metus metus, vel ornare nisl molestie ut. Suspendisse potenti. Aenean non augue turpis. Sed ultrices felis nec ex dapibus, a sollicitudin sem egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur enim neque, consequat in eros at, maximus posuere arcu. Duis efficitur sem enim, ac sollicitudin neque scelerisque at.</p>\n                  <p>Fusce vel lectus volutpat, lobortis sapien et, bibendum sem. Nullam suscipit interdum feugiat. Integer vitae urna pretium, feugiat sapien non, ullamcorper diam. Fusce lorem quam, imperdiet at ex id, auctor finibus risus. Suspendisse diam mi, ornare id auctor ullamcorper, congue tempor ligula. Suspendisse tincidunt lobortis metus vitae scelerisque. Nullam dapibus congue leo. Fusce vel velit eget lorem laoreet imperdiet.</p>",fieldOeIcon:"arrow-down"},{id:"6",fieldOeText:"Lorem Ipsum accordion Item",fieldOeTextLong:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a varius justo, sed accumsan turpis. Aenean ac vehicula felis. Nam porta elit blandit, consequat erat accumsan, ullamcorper ex. Nam sem ligula, cursus eget imperdiet facilisis, egestas gravida quam. Vivamus nec aliquam odio. Etiam sed est in nulla commodo tincidunt at sed nisl. Vestibulum vitae turpis rutrum, commodo quam ut, tempus ante. Nunc eget nibh eu elit volutpat dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in felis congue, volutpat urna et, feugiat leo. In non nisi condimentum, mattis eros sit amet, pretium eros.</p>\n                  <p>Phasellus maximus metus metus, vel ornare nisl molestie ut. Suspendisse potenti. Aenean non augue turpis. Sed ultrices felis nec ex dapibus, a sollicitudin sem egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur enim neque, consequat in eros at, maximus posuere arcu. Duis efficitur sem enim, ac sollicitudin neque scelerisque at.</p>\n                  <p>Fusce vel lectus volutpat, lobortis sapien et, bibendum sem. Nullam suscipit interdum feugiat. Integer vitae urna pretium, feugiat sapien non, ullamcorper diam. Fusce lorem quam, imperdiet at ex id, auctor finibus risus. Suspendisse diam mi, ornare id auctor ullamcorper, congue tempor ligula. Suspendisse tincidunt lobortis metus vitae scelerisque. Nullam dapibus congue leo. Fusce vel velit eget lorem laoreet imperdiet.</p>",fieldOeIcon:"arrow-down"}]},{__typename:"featured",title:"Lorem Ipsum accordion Item",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",imageUrl:"https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg",imageCaption:"Lorem ipsum dolor sit amet, consectetur adipiscing elit",imageAlt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit",alignment:"left",isExtended:!0}]}}})}getShowcaseData(){return(0,cjs.of)({data:{content:{id:"1",entityRevisionId:"22",nid:1,title:"Homepage",moderationState:"published",status:!0,paragraphs:[{__typename:"ParagraphOeBanner",id:"1",fieldOeBannerSize:"m",fieldOeBannerFullWidth:!0,oeParagraphsVariant:"text-box",fieldOeTitle:"Headline sed elit lorem. Donec dictum.",fieldOeText:"Pellentesque tempor tincidunt quam, finibus vulputate eros iaculis pharetra orci arcu, dictum maximus arcu pellentesque eget. Cras massa nunc.",credit:"\xa9 Copyright or credit",fieldOeMedia:{mediaFileUrl:"https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg",mediaFileAlt:"alt of image"},fieldOeLink:{title:"Subscribe",uri:"/"}},{__typename:"ParagraphOeBanner",id:"1",fieldOeBannerSize:"m",fieldOeBannerFullWidth:!0,oeParagraphsVariant:"image-overlay",fieldOeTitle:"Headline sed elit lorem. Donec dictum.",fieldOeText:"Pellentesque tempor tincidunt quam, finibus vulputate eros iaculis pharetra orci arcu, dictum maximus arcu pellentesque eget. Cras massa nunc.",credit:"\xa9 Copyright or credit",fieldOeMedia:{mediaFileUrl:"https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg",mediaFileAlt:"alt of image"},fieldOeLink:{title:"Subscribe",uri:"/"}},{__typename:"ParagraphOeBanner",id:"1",fieldOeBannerSize:"m",fieldOeBannerFullWidth:!0,oeParagraphsVariant:"text-highlight",fieldOeTitle:"Headline sed elit lorem. Donec dictum.",fieldOeText:"Pellentesque tempor tincidunt quam, finibus vulputate eros iaculis pharetra orci arcu, dictum maximus arcu pellentesque eget. Cras massa nunc.",credit:"\xa9 Copyright or credit",fieldOeMedia:{mediaFileUrl:"https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg",mediaFileAlt:"alt of image"},fieldOeLink:{title:"Subscribe",uri:"/"}},{__typename:"ParagraphOeBanner",id:"1",fieldOeBannerSize:"m",fieldOeBannerFullWidth:!0,oeParagraphsVariant:"plain-background",fieldOeTitle:"Headline sed elit lorem. Donec dictum.",fieldOeText:"Pellentesque tempor tincidunt quam, finibus vulputate eros iaculis pharetra orci arcu, dictum maximus arcu pellentesque eget. Cras massa nunc.",credit:"\xa9 Copyright or credit",fieldOeMedia:{mediaFileUrl:"https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg",mediaFileAlt:"alt of image"},fieldOeLink:{title:"Subscribe",uri:"/"}},{__typename:"ParagraphOeBanner",id:"1",fieldOeBannerSize:"m",fieldOeBannerFullWidth:!0,fieldOeBannerAlignment:"center",oeParagraphsVariant:"plain-background",fieldOeTitle:"Headline sed elit lorem. Donec dictum.",fieldOeText:"Pellentesque tempor tincidunt quam, finibus vulputate eros iaculis pharetra orci arcu, dictum maximus arcu pellentesque eget. Cras massa nunc.",credit:"\xa9 Copyright or credit",fieldOeMedia:{mediaFileUrl:"https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg",mediaFileAlt:"alt of image"},fieldOeLink:{title:"Subscribe",uri:"/"}},{__typename:"ParagraphOeRichText",fieldOeTextLong:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a varius justo, sed accumsan turpis. Aenean ac vehicula felis. Nam porta elit blandit, consequat erat accumsan, ullamcorper ex. Nam sem ligula, cursus eget imperdiet facilisis, egestas gravida quam. Vivamus nec aliquam odio. Etiam sed est in nulla commodo tincidunt at sed nisl. Vestibulum vitae turpis rutrum, commodo quam ut, tempus ante. Nunc eget nibh eu elit volutpat dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in felis congue, volutpat urna et, feugiat leo. In non nisi condimentum, mattis eros sit amet, pretium eros.</p>\n                <p>Phasellus maximus metus metus, vel ornare nisl molestie ut. Suspendisse potenti. Aenean non augue turpis. Sed ultrices felis nec ex dapibus, a sollicitudin sem egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur enim neque, consequat in eros at, maximus posuere arcu. Duis efficitur sem enim, ac sollicitudin neque scelerisque at.</p>\n                <p>Fusce vel lectus volutpat, lobortis sapien et, bibendum sem. Nullam suscipit interdum feugiat. Integer vitae urna pretium, feugiat sapien non, ullamcorper diam. Fusce lorem quam, imperdiet at ex id, auctor finibus risus. Suspendisse diam mi, ornare id auctor ullamcorper, congue tempor ligula. Suspendisse tincidunt lobortis metus vitae scelerisque. Nullam dapibus congue leo. Fusce vel velit eget lorem laoreet imperdiet.</p>"},{__typename:"ParagraphOeQuote",fieldOePlainTextLong:"Fusce convallis metus id felis luctus adipiscing. Vivamus consectetuer hendrerit lacus. Phasellus blandit leo ut odio. Aenean commodo ligula eget dolor. Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus.",fieldOeText:"John Smith"},{__typename:"ParagraphOeQuote",fieldOePlainTextLong:"Fusce convallis metus id felis luctus adipiscing. Vivamus consectetuer hendrerit lacus. Phasellus blandit leo ut odio. Aenean commodo ligula eget dolor. Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus.",fieldOeText:"John Smith",imageAlt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit",imageUrl:"https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg"},{__typename:"ParagraphOeAccordion",id:"1",fieldOeParagraphs:[{id:"4",fieldOeText:"Lorem Ipsum accordion Item",fieldOeTextLong:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a varius justo, sed accumsan turpis. Aenean ac vehicula felis. Nam porta elit blandit, consequat erat accumsan, ullamcorper ex. Nam sem ligula, cursus eget imperdiet facilisis, egestas gravida quam. Vivamus nec aliquam odio. Etiam sed est in nulla commodo tincidunt at sed nisl. Vestibulum vitae turpis rutrum, commodo quam ut, tempus ante. Nunc eget nibh eu elit volutpat dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in felis congue, volutpat urna et, feugiat leo. In non nisi condimentum, mattis eros sit amet, pretium eros.</p>\n                  <p>Phasellus maximus metus metus, vel ornare nisl molestie ut. Suspendisse potenti. Aenean non augue turpis. Sed ultrices felis nec ex dapibus, a sollicitudin sem egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur enim neque, consequat in eros at, maximus posuere arcu. Duis efficitur sem enim, ac sollicitudin neque scelerisque at.</p>\n                  <p>Fusce vel lectus volutpat, lobortis sapien et, bibendum sem. Nullam suscipit interdum feugiat. Integer vitae urna pretium, feugiat sapien non, ullamcorper diam. Fusce lorem quam, imperdiet at ex id, auctor finibus risus. Suspendisse diam mi, ornare id auctor ullamcorper, congue tempor ligula. Suspendisse tincidunt lobortis metus vitae scelerisque. Nullam dapibus congue leo. Fusce vel velit eget lorem laoreet imperdiet.</p>",fieldOeIcon:"arrow-down"},{id:"5",fieldOeText:"Lorem Ipsum accordion Item",fieldOeTextLong:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a varius justo, sed accumsan turpis. Aenean ac vehicula felis. Nam porta elit blandit, consequat erat accumsan, ullamcorper ex. Nam sem ligula, cursus eget imperdiet facilisis, egestas gravida quam. Vivamus nec aliquam odio. Etiam sed est in nulla commodo tincidunt at sed nisl. Vestibulum vitae turpis rutrum, commodo quam ut, tempus ante. Nunc eget nibh eu elit volutpat dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in felis congue, volutpat urna et, feugiat leo. In non nisi condimentum, mattis eros sit amet, pretium eros.</p>\n                  <p>Phasellus maximus metus metus, vel ornare nisl molestie ut. Suspendisse potenti. Aenean non augue turpis. Sed ultrices felis nec ex dapibus, a sollicitudin sem egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur enim neque, consequat in eros at, maximus posuere arcu. Duis efficitur sem enim, ac sollicitudin neque scelerisque at.</p>\n                  <p>Fusce vel lectus volutpat, lobortis sapien et, bibendum sem. Nullam suscipit interdum feugiat. Integer vitae urna pretium, feugiat sapien non, ullamcorper diam. Fusce lorem quam, imperdiet at ex id, auctor finibus risus. Suspendisse diam mi, ornare id auctor ullamcorper, congue tempor ligula. Suspendisse tincidunt lobortis metus vitae scelerisque. Nullam dapibus congue leo. Fusce vel velit eget lorem laoreet imperdiet.</p>",fieldOeIcon:"arrow-down"},{id:"6",fieldOeText:"Lorem Ipsum accordion Item",fieldOeTextLong:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a varius justo, sed accumsan turpis. Aenean ac vehicula felis. Nam porta elit blandit, consequat erat accumsan, ullamcorper ex. Nam sem ligula, cursus eget imperdiet facilisis, egestas gravida quam. Vivamus nec aliquam odio. Etiam sed est in nulla commodo tincidunt at sed nisl. Vestibulum vitae turpis rutrum, commodo quam ut, tempus ante. Nunc eget nibh eu elit volutpat dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in felis congue, volutpat urna et, feugiat leo. In non nisi condimentum, mattis eros sit amet, pretium eros.</p>\n                  <p>Phasellus maximus metus metus, vel ornare nisl molestie ut. Suspendisse potenti. Aenean non augue turpis. Sed ultrices felis nec ex dapibus, a sollicitudin sem egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur enim neque, consequat in eros at, maximus posuere arcu. Duis efficitur sem enim, ac sollicitudin neque scelerisque at.</p>\n                  <p>Fusce vel lectus volutpat, lobortis sapien et, bibendum sem. Nullam suscipit interdum feugiat. Integer vitae urna pretium, feugiat sapien non, ullamcorper diam. Fusce lorem quam, imperdiet at ex id, auctor finibus risus. Suspendisse diam mi, ornare id auctor ullamcorper, congue tempor ligula. Suspendisse tincidunt lobortis metus vitae scelerisque. Nullam dapibus congue leo. Fusce vel velit eget lorem laoreet imperdiet.</p>",fieldOeIcon:"arrow-down"}]},{__typename:"featured",title:"Lorem Ipsum accordion Item",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",imageUrl:"https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg",imageCaption:"Lorem ipsum dolor sit amet, consectetur adipiscing elit",imageAlt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit",alignment:"left"},{__typename:"featured",title:"Lorem Ipsum accordion Item",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",imageUrl:"https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg",imageCaption:"Lorem ipsum dolor sit amet, consectetur adipiscing elit",imageAlt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit",alignment:"right"},{__typename:"featured",title:"Lorem Ipsum accordion Item",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",imageUrl:"https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg",imageCaption:"Lorem ipsum dolor sit amet, consectetur adipiscing elit",imageAlt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit",alignment:"right",isExtended:!0},{__typename:"featured",title:"Lorem Ipsum accordion Item",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",imageUrl:"https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg",imageCaption:"Lorem ipsum dolor sit amet, consectetur adipiscing elit",imageAlt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit",alignment:"left",isExtended:!0}]}}})}static#_=this.\u0275fac=function(t){return new(t||MockService2)};static#_2=this.\u0275prov=core.Yz7({token:MockService2,factory:MockService2.\u0275fac,providedIn:"root"})}return MockService2})();var common=__webpack_require__(4565),eui_ecl=__webpack_require__(2320);function ParagraphOeAccordionComponent_ecl_accordion_item_1_Template(rf,ctx){if(1&rf&&(core.TgZ(0,"ecl-accordion-item",1),core._UZ(1,"div",2),core.qZA()),2&rf){const item_r1=ctx.$implicit;core.s9C("label",item_r1.fieldOeText),core.xp6(1),core.Q6J("innerHTML",item_r1.fieldOeTextLong,core.oJD)}}let ParagraphOeAccordionComponent=(()=>{class ParagraphOeAccordionComponent2{static#_=this.\u0275fac=function(t){return new(t||ParagraphOeAccordionComponent2)};static#_2=this.\u0275cmp=core.Xpm({type:ParagraphOeAccordionComponent2,selectors:[["app-ecl-paragraph-oe-accordion"]],inputs:{fieldOeParagraphs:"fieldOeParagraphs"},decls:2,vars:1,consts:[[3,"label",4,"ngFor","ngForOf"],[3,"label"],[3,"innerHTML"]],template:function(rf,ctx){1&rf&&(core.TgZ(0,"ecl-accordion"),core.YNc(1,ParagraphOeAccordionComponent_ecl_accordion_item_1_Template,2,2,"ecl-accordion-item",0),core.qZA()),2&rf&&(core.xp6(1),core.Q6J("ngForOf",ctx.fieldOeParagraphs))},dependencies:[eui_ecl.ZKE,eui_ecl.fc8,common.sg],encapsulation:2})}return ParagraphOeAccordionComponent2})();function ParagraphOeBannerComponent_picture_1_Template(rf,ctx){if(1&rf&&(core.TgZ(0,"picture",9),core._UZ(1,"img",10),core.qZA()),2&rf){const ctx_r0=core.oxw();core.xp6(1),core.s9C("src",ctx_r0.fieldOeMedia.mediaFileUrl,core.LSH),core.s9C("alt",ctx_r0.fieldOeMedia.mediaFileAlt)}}function ParagraphOeBannerComponent_div_2_Template(rf,ctx){if(1&rf&&(core.TgZ(0,"div",11)(1,"span",12),core._uU(2),core.qZA()()),2&rf){const ctx_r1=core.oxw();core.xp6(2),core.Oqu(ctx_r1.fieldOeTitle)}}function ParagraphOeBannerComponent_div_3_Template(rf,ctx){if(1&rf&&(core.TgZ(0,"div",13),core._uU(1),core.qZA()),2&rf){const ctx_r2=core.oxw();core.xp6(1),core.Oqu(ctx_r2.credit)}}let ParagraphOeBannerComponent=(()=>{class ParagraphOeBannerComponent2{static#_=this.\u0275fac=function(t){return new(t||ParagraphOeBannerComponent2)};static#_2=this.\u0275cmp=core.Xpm({type:ParagraphOeBannerComponent2,selectors:[["app-ecl-paragraph-oe-banner"]],inputs:{fieldOeMedia:"fieldOeMedia",fieldOeTitle:"fieldOeTitle",fieldOeText:"fieldOeText",credit:"credit",oeParagraphsVariant:"oeParagraphsVariant",fieldOeBannerAlignment:"fieldOeBannerAlignment",fieldOeBannerFullWidth:"fieldOeBannerFullWidth",fieldOeLink:"fieldOeLink"},decls:11,vars:10,consts:[[3,"variant","isCentered"],["eclBannerPicture","",4,"ngIf"],["eclBannerTitle","",4,"ngIf"],["eclBannerCredit","",4,"ngIf"],["eclBannerDescription",""],["eclBannerDescriptionText",""],["eclLink","","variant","cta",3,"routerLink"],["eclLinkLabel",""],["icon","corner-arrow","transform","rotate-90"],["eclBannerPicture",""],["eclBannerImage","",3,"src","alt"],["eclBannerTitle",""],["eclBannerTitleText",""],["eclBannerCredit",""]],template:function(rf,ctx){1&rf&&(core.TgZ(0,"ecl-banner",0),core.YNc(1,ParagraphOeBannerComponent_picture_1_Template,2,2,"picture",1)(2,ParagraphOeBannerComponent_div_2_Template,3,1,"div",2)(3,ParagraphOeBannerComponent_div_3_Template,2,1,"div",3),core.TgZ(4,"p",4)(5,"span",5),core._uU(6),core.qZA()(),core.TgZ(7,"a",6)(8,"span",7),core._uU(9),core.qZA(),core._UZ(10,"ecl-icon",8),core.qZA()()),2&rf&&(core.ekj("full-width",ctx.fieldOeBannerFullWidth),core.s9C("isCentered","center"===ctx.fieldOeBannerAlignment),core.Q6J("variant",ctx.oeParagraphsVariant),core.xp6(1),core.Q6J("ngIf",ctx.fieldOeMedia&&"plain-background"!==ctx.oeParagraphsVariant),core.xp6(1),core.Q6J("ngIf",ctx.fieldOeTitle),core.xp6(1),core.Q6J("ngIf",ctx.credit),core.xp6(3),core.Oqu(ctx.fieldOeText),core.xp6(1),core.s9C("routerLink",ctx.fieldOeLink.uri),core.xp6(2),core.Oqu(ctx.fieldOeLink.title))},dependencies:[router.rH,eui_ecl.L$U,eui_ecl.SJV,eui_ecl.me_,eui_ecl.yTK,eui_ecl.$28,eui_ecl.xSA,eui_ecl.YXZ,eui_ecl.JCL,eui_ecl.nss,eui_ecl.Ol2,eui_ecl.gsU,common.O5],encapsulation:2})}return ParagraphOeBannerComponent2})(),ParagraphOeRichTextComponent=(()=>{class ParagraphOeRichTextComponent2{static#_=this.\u0275fac=function(t){return new(t||ParagraphOeRichTextComponent2)};static#_2=this.\u0275cmp=core.Xpm({type:ParagraphOeRichTextComponent2,selectors:[["app-ecl-paragraph-oe-rich-text"]],inputs:{fieldOeTextLong:"fieldOeTextLong"},decls:1,vars:1,consts:[[1,"ecl-u-type-prolonged-l",3,"innerHTML"]],template:function(rf,ctx){1&rf&&core._UZ(0,"div",0),2&rf&&core.Q6J("innerHTML",ctx.fieldOeTextLong,core.oJD)},encapsulation:2})}return ParagraphOeRichTextComponent2})();function BlockquoteComponent_picture_2_Template(rf,ctx){if(1&rf&&(core.TgZ(0,"picture",2),core._UZ(1,"img",3),core.qZA()),2&rf){const ctx_r0=core.oxw();core.xp6(1),core.Q6J("src",ctx_r0.imageUrl,core.LSH)("alt",ctx_r0.imageAlt)}}let BlockquoteComponent=(()=>{class BlockquoteComponent2{static#_=this.\u0275fac=function(t){return new(t||BlockquoteComponent2)};static#_2=this.\u0275cmp=core.Xpm({type:BlockquoteComponent2,selectors:[["app-ecl-blockquote"]],inputs:{fieldOePlainTextLong:"fieldOePlainTextLong",fieldOeText:"fieldOeText",imageUrl:"imageUrl",imageAlt:"imageAlt"},decls:3,vars:3,consts:[["eclBlockquote","",3,"author"],["eclBlockquotePicture","",4,"ngIf"],["eclBlockquotePicture",""],["eclBlockquoteImage","",3,"src","alt"]],template:function(rf,ctx){1&rf&&(core.TgZ(0,"figure",0),core._uU(1),core.YNc(2,BlockquoteComponent_picture_2_Template,2,2,"picture",1),core.qZA()),2&rf&&(core.s9C("author",ctx.fieldOeText),core.xp6(1),core.hij(" ",ctx.fieldOePlainTextLong," "),core.xp6(1),core.Q6J("ngIf",ctx.imageUrl))},dependencies:[eui_ecl.$3q,eui_ecl.sgq,eui_ecl.Yqr,common.O5],encapsulation:2})}return BlockquoteComponent2})(),FeaturedItemComponent=(()=>{class FeaturedItemComponent2{constructor(){this.isExtended=!1}static#_=this.\u0275fac=function(t){return new(t||FeaturedItemComponent2)};static#_2=this.\u0275cmp=core.Xpm({type:FeaturedItemComponent2,selectors:[["app-ecl-featured-item"]],inputs:{isExtended:"isExtended",imageUrl:"imageUrl",imageAlt:"imageAlt",imageCaption:"imageCaption",description:"description",title:"title",alignment:"alignment"},decls:8,vars:7,consts:[[3,"isExtended","position"],["eclMediaContainerItem","",3,"src","alt"],[3,"eclTitle"]],template:function(rf,ctx){1&rf&&(core.TgZ(0,"ecl-featured",0)(1,"ecl-featured-item")(2,"ecl-media-container"),core._UZ(3,"img",1),core._uU(4),core.qZA()(),core.TgZ(5,"ecl-featured-item",2)(6,"ecl-featured-item-description"),core._uU(7),core.qZA()()()),2&rf&&(core.Q6J("isExtended",ctx.isExtended)("position",ctx.alignment),core.xp6(3),core.s9C("src",ctx.imageUrl,core.LSH),core.s9C("alt",ctx.imageAlt),core.xp6(1),core.hij(" ",ctx.imageCaption," "),core.xp6(1),core.s9C("eclTitle",ctx.title),core.xp6(2),core.Oqu(ctx.description))},dependencies:[eui_ecl.K5Z,eui_ecl.qIL,eui_ecl.QMf,eui_ecl.$uN,eui_ecl.YhG],encapsulation:2})}return FeaturedItemComponent2})();function HomepageComponent_div_0_div_1_ng_container_1_Template(rf,ctx){if(1&rf&&(core.ynx(0),core._UZ(1,"app-ecl-paragraph-oe-rich-text",3),core.BQk()),2&rf){const paragraph_r2=core.oxw().$implicit;core.xp6(1),core.Q6J("fieldOeTextLong",paragraph_r2.fieldOeTextLong)}}function HomepageComponent_div_0_div_1_ng_container_2_Template(rf,ctx){if(1&rf&&(core.ynx(0),core._UZ(1,"app-ecl-blockquote",4),core.BQk()),2&rf){const paragraph_r2=core.oxw().$implicit;core.xp6(1),core.Q6J("fieldOePlainTextLong",paragraph_r2.fieldOePlainTextLong)("fieldOeText",paragraph_r2.fieldOeText)("imageUrl",paragraph_r2.imageUrl)("imageAlt",paragraph_r2.imageAlt)}}function HomepageComponent_div_0_div_1_ng_container_3_Template(rf,ctx){if(1&rf&&(core.ynx(0),core._UZ(1,"app-ecl-paragraph-oe-accordion",5),core.BQk()),2&rf){const paragraph_r2=core.oxw().$implicit;core.xp6(1),core.Q6J("fieldOeParagraphs",paragraph_r2.fieldOeParagraphs)}}function HomepageComponent_div_0_div_1_ng_container_4_Template(rf,ctx){if(1&rf&&(core.ynx(0),core._UZ(1,"app-ecl-paragraph-oe-banner",6),core.BQk()),2&rf){const paragraph_r2=core.oxw().$implicit;core.xp6(1),core.Q6J("fieldOeText",paragraph_r2.fieldOeText)("fieldOeTitle",paragraph_r2.fieldOeTitle)("credit",paragraph_r2.credit)("oeParagraphsVariant",paragraph_r2.oeParagraphsVariant)("fieldOeBannerAlignment",paragraph_r2.fieldOeBannerAlignment)("fieldOeLink",paragraph_r2.fieldOeLink)("fieldOeMedia",paragraph_r2.fieldOeMedia)}}function HomepageComponent_div_0_div_1_ng_container_5_Template(rf,ctx){if(1&rf&&(core.ynx(0),core._UZ(1,"app-ecl-featured-item",7),core.BQk()),2&rf){const paragraph_r2=core.oxw().$implicit;core.xp6(1),core.Q6J("description",paragraph_r2.description)("isExtended",paragraph_r2.isExtended)("title",paragraph_r2.title)("alignment",paragraph_r2.alignment)("imageCaption",paragraph_r2.imageCaption)("imageUrl",paragraph_r2.imageUrl)("imageAlt",paragraph_r2.imageAlt)}}function HomepageComponent_div_0_div_1_Template(rf,ctx){if(1&rf&&(core.TgZ(0,"div",2),core.YNc(1,HomepageComponent_div_0_div_1_ng_container_1_Template,2,1,"ng-container",0)(2,HomepageComponent_div_0_div_1_ng_container_2_Template,2,4,"ng-container",0)(3,HomepageComponent_div_0_div_1_ng_container_3_Template,2,1,"ng-container",0)(4,HomepageComponent_div_0_div_1_ng_container_4_Template,2,7,"ng-container",0)(5,HomepageComponent_div_0_div_1_ng_container_5_Template,2,7,"ng-container",0),core.qZA()),2&rf){const paragraph_r2=ctx.$implicit;core.xp6(1),core.Q6J("ngIf","ParagraphOeRichText"===paragraph_r2.__typename),core.xp6(1),core.Q6J("ngIf","ParagraphOeQuote"===paragraph_r2.__typename),core.xp6(1),core.Q6J("ngIf","ParagraphOeAccordion"===paragraph_r2.__typename),core.xp6(1),core.Q6J("ngIf","ParagraphOeBanner"===paragraph_r2.__typename),core.xp6(1),core.Q6J("ngIf","featured"===paragraph_r2.__typename)}}function HomepageComponent_div_0_Template(rf,ctx){if(1&rf&&(core.TgZ(0,"div"),core.YNc(1,HomepageComponent_div_0_div_1_Template,6,5,"div",1),core.qZA()),2&rf){const ctx_r0=core.oxw();core.xp6(1),core.Q6J("ngForOf",ctx_r0.homepageData.data.content.paragraphs)}}const routes=[{path:"",component:(()=>{class HomepageComponent2{constructor(mockService){this.mockService=mockService}ngOnInit(){this.getHomepageData()}getHomepageData(){this.mockService.getHomepageData().subscribe(data=>{this.homepageData=data})}static#_=this.\u0275fac=function(t){return new(t||HomepageComponent2)(core.Y36(MockService))};static#_2=this.\u0275cmp=core.Xpm({type:HomepageComponent2,selectors:[["ng-component"]],decls:1,vars:1,consts:[[4,"ngIf"],["class","ecl-container ecl-u-mb-2xl",4,"ngFor","ngForOf"],[1,"ecl-container","ecl-u-mb-2xl"],[3,"fieldOeTextLong"],[3,"fieldOePlainTextLong","fieldOeText","imageUrl","imageAlt"],[3,"fieldOeParagraphs"],[3,"fieldOeText","fieldOeTitle","credit","oeParagraphsVariant","fieldOeBannerAlignment","fieldOeLink","fieldOeMedia"],[3,"description","isExtended","title","alignment","imageCaption","imageUrl","imageAlt"]],template:function(rf,ctx){1&rf&&core.YNc(0,HomepageComponent_div_0_Template,2,1,"div",0),2&rf&&core.Q6J("ngIf",ctx.homepageData)},dependencies:[common.sg,common.O5,ParagraphOeAccordionComponent,ParagraphOeBannerComponent,ParagraphOeRichTextComponent,BlockquoteComponent,FeaturedItemComponent],encapsulation:2})}return HomepageComponent2})()}];let Module1RoutingModule=(()=>{class Module1RoutingModule2{static#_=this.\u0275fac=function(t){return new(t||Module1RoutingModule2)};static#_2=this.\u0275mod=core.oAB({type:Module1RoutingModule2});static#_3=this.\u0275inj=core.cJS({imports:[router.Bz.forChild(routes)]})}return Module1RoutingModule2})();var shared_module=__webpack_require__(295);let Module=(()=>{class Module2{static#_=this.\u0275fac=function(t){return new(t||Module2)};static#_2=this.\u0275mod=core.oAB({type:Module2});static#_3=this.\u0275inj=core.cJS({imports:[shared_module.m,Module1RoutingModule]})}return Module2})()}};