import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllFilesComponent } from './all-files/all-files.component';
import { DocumentDetailComponent } from './sdlc/document-detail/document-detail.component';
import { DocumentEditComponent } from './sdlc/document-edit/document-edit.component';
import { DocumentPreviewComponent } from './sdlc/document-preview/document-preview.component';
import { SdlcComponent } from './sdlc/sdlc.component';

const routes: Routes = [
  {path:'sdlc' , component:SdlcComponent , 
  children:[
    {path:'detail' , component:DocumentDetailComponent},
    {path:':id' , component:DocumentPreviewComponent},
    {path:':id/edit' , component:DocumentEditComponent},
  ] } ,  
  {path:'all-files' , component: AllFilesComponent},
  {path:'' , redirectTo:'/sdlc' , pathMatch:'full'},
  {path:'**' , redirectTo:'/sdlc'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
