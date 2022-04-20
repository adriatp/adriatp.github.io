window.chartColors = {
	green: '#75c181',
	gray: '#a9b5c9',
	text: '#252930',
	border: '#e7e9ed'
};

var lineChartConfig = {
	type: 'line',

	data: {
        
        labels: erto["Data"],
		
		datasets: [{
                label: "Nombre d'expedients",
                borderDash: [3, 5],
                fill: false,
                backgroundColor: window.chartColors.green,
                borderColor: window.chartColors.green,
                data: erto["Nombre d'expedients"],
            },
            {
                label: "Nombre d'afectats",
                fill: false,
                backgroundColor: window.chartColors.gray,
                borderColor: window.chartColors.gray,
                data: erto["Nombre d'afectats"],
            }]
	},
	options: {
		responsive: true,		
		
		legend: {
			display: true,
			position: 'bottom',
			align: 'end',
		},

		tooltips: {
			mode: 'index',
			intersect: false,
			titleMarginBottom: 10,
			bodySpacing: 10,
			xPadding: 16,
			yPadding: 16,
			borderColor: window.chartColors.border,
			borderWidth: 1,
			backgroundColor: '#fff',
			bodyFontColor: window.chartColors.text,
			titleFontColor: window.chartColors.text
		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},
				scaleLabel: {
					display: false,
				
				}
			}],
			yAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},
				scaleLabel: {
					display: false,
				},
				ticks: {
		            beginAtZero: true
		        },
			}]
		}
	}
};

new Chart(document.getElementById('canvas_viz_1'), lineChartConfig);