import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog'; 
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatSortModule} from '@angular/material/sort';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTreeModule} from '@angular/material/tree'; 
export class MyOwnCustomMaterialModule { } 
const modules=[MatTreeModule,MatProgressSpinnerModule,MatTableModule,MatGridListModule,MatRadioModule,MatStepperModule,MatChipsModule,MatExpansionModule,ScrollDispatchModule,MatSortModule,MatListModule,MatDividerModule,MatDialogModule,MatCardModule,MatSidenavModule,MatButtonModule, MatCheckboxModule,MatToolbarModule,MatIconModule,MatInputModule,MatFormFieldModule,MatTabsModule];
@NgModule({ 
  imports: [
 
    modules,
  ],
  exports: [modules], 
  declarations: [],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class MaterialModule { }
 