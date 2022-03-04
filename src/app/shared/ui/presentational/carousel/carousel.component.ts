import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { RecipePhotoType } from '@sfr/data-access/generated';
import * as Glider from 'glider-js';

@Component({
  selector: 'sfr-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrCarouselComponent implements AfterViewInit {
  @Input() images!: RecipePhotoType[];
  @ViewChild('glider') glider!: ElementRef;

  ngAfterViewInit(): void {
    new Glider(this.glider.nativeElement, {
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
      rewind: true,
      dots: '.dots',
      arrows: {
        prev: '.glider-prev',
        next: '.glider-next',
      },
    });
  }
}
