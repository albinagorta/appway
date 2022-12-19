import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';

// MODULOS
import { ClientesRouterModule } from './clientes-router.module';
import { CoreModule } from 'src/app/core/core.module';

// COMPONENTES
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListarComponent } from './listar/listar.component';
import { ViewComponent } from './view/view.component';
import { ClientesComponent } from './clientes.component';



@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    ListarComponent,
    ViewComponent,
    ClientesComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ClientesRouterModule,
    RouterModule,
    CoreModule
  ],
  exports: [
    AddComponent,
    EditComponent,
    ListarComponent,
    ViewComponent
  ]
})

export class ClientesModule { }
