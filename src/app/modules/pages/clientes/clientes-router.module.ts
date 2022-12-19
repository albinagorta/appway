import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// COMPONENTES
import { ListarComponent } from './listar/listar.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { ClientesComponent } from './clientes.component';
import { AuthGuard } from 'src/app/modules/guards/auth.guard';

const rutas: Routes = [
  {
    path: 'clientes',
    component: ClientesComponent,
    canActivate: [ AuthGuard ],
    title: 'Clientes',
    children: [
      {
        path: '',
        component: ListarComponent
      },
      {
        path: 'agregar',
        component: AddComponent
      }, 
      {
        path: 'edit/:id',
        component: EditComponent
      },
      {
        path: 'detalle/:id',
        component: ViewComponent
      }
    ]
  }
  
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild( rutas )
  ],
  exports: [
    RouterModule
  ]
})
export class ClientesRouterModule { }
