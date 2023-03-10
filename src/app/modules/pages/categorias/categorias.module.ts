import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import { RouterModule } from '@angular/router';


//MODELOS
import { CategoriasRouterModule } from './categorias-router.module';
import { CoreModule } from 'src/app/core/core.module';

// COMPONENTES
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListarComponent } from './listar/listar.component';
import { CategoriasComponent } from './categorias.component';



@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    ListarComponent,
    CategoriasComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    CategoriasRouterModule,
    DataTablesModule,
    RouterModule,
    CoreModule
  ],
  exports: [
    AddComponent,
    EditComponent,
    ListarComponent
  ]
})
export class CategoriasModule { }
