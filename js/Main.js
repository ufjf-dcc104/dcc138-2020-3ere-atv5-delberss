import Cena from "./Cena.js"
import Sprite from "./Sprite.js";
import AssetManager from "./AssetManager.js";
import Mixer from "./Mixer.js";
import Mapa from "./Mapa.js";
import modeloMapa1 from "../js/maps/mapa1.js"
import InputManager from "./InputManager.js";
import Game from "./Game.js";

const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

// Adiciona imagens a ser gerenciadas pelo asset manager
assets.carregaImagem("ground-tile", "assets/ground-tile.png");
assets.carregaImagem("wall", "assets/wall.png");
assets.carregaImagem("water", "assets/water.png");

assets.carregaImagem("garota", "assets/garota.png");
assets.carregaImagem("esqueleto", "assets/skelly.png");
assets.carregaImagem("orc", "assets/orc.png");
assets.carregaAudio("moeda", "assets/coin.wav");
assets.carregaAudio("boom", "assets/boom.wav");




const canvas = document.querySelector("canvas");
canvas.width = 14*32;
canvas.height = 10*32;

input.configurarTeclado({
    "ArrowLeft": "MOVE_ESQUERDA",
    "ArrowRight": "MOVE_DIREITA",
    "ArrowUp": "MOVE_CIMA",
    "ArrowDown": "MOVE_BAIXO"
    });

const game = new Game(canvas, assets, input);
 
const ctx = canvas.getContext("2d");

const cena1 = new Cena(canvas,assets);
game.adicionarCena("jogo", cena1);

const mapa1 = new Mapa(10, 14, 32);
mapa1.carregaMapa(modeloMapa1);
cena1.configuraMapa(mapa1);


const pc = new Sprite({x: 50, y: 150, vx: 10});

pc.controlar = function(dt){
    if(input.comandos.get("MOVE_ESQUERDA")){
      this.vx = -50;
    } else if(input.comandos.get("MOVE_DIREITA")){
      this.vx = +50;
    } else{
      this.vx = 0;
    }

    if(input.comandos.get("MOVE_CIMA")){
        this.vy = -50;
      } else if(input.comandos.get("MOVE_BAIXO")){
        this.vy = +50;
      } else{
        this.vy = 0;
      }
  }

  
  cena1.adicionar(pc);
  
  function perseguePC(dt){
      this.vx = 25*Math.sign(pc.x - this.x);
      this.vy = 25*Math.sign(pc.y - this.y);
    }
    
const en1 = new Sprite({x: 260, color:"red", controlar: perseguePC});
en1.controlar = perseguePC;

cena1.adicionar(en1);
cena1.adicionar(new Sprite({x: 115, y: 70, vy:10,  color:"red", controlar: perseguePC}));
cena1.adicionar(new Sprite({x: 115, y: 160, vy:-10,  color:"red",controlar: perseguePC}));
//cena1.adicionaSprites(10); // Adiciona função para Sprites aleatorios.
cena1.spriteNoIntervalo(4000); // Função que cria sprites a cada intervalo de 4segs;

game.iniciar();

document.addEventListener("keydown",  (e)=>{
    switch (e.key) {
        case "s":
            game.iniciar();
            break;
        case "S":
            game.parar();
            break;
        case "c":
            assets.play("moeda");
            break;
        case "b":
            assets.play("boom");
            break;
    }
})