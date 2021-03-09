export default class Mapa {
    constructor(linhas = 8, colunas = 12, tamanho = 32){
        this.LINHAS = linhas;
        this.COLUNAS = colunas;
        this.SIZE = tamanho;
        this.tiles = [];
        for (let l = 0; l < this.LINHAS; l++) {
            this.tiles[l] = [];
            for (let c = 0; c < this.COLUNAS; c++) {
                this.tiles[l][c] = 0;   
            }
        }
        this.cena = null;
    }

    desenhar(ctx){
        for (let l = 0; l < this.LINHAS; l++) {
            for (let c = 0; c < this.COLUNAS; c++) {
                switch(this.tiles[l][c]){
                    case 1:
                        /*
                        ctx.fillStyle = "grey";
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = "black";
                        */
                        ctx.drawImage(this.cena.assets.img("wall"), c*this.SIZE, l*this.SIZE);

                        break;
                    case 2:
                        /*
                        ctx.fillStyle = "red";
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = "orange";
                        break;
                        */
                        ctx.drawImage(this.cena.assets.img("water"), c*this.SIZE, l*this.SIZE);
                    default:
                        /*
                        ctx.fillStyle = "black";
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = "grey";
                        */
                        ctx.drawImage(this.cena.assets.img("ground-tile"), c*this.SIZE, l*this.SIZE);
                    }
                    /*
                    ctx.fillRect(c*this.SIZE, l*this.SIZE, this.SIZE, this.SIZE);
                    ctx.strokeRect(c*this.SIZE, l*this.SIZE, this.SIZE, this.SIZE);
                    */
            }
        }
    }
    carregaMapa(modelo){
        this.LINHAS = modelo.length;
        this.COLUNAS = modelo[0]?.length ?? 0;

        this.tile = [];
        for (let l = 0; l < this.LINHAS; l++) {
            this.tiles[l] = [];
            for (let c = 0; c < this.COLUNAS; c++) {
                this.tiles[l][c] = modelo[l][c];   
            }
        }
    }
}