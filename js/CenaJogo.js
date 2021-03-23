import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import modeloMapa1 from "../js/maps/mapa1.js"
import modeloMapa2 from "../js/maps/mapa2.js"
import Sprite from "./Sprite.js";

export default class CenaJogo extends Cena {
  quandoColidir(a,b){
    // observa bau
    if(a.tags.has("pc") && b.tags.has("bau") || b.tags.has("pc") && a.tags.has("bau"))
    {
      this.preparar(modeloMapa2);
      this.assets.play("proximoMapa");
      return;
    }
    if(a.tags.has("pc") && b.tags.has("moeda") || b.tags.has("pc") && a.tags.has("moeda")){
      if (!this.aRemover.includes(a) && a.tags.has("moeda")){
        this.aRemover.push(a);
      }
      if (!this.aRemover.includes(b) && b.tags.has("moeda")){
        this.aRemover.push(b);
        this.assets.play("som-moeda");
        this.game.pontos++;
        this.game.pontuacaoFinal = this.game.pontos;
        if(this.game.pontos == 13){
          this.game.selecionaCena("fim");
        }
        return;
      }
    }
    if (!this.aRemover.includes(a)){
      this.aRemover.push(a);
    }
    if (!this.aRemover.includes(b)){
      this.aRemover.push(b);
    }
    if (a.tags.has("pc") && b.tags.has("enemy") || b.tags.has("pc") && a.tags.has("enemy")){
      this.assets.play("boom");
      this.game.selecionaCena("fim");
    }
 }
 preparar(modeloMapa = modeloMapa1){
    super.preparar(modeloMapa);
    this.mapaAtual = modeloMapa;
    const mapa = new Mapa(10, 14, 32);
    mapa.carregaMapa(modeloMapa);
    this.configuraMapa(mapa);
    
    
    const pc = new Sprite({x: 50, y: 150,assets: this.assets});
    pc.tags.add("pc");
    const cena = this;
    pc.controlar = function(dt){
        if(cena.input.comandos.get("MOVE_ESQUERDA")){
          this.vx = -100;
        } else if(cena.input.comandos.get("MOVE_DIREITA")){
          this.vx = +100;
        } else{
          this.vx = 0;
        }
    
        if(cena.input.comandos.get("MOVE_CIMA")){
            this.vy = -100;
          } else if(cena.input.comandos.get("MOVE_BAIXO")){
            this.vy = +100;
          } else{
            this.vy = 0;
          }
      }
    
      
      this.adicionar(pc);
      
      function perseguePC(dt){
          this.vx = 25*Math.sign(pc.x - this.x);
          this.vy = 25*Math.sign(pc.y - this.y);
        }
        
    const en1 = new Sprite({x: 260, color:"red", controlar: perseguePC, tags:["enemy"], assets: this.assets});
    en1.controlar = perseguePC;
    
    this.adicionar(en1);
    this.adicionar(new Sprite({x: 115, y: 70, vy:10,  color:"red", controlar: perseguePC, tags:["enemy"], assets: this.assets}));
    this.adicionar(new Sprite({x: 115, y: 160, vy:-10,  color:"red",controlar: perseguePC, tags:["enemy"], assets: this.assets}));
    this.adicionar(new Sprite({x: 405, y: 90, vy:-10,  color:"red",controlar: perseguePC, tags:["enemy"], assets: this.assets}));

    //this.adicionaSprites(10); // Adiciona função para Sprites aleatorios.
    //this.spriteNoIntervalo(4000); // Função que cria sprites a cada intervalo de 4segs;
    this.adicionar(new Sprite({x: 50, y: 120, color: "gold", tags: ["moeda"], assets: this.assets}));
    this.adicionar(new Sprite({x: 340, y: 50, color: "gold", tags: ["moeda"], assets: this.assets}));
    this.adicionar(new Sprite({x: 150, y: 250, color: "gold", tags: ["moeda"], assets: this.assets}));
    this.adicionar(new Sprite({x: 80, y: 220, color: "gold", tags: ["moeda"], assets: this.assets}));
    this.adicionar(new Sprite({x: 420, y: 290, color: "gold", tags: ["moeda"], assets: this.assets}));
    this.adicionar(new Sprite({x: 180, y: 110, color: "gold", tags: ["moeda"], assets: this.assets}));
    this.adicionar(new Sprite({x: 380, y: 250, color: "gold", tags: ["moeda"], assets: this.assets}));
    this.adicionar(new Sprite({x: 380, y: 210, color: "orange", tags: ["bau"], assets: this.assets}));
    this.adicionar(new Sprite({x: 460, y: 70, color: "orange", tags: ["bau"], assets: this.assets}));

 }



} 