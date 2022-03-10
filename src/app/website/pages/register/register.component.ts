import { Component } from '@angular/core';

import { OnExit } from './../../../guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnExit{
  constructor(){}

  onExit(){
    return confirm('Estas seguro que quieres salir?');
  }
  
}
