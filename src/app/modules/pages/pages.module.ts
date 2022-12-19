import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULOS
import { ClientesModule } from './clientes/clientes.module';
import { CategoriasModule } from './categorias/categorias.module';

//COMPONENTES
import { ModalConfirmDelete } from '../components/modaldelete/modalconfirmdelete.component';
import { ProductosModule } from './productos/productos.module';
import { HomeModule } from './home/home.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PagesRouterModule } from './pages-router.module';
 

@NgModule({
  declarations: [ModalConfirmDelete],
  imports: [
    CommonModule,
    ClientesModule,
    CategoriasModule,
    ProductosModule,
    HomeModule,
    UsuariosModule,
    PagesRouterModule
  ],
  exports: [
    ClientesModule,
    CategoriasModule,
    ProductosModule,
    HomeModule,
    PagesRouterModule,
    ModalConfirmDelete
  ], 
  
})

export class PagesModule { }
