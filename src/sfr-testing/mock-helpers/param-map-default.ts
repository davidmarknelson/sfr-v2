import { ParamMap } from '@angular/router';

export const paramMapDefault: ParamMap = {
  has() {
    return true;
  },
  get() {
    return '';
  },
  getAll(name) {
    return [];
  },
  keys: [],
};
