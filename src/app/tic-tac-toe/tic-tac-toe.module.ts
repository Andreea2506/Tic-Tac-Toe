import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { XComponent } from './components/x/x.component';
import { OComponent } from './components/o/o.component';



@NgModule({
  declarations: [
    BoardComponent,
    XComponent,
    OComponent
  ],
  exports: [
    BoardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TicTacToeModule { }
