Vue.component("grafico-sectores", {
    props: ["datos"],
    template: `    
                    <canvas id="sectores" :width='width' :height='height'></canvas>
               `,
    mounted() {
        this.crearLienzo();
        if (this.datos.length > 0) {
            this.sectores();
        }
    },
    data() {
        return {
            width: 900,
            height: 550,
            xDato: 600,
            alturaVacio: 40,
            sizeCuadrado: 20,
            colorNegro: "#000000",
            margenTexto: 40,
            capacidadAlturaMax: 450,
        }
    },
    computed: {
        radio() {
            return 550 / 2 - 5;
        },
        centerx() {
            return 900 / 3.3;
        },
        centery() {
            return 550 / 2;
        },
        total() {
            return this.datos.map(e => e.cantidad).reduce((anterior, actual) => parseInt(anterior) + parseInt(actual));
        },
        offset() {
            return Math.PI / 2;
        },
        fraccion() {
            return (550 - (this.alturaVacio * 2)) / this.datos.length;
        },
        yDato() {
            return 40 + this.alturaVacio;
        },
        fraccionDatos() {
            return this.capacidadAlturaTotal / this.datos.length;
        },
        capacidadAlturaTotal() {
            return this.capacidadAlturaMax - this.alturaVacio * 2;
        },
    },
    methods: {
        crearLienzo() {
            this.lienzo = document.querySelector("#sectores").getContext('2d');
        },
        sectores() {
            let calculo = 0;
            let calculo2 = 0;
            this.lienzo.font = '24px "Tahoma"';
            for (let i = 0; i < this.datos.length; i++) {
                this.lienzo.beginPath();
                this.lienzo.fillStyle = this.datos[i].color;
                this.lienzo.moveTo(this.centerx, this.centery);
                let sector = Math.PI * (2 * this.datos[i].cantidad / this.total);
                this.lienzo.arc(this.centerx, this.centery, this.radio, calculo - this.offset, calculo + sector - this.offset, false);
                this.lienzo.lineTo(this.centerx, this.centery);
                this.lienzo.fill();
                calculo += sector;
                this.lienzo.fillRect(this.xDato, (this.height - this.alturaVacio * 3) - calculo2, this.sizeCuadrado, this.sizeCuadrado);
                this.lienzo.closePath();
                this.lienzo.fillStyle = this.colorNegro;
                this.lienzo.fillText(this.datos[i].nombre + " (" + this.porcentaje(this.datos[i].cantidad) + "%)", this.xDato + this.margenTexto, (this.height - this.alturaVacio * 3) - calculo2 + this.sizeCuadrado);
                calculo2 += this.fraccionDatos;
            }
        },
        limpiar() {
            this.lienzo.clearRect(0, 0, this.width, this.height);
        },
        porcentaje(cantidad) {
            return (cantidad / this.total * 100).toFixed(2);
        }
    }
});