import { MatPaginatorDefaultOptions } from '@angular/material/paginator';

export const PaginationDefault: Required<
  Pick<MatPaginatorDefaultOptions, 'pageSize' | 'showFirstLastButtons'>
> = {
  pageSize: 9,
  showFirstLastButtons: true,
};
