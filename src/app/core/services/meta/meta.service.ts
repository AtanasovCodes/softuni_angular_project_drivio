import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class MetaService {
  private defaultTitle = 'Drivio - Rent a Car';
  private defaultDescription = 'Rent a car easily with Drivio.';
  private defaultImage = `${environment.appURL}/assets/images/drivio.webp`;
  private defaultType = 'website';

  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  setMetaTags(config?: { title?: string; description?: string; image?: string; type?: string }) {
    const title = config?.title ?? this.defaultTitle;
    const description = config?.description ?? this.defaultDescription;
    const image = config?.image ?? this.defaultImage;
    const type = config?.type ?? this.defaultType;

    this.title.setTitle(title);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:type', content: type });
  }
}
