import { Data, Route } from '@angular/router';

interface SfrRoute extends Route {
  data?: Data & { title: string };
}

export type SfrRoutes = SfrRoute[];
