const app = new Vue({
    el: 'main',
    data: {
        nuevoDato: { nombre: "", color: "#000000", cantidad: null },
        datos: [],
    },
    updated() {
        this.actualizar();
    },
    methods: {
        agregarDato() {
            this.nuevoDato.nombre.trim().length == 0 ? this.nuevoDato.nombre = "Sin nombre" : null;
            this.nuevoDato.cantidad == null ? this.nuevoDato.cantidad = 1 : null;

            if (this.datos.length < 14) {
                this.datos.push(this.nuevoDato);
                this.nuevoDato = { nombre: "", color: "#000000", cantidad: null };
                this.actualizar();
            }
        },
        actualizar() {
            this.$refs.barras.limpiar();
            this.$refs.columnas.limpiar();
            this.$refs.sectores.limpiar();
            if (this.datos.length > 0) {
                this.$refs.barras.barras();
                this.$refs.columnas.columnas();
                this.$refs.sectores.sectores();
            }
        },
        eliminar(index) {
            this.datos.splice(index, 1);
        }
    }
});