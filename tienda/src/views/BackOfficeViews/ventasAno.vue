<template>
  <div class="ventas-ano">
    <Chart type="line" :data="datos" :options="options" ref="chart" />
  </div>
</template>

<script>
import UserService from "../../services/user.service.js";
export default {
  name: "ventasAno",
  data() {
    return {
      options: {
        responsive: true,
        hoverMode: "index",
        stacked: false,
      },
      datos: {
        labels: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ],
        datasets: [
          {
            label: "Total de ventas",
            data: [],
            fill: true,
            borderColor: "#42A5F5",
          },
          {
            label: "Importe de ventas",
            data: [],
            fill: true,
            borderColor: "#FFA726",
          },
        ],
      },
    };
  },
  async mounted() {
    var res = await UserService.getVentasAno(new Date().getFullYear());
    var stats = res.data.estadisticas;
    var sum = [];
    var count = [];
    if (res.data.success) {
      stats.forEach((stat) => {
        sum.push(stat.sum == null ? 0 : stat.sum);
        count.push(stat.count == null ? 0 : stat.count);
      });
      this.datos.datasets[0].data = count;
      this.datos.datasets[1].data = sum;
      this.$refs.chart.refresh();
    }
  },
};
</script>

<style scoped></style>
