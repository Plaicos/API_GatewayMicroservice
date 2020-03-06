// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Bar Chart Example
var ctx = document.getElementById("myBarChartF");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Ponta Grossa", "Curitiba", "Sorocaba", "São Paulo", "Cubatão", "Santos"],
    datasets: [{
      label: "Quantidade",
      backgroundColor: "#5B9279",
      borderColor: "#fff",
      data: [921, 831, 725, 641, 582, 544],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 6
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 1000,
          maxTicksLimit: 5
        },
        gridLines: {
          display: true
        }
      }],
    },
    legend: {
      display: false
    }
  }
});


