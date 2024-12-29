import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CapitalizeFirstLetterPipe } from '../shared/pipes/capitalize-first-letter.pipe';

@NgModule({
  declarations: [CapitalizeFirstLetterPipe],
  providers: [],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatSlideToggleModule,
    CapitalizeFirstLetterPipe,
  ],
})
export class SharedModule {}
