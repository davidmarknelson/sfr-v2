import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { RecipesAndCountQuery } from '@sfr/data-access/generated';

@Component({
  selector: 'sfr-recipes-grid',
  templateUrl: './recipes-grid.component.html',
  styleUrls: ['./recipes-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrRecipesGridComponent {
  @Input() recipesAndCount!: RecipesAndCountQuery['recipesAndCount'] | null;
  @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  emitPageEvent(event: PageEvent): void {
    this.pageEvent.emit(event);
  }
}
