Vue.component("grafico-barras", {
    props: ["datos"],
    template: `
                    <canvas id="barras" :width='width' :height='height'></canvas>
               `,
    mounted() {
        this.crearLienzo();
        if (this.datos.length > 0) {
            this.barras();
        }
    },
    data() {
        return {
            width: 900,
            height: 550,
            lienzo: "",
            capacidadAlturaMax: 450,
            margenGrafico: 350,
            anchoVacio: 40,
            capacidadAnchoMax: 500,
            capacidadAnchoMin: 40,
            alturaBarra: 0,
            colorNegro: "#000000",
        }
    },
    methods: {
        crearLienzo() {
            this.lienzo = document.querySelector("#barras").getContext('2d');
        },

        limpiar() {
            this.lienzo.clearRect(0, 0, this.width, this.height);
        },
        barras() {
            //base
            this.lienzo.beginPath();
            this.lienzo.font = '24px "Tahoma"';
            this.lienzo.moveTo(30 + this.margenGrafico, 40);
            this.lienzo.lineTo(490 + this.margenGrafico, 40);
            this.lienzo.moveTo(30 + this.margenGrafico, 500)
            this.lienzo.lineTo(490 + this.margenGrafico, 500);
            let calculo = 0;
            for (let i = 0; i <= this.maxNumeros; i++) {
                this.lienzo.moveTo(40 + calculo + this.margenGrafico, 40);
                this.lienzo.lineTo(40 + calculo + this.margenGrafico, 510);
                if (this.maxNumeros <= 9) {
                    this.lienzo.fillText(i, 35 + calculo + this.margenGrafico, 540);
                } else {
                    if (i % 10 == 0) {
                        this.lienzo.fillText(i, 35 + calculo + this.margenGrafico, 540);
                    }
                }
                calculo += this.fraccion;
            }
            this.lienzo.stroke();
            this.lienzo.closePath();
            //barras
            this.lienzo.textAlign = "end";
            calculo = 0;
            for (let i = 0; i < this.datos.length; i++) {
                this.lienzo.beginPath();
                this.alturaBarra = this.datos[i].cantidad * this.fraccion;
                this.lienzo.fillStyle = this.datos[i].color;
                this.lienzo.fillRect(this.xBarra, this.yBarra + calculo, this.alturaBarra, + this.anchoBarra);
                this.lienzo.fillStyle = this.colorNegro;
                this.lienzo.fillText(this.datos[i].nombre + " (" + this.datos[i].cantidad + ")", this.margenGrafico, this.yBarra + calculo + (this.anchoBarra / 1.6));
this.lienzo.closePath();
calculo += this.anchoBarra;
            }
        },
    },
computed: {

    fraccion() {
        return this.capacidadAlturaMax / this.maxNumeros;
    },
    capacidadAnchoTotal() {
        return this.capacidadAnchoMax - this.capacidadAnchoMin - this.anchoVacio * 2;
    },
    anchoBarra() {
        return this.capacidadAnchoTotal / this.datos.length;
    },
    xBarra() {
        return this.margenGrafico + 40;
    },
    yBarra() {
        return 40 + this.anchoVacio;
    },
    maxNumeros() {
        return Math.max.apply(null, this.datos.map(e => e.cantidad)) + 1;
    }
}
});