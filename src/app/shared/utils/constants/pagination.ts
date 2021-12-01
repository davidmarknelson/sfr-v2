import { MatPaginatorDefaultOptions } from '@angular/material/paginator';

export const PaginationConstants: Required<
  Pick<MatPaginatorDefaultOptions, 'pageSize' | 'showFirstLastButtons'>
> = {
  pageSize: 9,
  showFirstLastButtons: true,
};
