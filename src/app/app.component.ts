import { Component, OnInit } from '@angular/core';

import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  showComponentImage: boolean = true;

  title = 'my-store';
  urlForFather:string = "https://www.w3schools.com/howto/img_avatar.png";
  img:string = "Texto de ejemplo para input";
  imageUploaded: string = '';

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private filesService: FilesService,
    private tokenService: TokenService,

    ){}
  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.getProfile()
        .subscribe();
    }
  }
    
  onLoaded(image:string){
    // console.log("Event father!: ", image);
  }
  toggleImage(){
    this.showComponentImage = !this.showComponentImage;
  }

  downloadFile(){
    this.filesService.getFile(
      'my.pdf',
      'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
      'application/pdf'
      )
      .subscribe()
  }

  uploadImage(event:Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (!file) {
      window.alert('Debes seleccionar un archivo');
    }else{
      this.filesService.uoploadFile(file)
      .subscribe(res=>{
        this.imageUploaded = res.location;
      })
    }
  }
}
