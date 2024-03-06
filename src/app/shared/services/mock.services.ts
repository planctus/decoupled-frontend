import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor() { }

  getHomepageData(): Observable<any> {
    const data = {
      data: {
        content: {
          id: '1',
          entityRevisionId: '22',
          nid: 1,
          title: 'Homepage',
          moderationState: 'published',
          status: true,
          paragraphs: [
            {
              '__typename': 'ParagraphOeBanner',
              id: '1',
              fieldOeBannerSize: 'm',
              fieldOeBannerFullWidth: true,
              oeParagraphsVariant: 'text-box',
              fieldOeTitle: 'Headline sed elit lorem. Donec dictum.',
              fieldOeText: 'Pellentesque tempor tincidunt quam, finibus vulputate eros iaculis pharetra orci arcu, dictum maximus arcu pellentesque eget. Cras massa nunc.',
              credit: '© Copyright or credit',
              fieldOeMedia: {
                mediaFileUrl: 'https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg',
                mediaFileAlt: 'alt of image',
              },
              fieldOeLink: {
                title: 'Subscribe',
                uri: '/'
              },
            },
            {
              '__typename': 'ParagraphOeBanner',
              id: '1',
              fieldOeBannerSize: 'm',
              fieldOeBannerFullWidth: true,
              oeParagraphsVariant: 'image-overlay',
              fieldOeTitle: 'Headline sed elit lorem. Donec dictum.',
              fieldOeText: 'Pellentesque tempor tincidunt quam, finibus vulputate eros iaculis pharetra orci arcu, dictum maximus arcu pellentesque eget. Cras massa nunc.',
              credit: '© Copyright or credit',
              fieldOeMedia: {
                mediaFileUrl: 'https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg',
                mediaFileAlt: 'alt of image',
              },
              fieldOeLink: {
                title: 'Subscribe',
                uri: '/'
              },
            },
            {
              '__typename': 'ParagraphOeBanner',
              id: '1',
              fieldOeBannerSize: 'm',
              fieldOeBannerFullWidth: true,
              oeParagraphsVariant: 'text-highlight',
              fieldOeTitle: 'Headline sed elit lorem. Donec dictum.',
              fieldOeText: 'Pellentesque tempor tincidunt quam, finibus vulputate eros iaculis pharetra orci arcu, dictum maximus arcu pellentesque eget. Cras massa nunc.',
              credit: '© Copyright or credit',
              fieldOeMedia: {
                mediaFileUrl: 'https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg',
                mediaFileAlt: 'alt of image',
              },
              fieldOeLink: {
                title: 'Subscribe',
                uri: '/'
              },
            },
            {
              '__typename': 'ParagraphOeBanner',
              id: '1',
              fieldOeBannerSize: 'm',
              fieldOeBannerFullWidth: true,
              oeParagraphsVariant: 'plain-background',
              fieldOeTitle: 'Headline sed elit lorem. Donec dictum.',
              fieldOeText: 'Pellentesque tempor tincidunt quam, finibus vulputate eros iaculis pharetra orci arcu, dictum maximus arcu pellentesque eget. Cras massa nunc.',
              credit: '© Copyright or credit',
              fieldOeMedia: {
                mediaFileUrl: 'https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg',
                mediaFileAlt: 'alt of image',
              },
              fieldOeLink: {
                title: 'Subscribe',
                uri: '/'
              },
            },
            {
              '__typename': 'ParagraphOeBanner',
              id: '1',
              fieldOeBannerSize: 'm',
              fieldOeBannerFullWidth: true,
              fieldOeBannerAlignment: 'center',
              oeParagraphsVariant: 'plain-background',
              fieldOeTitle: 'Headline sed elit lorem. Donec dictum.',
              fieldOeText: 'Pellentesque tempor tincidunt quam, finibus vulputate eros iaculis pharetra orci arcu, dictum maximus arcu pellentesque eget. Cras massa nunc.',
              credit: '© Copyright or credit',
              fieldOeMedia: {
                mediaFileUrl: 'https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg',
                mediaFileAlt: 'alt of image',
              },
              fieldOeLink: {
                title: 'Subscribe',
                uri: '/'
              },
            },
            {
              '__typename': 'ParagraphOeRichText',
              fieldOeTextLong: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a varius justo, sed accumsan turpis. Aenean ac vehicula felis. Nam porta elit blandit, consequat erat accumsan, ullamcorper ex. Nam sem ligula, cursus eget imperdiet facilisis, egestas gravida quam. Vivamus nec aliquam odio. Etiam sed est in nulla commodo tincidunt at sed nisl. Vestibulum vitae turpis rutrum, commodo quam ut, tempus ante. Nunc eget nibh eu elit volutpat dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in felis congue, volutpat urna et, feugiat leo. In non nisi condimentum, mattis eros sit amet, pretium eros.</p>
                <p>Phasellus maximus metus metus, vel ornare nisl molestie ut. Suspendisse potenti. Aenean non augue turpis. Sed ultrices felis nec ex dapibus, a sollicitudin sem egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur enim neque, consequat in eros at, maximus posuere arcu. Duis efficitur sem enim, ac sollicitudin neque scelerisque at.</p>
                <p>Fusce vel lectus volutpat, lobortis sapien et, bibendum sem. Nullam suscipit interdum feugiat. Integer vitae urna pretium, feugiat sapien non, ullamcorper diam. Fusce lorem quam, imperdiet at ex id, auctor finibus risus. Suspendisse diam mi, ornare id auctor ullamcorper, congue tempor ligula. Suspendisse tincidunt lobortis metus vitae scelerisque. Nullam dapibus congue leo. Fusce vel velit eget lorem laoreet imperdiet.</p>`
            },
            {
              '__typename': 'ParagraphOeQuote',
              fieldOePlainTextLong: 'Fusce convallis metus id felis luctus adipiscing. Vivamus consectetuer hendrerit lacus. Phasellus blandit leo ut odio. Aenean commodo ligula eget dolor. Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus.',
              fieldOeText: 'John Smith'
            },
            {
              '__typename': 'ParagraphOeQuote',
              fieldOePlainTextLong: 'Fusce convallis metus id felis luctus adipiscing. Vivamus consectetuer hendrerit lacus. Phasellus blandit leo ut odio. Aenean commodo ligula eget dolor. Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus.',
              fieldOeText: 'John Smith',
              imageUrl: 'https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg',
            },
            {
              '__typename': 'ParagraphOeAccordion',
              id: "1",
              fieldOeParagraphs: [
                {
                  id: '4',
                  fieldOeText: 'Lorem Ipsum accordion Item',
                  fieldOeTextLong: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a varius justo, sed accumsan turpis. Aenean ac vehicula felis. Nam porta elit blandit, consequat erat accumsan, ullamcorper ex. Nam sem ligula, cursus eget imperdiet facilisis, egestas gravida quam. Vivamus nec aliquam odio. Etiam sed est in nulla commodo tincidunt at sed nisl. Vestibulum vitae turpis rutrum, commodo quam ut, tempus ante. Nunc eget nibh eu elit volutpat dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in felis congue, volutpat urna et, feugiat leo. In non nisi condimentum, mattis eros sit amet, pretium eros.</p>
                  <p>Phasellus maximus metus metus, vel ornare nisl molestie ut. Suspendisse potenti. Aenean non augue turpis. Sed ultrices felis nec ex dapibus, a sollicitudin sem egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur enim neque, consequat in eros at, maximus posuere arcu. Duis efficitur sem enim, ac sollicitudin neque scelerisque at.</p>
                  <p>Fusce vel lectus volutpat, lobortis sapien et, bibendum sem. Nullam suscipit interdum feugiat. Integer vitae urna pretium, feugiat sapien non, ullamcorper diam. Fusce lorem quam, imperdiet at ex id, auctor finibus risus. Suspendisse diam mi, ornare id auctor ullamcorper, congue tempor ligula. Suspendisse tincidunt lobortis metus vitae scelerisque. Nullam dapibus congue leo. Fusce vel velit eget lorem laoreet imperdiet.</p>`,
                  fieldOeIcon: 'arrow-down',
                },
                {
                  id: '5',
                  fieldOeText: 'Lorem Ipsum accordion Item',
                  fieldOeTextLong: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a varius justo, sed accumsan turpis. Aenean ac vehicula felis. Nam porta elit blandit, consequat erat accumsan, ullamcorper ex. Nam sem ligula, cursus eget imperdiet facilisis, egestas gravida quam. Vivamus nec aliquam odio. Etiam sed est in nulla commodo tincidunt at sed nisl. Vestibulum vitae turpis rutrum, commodo quam ut, tempus ante. Nunc eget nibh eu elit volutpat dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in felis congue, volutpat urna et, feugiat leo. In non nisi condimentum, mattis eros sit amet, pretium eros.</p>
                  <p>Phasellus maximus metus metus, vel ornare nisl molestie ut. Suspendisse potenti. Aenean non augue turpis. Sed ultrices felis nec ex dapibus, a sollicitudin sem egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur enim neque, consequat in eros at, maximus posuere arcu. Duis efficitur sem enim, ac sollicitudin neque scelerisque at.</p>
                  <p>Fusce vel lectus volutpat, lobortis sapien et, bibendum sem. Nullam suscipit interdum feugiat. Integer vitae urna pretium, feugiat sapien non, ullamcorper diam. Fusce lorem quam, imperdiet at ex id, auctor finibus risus. Suspendisse diam mi, ornare id auctor ullamcorper, congue tempor ligula. Suspendisse tincidunt lobortis metus vitae scelerisque. Nullam dapibus congue leo. Fusce vel velit eget lorem laoreet imperdiet.</p>`,
                  fieldOeIcon: 'arrow-down',
                },
                {
                  id: '6',
                  fieldOeText: 'Lorem Ipsum accordion Item',
                  fieldOeTextLong: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a varius justo, sed accumsan turpis. Aenean ac vehicula felis. Nam porta elit blandit, consequat erat accumsan, ullamcorper ex. Nam sem ligula, cursus eget imperdiet facilisis, egestas gravida quam. Vivamus nec aliquam odio. Etiam sed est in nulla commodo tincidunt at sed nisl. Vestibulum vitae turpis rutrum, commodo quam ut, tempus ante. Nunc eget nibh eu elit volutpat dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in felis congue, volutpat urna et, feugiat leo. In non nisi condimentum, mattis eros sit amet, pretium eros.</p>
                  <p>Phasellus maximus metus metus, vel ornare nisl molestie ut. Suspendisse potenti. Aenean non augue turpis. Sed ultrices felis nec ex dapibus, a sollicitudin sem egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur enim neque, consequat in eros at, maximus posuere arcu. Duis efficitur sem enim, ac sollicitudin neque scelerisque at.</p>
                  <p>Fusce vel lectus volutpat, lobortis sapien et, bibendum sem. Nullam suscipit interdum feugiat. Integer vitae urna pretium, feugiat sapien non, ullamcorper diam. Fusce lorem quam, imperdiet at ex id, auctor finibus risus. Suspendisse diam mi, ornare id auctor ullamcorper, congue tempor ligula. Suspendisse tincidunt lobortis metus vitae scelerisque. Nullam dapibus congue leo. Fusce vel velit eget lorem laoreet imperdiet.</p>`,
                  fieldOeIcon: 'arrow-down',
                },
              ]
            },
            {
              '__typename': 'featured',
              title: 'Lorem Ipsum accordion Item',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
              imageUrl: 'https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg',
              imageCaption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
              alignment: 'left',
            },
            {
              '__typename': 'featured',
              title: 'Lorem Ipsum accordion Item',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
              imageUrl: 'https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg',
              imageCaption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
              alignment: 'right',
            },
            {
              '__typename': 'featured',
              title: 'Lorem Ipsum accordion Item',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
              imageUrl: 'https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg',
              imageCaption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
              alignment: 'right',
              isExtended: true,
            },
            {
              '__typename': 'featured',
              title: 'Lorem Ipsum accordion Item',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
              imageUrl: 'https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg',
              imageCaption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
              alignment: 'left',
              isExtended: true,
            },
          ]
        }
      }
    };
    return of(data);
  }
}
