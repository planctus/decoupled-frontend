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
              "__typename": "banner",
              imageUrl: 'https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg',
              title: 'Headline sed elit lorem. Donec dictum.',
              description: 'Pellentesque tempor tincidunt quam, finibus vulputate eros iaculis pharetra orci arcu, dictum maximus arcu pellentesque eget. Cras massa nunc.',
              credit: '© Copyright or credit'
            },
            {
              "__typename": "ParagraphOeRichText",
              fieldOeTextLong: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a varius justo, sed accumsan turpis. Aenean ac vehicula felis. Nam porta elit blandit, consequat erat accumsan, ullamcorper ex. Nam sem ligula, cursus eget imperdiet facilisis, egestas gravida quam. Vivamus nec aliquam odio. Etiam sed est in nulla commodo tincidunt at sed nisl. Vestibulum vitae turpis rutrum, commodo quam ut, tempus ante. Nunc eget nibh eu elit volutpat dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in felis congue, volutpat urna et, feugiat leo. In non nisi condimentum, mattis eros sit amet, pretium eros.</p>
                <p>Phasellus maximus metus metus, vel ornare nisl molestie ut. Suspendisse potenti. Aenean non augue turpis. Sed ultrices felis nec ex dapibus, a sollicitudin sem egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur enim neque, consequat in eros at, maximus posuere arcu. Duis efficitur sem enim, ac sollicitudin neque scelerisque at.</p>
                <p>Fusce vel lectus volutpat, lobortis sapien et, bibendum sem. Nullam suscipit interdum feugiat. Integer vitae urna pretium, feugiat sapien non, ullamcorper diam. Fusce lorem quam, imperdiet at ex id, auctor finibus risus. Suspendisse diam mi, ornare id auctor ullamcorper, congue tempor ligula. Suspendisse tincidunt lobortis metus vitae scelerisque. Nullam dapibus congue leo. Fusce vel velit eget lorem laoreet imperdiet.</p>`
            },
            {
              "__typename": "ParagraphOeQuote",
              fieldOePlainTextLong: "Fusce convallis metus id felis luctus adipiscing. Vivamus consectetuer hendrerit lacus. Phasellus blandit leo ut odio. Aenean commodo ligula eget dolor. Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus.",
              fieldOeText: "John Smith"
            },
            {
              "__typename": "accordion",
              accordionItems: [
                {
                  title: 'Lorem Ipsum accordion Item',
                  description: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a varius justo, sed accumsan turpis. Aenean ac vehicula felis. Nam porta elit blandit, consequat erat accumsan, ullamcorper ex. Nam sem ligula, cursus eget imperdiet facilisis, egestas gravida quam. Vivamus nec aliquam odio. Etiam sed est in nulla commodo tincidunt at sed nisl. Vestibulum vitae turpis rutrum, commodo quam ut, tempus ante. Nunc eget nibh eu elit volutpat dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in felis congue, volutpat urna et, feugiat leo. In non nisi condimentum, mattis eros sit amet, pretium eros.</p>
                  <p>Phasellus maximus metus metus, vel ornare nisl molestie ut. Suspendisse potenti. Aenean non augue turpis. Sed ultrices felis nec ex dapibus, a sollicitudin sem egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur enim neque, consequat in eros at, maximus posuere arcu. Duis efficitur sem enim, ac sollicitudin neque scelerisque at.</p>
                  <p>Fusce vel lectus volutpat, lobortis sapien et, bibendum sem. Nullam suscipit interdum feugiat. Integer vitae urna pretium, feugiat sapien non, ullamcorper diam. Fusce lorem quam, imperdiet at ex id, auctor finibus risus. Suspendisse diam mi, ornare id auctor ullamcorper, congue tempor ligula. Suspendisse tincidunt lobortis metus vitae scelerisque. Nullam dapibus congue leo. Fusce vel velit eget lorem laoreet imperdiet.</p>`
                },
                {
                  title: 'Lorem Ipsum accordion Item',
                  description: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a varius justo, sed accumsan turpis. Aenean ac vehicula felis. Nam porta elit blandit, consequat erat accumsan, ullamcorper ex. Nam sem ligula, cursus eget imperdiet facilisis, egestas gravida quam. Vivamus nec aliquam odio. Etiam sed est in nulla commodo tincidunt at sed nisl. Vestibulum vitae turpis rutrum, commodo quam ut, tempus ante. Nunc eget nibh eu elit volutpat dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in felis congue, volutpat urna et, feugiat leo. In non nisi condimentum, mattis eros sit amet, pretium eros.</p>
                  <p>Phasellus maximus metus metus, vel ornare nisl molestie ut. Suspendisse potenti. Aenean non augue turpis. Sed ultrices felis nec ex dapibus, a sollicitudin sem egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur enim neque, consequat in eros at, maximus posuere arcu. Duis efficitur sem enim, ac sollicitudin neque scelerisque at.</p>
                  <p>Fusce vel lectus volutpat, lobortis sapien et, bibendum sem. Nullam suscipit interdum feugiat. Integer vitae urna pretium, feugiat sapien non, ullamcorper diam. Fusce lorem quam, imperdiet at ex id, auctor finibus risus. Suspendisse diam mi, ornare id auctor ullamcorper, congue tempor ligula. Suspendisse tincidunt lobortis metus vitae scelerisque. Nullam dapibus congue leo. Fusce vel velit eget lorem laoreet imperdiet.</p>`
                },
                {
                  title: 'Lorem Ipsum accordion Item',
                  description: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a varius justo, sed accumsan turpis. Aenean ac vehicula felis. Nam porta elit blandit, consequat erat accumsan, ullamcorper ex. Nam sem ligula, cursus eget imperdiet facilisis, egestas gravida quam. Vivamus nec aliquam odio. Etiam sed est in nulla commodo tincidunt at sed nisl. Vestibulum vitae turpis rutrum, commodo quam ut, tempus ante. Nunc eget nibh eu elit volutpat dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse in felis congue, volutpat urna et, feugiat leo. In non nisi condimentum, mattis eros sit amet, pretium eros.</p>
                  <p>Phasellus maximus metus metus, vel ornare nisl molestie ut. Suspendisse potenti. Aenean non augue turpis. Sed ultrices felis nec ex dapibus, a sollicitudin sem egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur enim neque, consequat in eros at, maximus posuere arcu. Duis efficitur sem enim, ac sollicitudin neque scelerisque at.</p>
                  <p>Fusce vel lectus volutpat, lobortis sapien et, bibendum sem. Nullam suscipit interdum feugiat. Integer vitae urna pretium, feugiat sapien non, ullamcorper diam. Fusce lorem quam, imperdiet at ex id, auctor finibus risus. Suspendisse diam mi, ornare id auctor ullamcorper, congue tempor ligula. Suspendisse tincidunt lobortis metus vitae scelerisque. Nullam dapibus congue leo. Fusce vel velit eget lorem laoreet imperdiet.</p>`
                },
              ]
            },
          ]
        }
      }
    };
    return of(data);
  }
}
