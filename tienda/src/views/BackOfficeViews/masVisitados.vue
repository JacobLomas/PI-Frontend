<template>
  <div class="mas-visitados">
    <Chart type="bar" :data="datos" :options="options" ref="chart"/>
  </div>
</template>

<script>
import UserService from "../../services/user.service.js";
export default {
  name: 'masVisitados',
  data() {
    return {
      options: {
        responsive: true,
        hoverMode: "index",
        stacked: false,
      },
      datos: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Visitas",
            backgroundColor: "#42A5F5",
            data: [65, 59, 80, 81, 56, 55, 40],
          },
          {
            label: "Compras",
            backgroundColor: "#FFA726",
            data: [28, 48, 40, 19, 86, 27, 90],
          },
        ],
      },
    };
  },
  async mounted() {
    var res = await UserService.masVisitados();

    if (res.data.success) {
      var stats = res.data.datos;
      
      this.datos.labels = stats.labels;
      this.datos.datasets[0].data = stats.dataVisitas;
      this.datos.datasets[1].data = stats.dataCount;
      this.$refs.chart.refresh()
    }
  },
}
</script>

<style scoped></style>
