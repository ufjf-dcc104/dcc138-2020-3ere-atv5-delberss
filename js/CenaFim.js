import Cena from "./Cena.js";

export default class CenaFim extends Cena {
    desenhar() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = "20px Impact";
        this.ctx.TextAlign = "center";
        this.ctx.fillStyle = "red";
        if(this.game.pontuacaoFinal == 13){
          this.ctx.fillStyle = "green";
          this.ctx.fillText(
            "VOCÊ VENCEU!",
            this.canvas.width / 2.5,
            this.canvas.height / 2
          );

        }else{
          this.ctx.fillText(
            "GAME OVER",
            this.canvas.width / 2.5,
            this.canvas.height / 2
          );
        }

        this.ctx.fillText(
          "Sua pontuação: " +this.game.pontuacaoFinal,
          this.canvas.width / 2.8,
          this.canvas.height / 2 + 80
        );
    
        if (this.assets.acabou()) {
            this.ctx.fillStyle = "yellow";
            this.ctx.fillText(
            "Aperte espaço para jogar novamente",
            this.canvas.width / 5,
            this.canvas.height / 2 + 40
          );
        }
        this.game.pontos = 0;
    }

    quadro(t) {

        this.t0 = this.t0 ?? t;
        this.dt = (t - this.t0) / 1000;
    
        if (this.assets.acabou()) {
            if (this.input.comandos.get("PROXIMA_CENA")) {
              this.game.selecionaCena("jogo");
              return;
            }
    
        }
        this.desenhar();
        this.iniciar();
        this.t0 = t;
    }
}