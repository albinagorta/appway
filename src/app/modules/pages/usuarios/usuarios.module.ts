import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRouterModule } from './usuarios-router.module';
import { ListarComponent } from './listar/listar.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { UsuariosComponent } from './usuarios.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ListarComponent,
    AddComponent,
    EditComponent,
    UsuariosComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    UsuariosRouterModule,
    RouterModule,
    CoreModule
  ]
})
export class UsuariosModule { }
