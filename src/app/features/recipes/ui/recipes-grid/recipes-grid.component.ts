import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { RecipesAndCountQuery } from '@sfr/data-access/generated';
import { PaginationConstants } from '@sfr/shared/utils/constants';

@Component({
  selector: 'sfr-recipes-grid',
  templateUrl: './recipes-grid.component.html',
  styleUrls: ['./recipes-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrRecipesGridComponent {
  @Input() recipesAndCount!: RecipesAndCountQuery['recipesAndCount'] | null;
  @Input() pageIndex!: number;
  @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  pageSize = PaginationConstants.pageSize;

  emitPageEvent(event: PageEvent): void {
    this.pageEvent.emit(event);
  }
}
