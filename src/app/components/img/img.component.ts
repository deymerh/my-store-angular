import { Node } from '@angular/compiler';
import { 
  Component, 
  OnInit, 
  Input, 
  Output, 
  EventEmitter,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() image:string = "";
  @Input() greeting:string = "";
  @Output() loaded = new EventEmitter<string>();
  counter:number = 0;
  setIntervalFunctionCounter: number | undefined;

  // greeting:string = "Welcome everyone!"
  
  constructor() {
    //No poner metodos asyncronos aquí
    //Se ejecuta antes del render
    // console.log("constructor", "Image: ", this.image);
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Se ejecuta antes y durante el render
    //Revisa y detecta los cambios en los inputs
    //Se ejecuta cada vez que hay cambios en los inputs
    // console.log("Method ngOnChanges: ", changes);
  }
  ngOnInit(): void {
    //Se ejecuta antes del render
    //Aqui podemos llamar cosas asyncronas
    //Podemos hacer llamadas a APIs
    //Solo corre una vez cuando se inicializa el componente
    // console.log("Run counter: ", "ngOnInit");
    // this.setIntervalFunctionCounter = window.setInterval(()=>{
    //   this.counter += 1;
    // //   console.log("setInterval: ", this.counter);
    // },1000);
  }
  ngAfterViewInit(): void {
    //After render
    //handler children
    // console.log("ngAfterViewInit");
  }
  ngOnDestroy(): void {
    //Delete component
    // console.log("ngOnDestroy");
    window.clearInterval(this.setIntervalFunctionCounter);
  }
  imageError(){
    this.image = "../../../assets/default.png";
  }

  imageLoad(){
    // console.log("Image loaded...");
    this.loaded.emit(this.image);
  }

}
