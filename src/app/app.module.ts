import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SdlcComponent } from './sdlc/sdlc.component';
import { AllFilesComponent } from './all-files/all-files.component';
import { HeaderComponent } from './header/header.component';
import { DocumentsListComponent } from './sdlc/documents-list/documents-list.component';
import { DocumentDetailComponent } from './sdlc/document-detail/document-detail.component';
import { DocumentPreviewComponent } from './sdlc/document-preview/document-preview.component';
import { DocumentEditComponent } from './sdlc/document-edit/document-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    SdlcComponent,
    AllFilesComponent,
    HeaderComponent,
    DocumentsListComponent,
    DocumentDetailComponent,
    DocumentPreviewComponent,
    DocumentEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
