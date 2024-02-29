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
          id: "1",
          entityRevisionId: "22",
          nid: 1,
          title: "Homepage",
          moderationState: "published",
          status: true,
          paragraphs: [
            {
              "__typename": "ParagraphOeRichText",
              fieldOeTextLong: "<p>Pellentesque dapibus hendrerit tortor. Nunc sed turpis. Proin pretium, leo ac pellentesque mollis, felis nunc ultrices eros, sed gravida augue augue mollis justo. Ut leo. Quisque id odio.</p>"
            },
            {
              "__typename": "ParagraphOeQuote",
              fieldOePlainTextLong: "Fusce convallis metus id felis luctus adipiscing. Vivamus consectetuer hendrerit lacus. Phasellus blandit leo ut odio. Aenean commodo ligula eget dolor. Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus.",
              fieldOeText: "John Smith"
            }
          ]
        }
      }
    };
    return of(data);
  }

  getBannerData(): Observable<{ image: string, title: string, description: string }> {
    return of({
      image: '<img class="ecl-banner__image" src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg" alt="alternative text" />',
      title: 'Headline sed elit lorem. Donec dictum.',
      description: 'Pellentesque tempor tincidunt quam, finibus vulputate eros iaculis pharetra orci arcu, dictum maximus arcu pellentesque eget. Cras massa nunc.'
    });
  }

  getAccordionData(): Observable<{title: string, description: string }[]> {
    return of([
      {
        title: 'Headline 1.',
        description: 'Pellentesque tempor tincidunt quam, finibus vulputate eros iaculis pharetra orci arcu, dictum maximus arcu pellentesque eget. Cras massa nunc.'
      },
      {
        title: 'Headline 2.',
        description: 'Pellentesque tempor tincidunt quam, finibus vulputate eros iaculis pharetra orci arcu, dictum maximus arcu pellentesque eget. Cras massa nunc.'
      },
      {
        title: 'Headline 3.',
        description: 'Pellentesque tempor tincidunt quam, finibus vulputate eros iaculis pharetra orci arcu, dictum maximus arcu pellentesque eget. Cras massa nunc.'
      },
    ]
    );
  }
}
