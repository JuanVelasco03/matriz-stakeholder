import { Routes } from '@angular/router';
import { MatrizStakeholderComponent } from './components/matriz-stakeholder/matriz-stakeholder.component';

export const routes: Routes = [
  {
      path: 'matriz-stakeholder',
      component: MatrizStakeholderComponent
  },
  {
    path: '**',
    redirectTo: 'matriz-stakeholder'
}
];
