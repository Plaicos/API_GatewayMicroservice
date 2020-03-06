// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Area Chart Example
var ctx = document.getElementById("myAreaChartF");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["Mat 1", "Mat 2", "Mat 3", "Mat 4", "Mat 5", "Mat 6", "Mat 7", "Mat 8", "Mat 9", "Mat 10"],
    datasets: [{
      label: "Acessos",
      lineTension: 0.3,
      backgroundColor: "#DAF1FD",
      borderColor: "#5B9279",
      pointRadius: 5,
      pointBackgroundColor: "#5B9279",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#CBE3E1",
      pointHitRadius: 50,
      pointBorderWidth: 2,
      data: [100, 301, 262, 183, 182, 286, 312, 332, 258, 241, 326, 314, 381],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 400,
          maxTicksLimit: 5
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  }
});
