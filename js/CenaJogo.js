import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import modeloMapa1 from "../js/maps/mapa1.js"
import Sprite from "./Sprite.js";

export default class CenaJogo extends Cena {
  quandoColidir(a,b){
    this.assets.play("boom");
    if(!this.aRemover.includes(a)){
        this.aRemover.push(a); 
    }
    if(!this.aRemover.includes(b)){
        this.aRemover.push(b); 
    }
    if(a.tags.has("pc") && b.tags.has("enemy")) {
      this.game.selecionaCena("fim");
    }
 }
 preparar(){
    super.preparar();
    const mapa1 = new Mapa(10, 14, 32);
    mapa1.carregaMapa(modeloMapa1);
    this.configuraMapa(mapa1);
    
    
    const pc = new Sprite({x: 50, y: 150});
    pc.tags.add("pc");
    const cena = this;
    pc.controlar = function(dt){
        if(cena.input.comandos.get("MOVE_ESQUERDA")){
          this.vx = -50;
        } else if(cena.input.comandos.get("MOVE_DIREITA")){
          this.vx = +50;
        } else{
          this.vx = 0;
        }
    
        if(cena.input.comandos.get("MOVE_CIMA")){
            this.vy = -50;
          } else if(cena.input.comandos.get("MOVE_BAIXO")){
            this.vy = +50;
          } else{
            this.vy = 0;
          }
      }
    
      
      this.adicionar(pc);
      
      function perseguePC(dt){
          this.vx = 25*Math.sign(pc.x - this.x);
          this.vy = 25*Math.sign(pc.y - this.y);
        }
        
    const en1 = new Sprite({x: 260, color:"red", controlar: perseguePC, tags:["enemy"]});
    en1.controlar = perseguePC;
    
    this.adicionar(en1);
    this.adicionar(new Sprite({x: 115, y: 70, vy:10,  color:"red", controlar: perseguePC, tags:["enemy"]}));
    this.adicionar(new Sprite({x: 115, y: 160, vy:-10,  color:"red",controlar: perseguePC, tags:["enemy"]}));
    //this.adicionaSprites(10); // Adiciona função para Sprites aleatorios.
    //this.spriteNoIntervalo(4000); // Função que cria sprites a cada intervalo de 4segs;

 }



} 