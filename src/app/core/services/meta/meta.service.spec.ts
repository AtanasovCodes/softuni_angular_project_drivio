import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'environments/environment';

import { MetaService } from './meta.service';

describe('MetaService', () => {
  let service: MetaService;
  let metaSpy: jasmine.SpyObj<Meta>;
  let titleSpy: jasmine.SpyObj<Title>;

  beforeEach(() => {
    metaSpy = jasmine.createSpyObj('Meta', ['updateTag']);
    titleSpy = jasmine.createSpyObj('Title', ['setTitle']);

    TestBed.configureTestingModule({
      providers: [
        MetaService,
        { provide: Meta, useValue: metaSpy },
        { provide: Title, useValue: titleSpy },
      ],
    });

    service = TestBed.inject(MetaService);
  });

  it('should set default meta tags if no config provided', () => {
    service.setMetaTags();

    expect(titleSpy.setTitle).toHaveBeenCalledWith('Drivio - Rent a Car');
    expect(metaSpy.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: 'Rent a car easily with Drivio.',
    });
    expect(metaSpy.updateTag).toHaveBeenCalledWith({
      property: 'og:title',
      content: 'Drivio - Rent a Car',
    });
    expect(metaSpy.updateTag).toHaveBeenCalledWith({
      property: 'og:description',
      content: 'Rent a car easily with Drivio.',
    });
    expect(metaSpy.updateTag).toHaveBeenCalledWith({
      property: 'og:image',
      content: `${environment.appURL}/assets/images/drivio.webp`,
    });
    expect(metaSpy.updateTag).toHaveBeenCalledWith({
      property: 'og:type',
      content: 'website',
    });
  });

  it('should set meta tags from provided config', () => {
    const config = {
      title: 'Custom Title',
      description: 'Custom Description',
      image: 'https://example.com/image.png',
      type: 'article',
    };

    service.setMetaTags(config);

    expect(titleSpy.setTitle).toHaveBeenCalledWith('Custom Title');
    expect(metaSpy.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: 'Custom Description',
    });
    expect(metaSpy.updateTag).toHaveBeenCalledWith({
      property: 'og:title',
      content: 'Custom Title',
    });
    expect(metaSpy.updateTag).toHaveBeenCalledWith({
      property: 'og:description',
      content: 'Custom Description',
    });
    expect(metaSpy.updateTag).toHaveBeenCalledWith({
      property: 'og:image',
      content: 'https://example.com/image.png',
    });
    expect(metaSpy.updateTag).toHaveBeenCalledWith({
      property: 'og:type',
      content: 'article',
    });
  });
});
