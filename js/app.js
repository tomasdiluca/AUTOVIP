var appSales = new Vue({
  el: "#appSales",
  data: {
    exchangeRate: "",
    cars: [],
    years: [],
    brands: [],
    models: [],
    yearSelected: "",
    brandSelected: "",
    modelSelected: "",
    statusSelected: "",
    currencySelected: "USD",
  },
  methods: {
    onCurrencyChange() {
      if (appSales.currencySelected === "USD") {
        appSales.currencySelected === "UYU";
      } else {
        appSales.currencySelected === "USD";
      }
    },
  },
});

//Cotizacion de la moneda
$.ajax({
  url: "https://ha.edu.uy/api/rates",
  success: function (datosObtenidos) {
    appSales.exchangeRate = datosObtenidos.uyu;
  },
});

//Lista de autos
// En que momento se carga? Cuando cargas la pagina
// Cual es el valor inicial(antes de hacer el llamado ajax)? Vacio: []
// Como muestro la lista de autos en HTML usando VUE? Usando v-for="auto in autos"
$.ajax({
  url: "https://ha.edu.uy/api/cars",
  success: function (datosObtenidos) {
    appSales.cars = datosObtenidos;
  },
});

for (var i = 2021; i >= 1900; i--) {
  appSales.years.push(i);
}

$.ajax({
  url: "https://ha.edu.uy/api/brands",
  success: function (datosObtenidos) {
    appSales.brands = datosObtenidos;
  },
});

$("#input-brand").on("change", cargarModelos);

function cargarModelos() {
  $.ajax({
    url: "https://ha.edu.uy/api/models?brand=" + appSales.brandSelected,
    success: function (datosObtenidos) {
      appSales.models = datosObtenidos;
    },
  });
}

$("#btn-filter").on("click", filtrarAutos);

function filtrarAutos() {
  $.ajax({
    url: `https://ha.edu.uy/api/cars?year=${appSales.yearSelected}&brand=${appSales.brandSelected}&model=${appSales.modelSelected}&status=${appSales.statusSelected}`,
    success: function (datosObtenidos) {
      appSales.cars = datosObtenidos;
    },
  });
}
