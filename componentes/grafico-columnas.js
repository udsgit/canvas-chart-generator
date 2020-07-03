Vue.component("grafico-columnas", {
    props: ["datos"],
    template: `
                    <canvas id="columnas" :width='width' :height='height' ></canvas>
               `,
    mounted() {
        this.crearLienzo();
        if (this.datos.length > 0) {
            this.columnas();
        }
    },
    data() {
        return {
            width: 900,
            height: 550,
            lienzo: "",
            capacidadAlturaMax: 450,
            margenGrafico: 200,
            anchoVacio: 40,
            capacidadAnchoMax: 500,
            capacidadAnchoMin: 40,
            alturaBarra: 0,
            colorNegro: "#000000",
            xDato: 550,
            sizeCuadrado: 20,
            margenTexto: 30,
        }
    },

    methods: {
        crearLienzo() {
            this.lienzo = document.querySelector("#columnas").getContext('2d');
        },
        columnas() {
            //base
            this.lienzo.beginPath();
            this.lienzo.textAlign = "end";
            this.lienzo.font = '24px "Tahoma"';
            this.lienzo.moveTo(40, 40);
            this.lienzo.lineTo(40, 500);
            this.lienzo.moveTo(500, 40)
            this.lienzo.lineTo(500, 500);
            let calculo = 0;
            for (let i = 0; i <= this.maxNumeros; i++) {
                this.lienzo.moveTo(500, 490 - calculo);
                this.lienzo.lineTo(30, 490 - calculo);
                if (this.maxNumeros <= 9) {
                    this.lienzo.fillText(i, 27, 500 - calculo);
                } else {
                    if (i % 10 == 0) {
                        this.lienzo.fillText(i, 27, 500 - calculo);
                    }
                }
                calculo += this.fraccion;
            }
            this.lienzo.stroke();
            this.lienzo.closePath();
            //barras
            calculo = 0;
            this.lienzo.textAlign = "start";
            for (let i = 0; i < this.datos.length; i++) {
                this.lienzo.beginPath();
                this.lienzo.fillStyle = this.datos[i].color;
                this.alturaBarra = this.datos[i].cantidad * this.fraccion;
                this.lienzo.fillRect(this.xBarra + calculo, this.yBarra, this.anchoBarra, -this.alturaBarra);
                this.lienzo.closePath();
                calculo += this.anchoBarra;
            }
            //informacion
            calculo = 0;
            for (let i = 0; i < this.datos.length; i++) {
                this.lienzo.beginPath();
                this.lienzo.fillStyle = this.datos[i].color;
                this.lienzo.fillRect(this.xDato, (this.height - this.anchoVacio * 3) - calculo, this.sizeCuadrado, this.sizeCuadrado);
                this.lienzo.fillStyle = this.colorNegro;
                this.lienzo.fillText(this.datos[i].nombre  + " (" + this.datos[i].cantidad + ")", this.xDato + this.margenTexto, (this.height - this.anchoVacio * 3) - calculo + this.sizeCuadrado);
                this.lienzo.closePath();
                calculo += this.fraccionDatos;
            }
        },
        limpiar() {
            this.lienzo.clearRect(0, 0, this.width, this.height);
        },
    },

    computed: {
        fraccion() {
            return this.capacidadAlturaMax / this.maxNumeros;
        },
        capacidadAnchoTotal() {
            return this.capacidadAnchoMax - this.capacidadAnchoMin - this.anchoVacio * 2;
        },
        xBarra() {
            return 40 + this.anchoVacio;
        },
        yBarra() {
            return 490;
        },
        anchoBarra() {
            return this.capacidadAnchoTotal / this.datos.length;
        },
        maxNumeros() {
            return Math.max.apply(null, this.datos.map(e => e.cantidad)) + 1;
        },
        capacidadAlturaTotal() {
            return this.capacidadAlturaMax - this.anchoVacio * 2;
        },
        fraccionDatos() {
            return this.capacidadAlturaTotal / this.datos.length;
        },
        yDato() {
            return this.anchoVacio * 2;
        }
    }
});