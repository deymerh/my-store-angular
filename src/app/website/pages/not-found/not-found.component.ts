import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
  <style>
    div{
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100vh - 120px);
    }
  </style>
  <div>
    <img src="https://media.giphy.com/media/A9EcBzd6t8DZe/giphy.gif">
  </div>`
})
export class NotFoundComponent {}