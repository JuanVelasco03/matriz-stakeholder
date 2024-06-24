import { Routes } from '@angular/router';
import { MatrizStakeholderComponent } from './components/matriz-stakeholder/matriz-stakeholder.component';
import { InitSimulationComponent } from './init-simulation/init-simulation.component';

export const routes: Routes = [
  {
    path: 'inicio',
    component: InitSimulationComponent
  },
  {
    path: 'matriz-stakeholder',
    component: MatrizStakeholderComponent
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];
