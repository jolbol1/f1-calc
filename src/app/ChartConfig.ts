import type { ChartData, ChartItem, ChartOptions, ChartType } from 'chart.js';
import {
	CategoryScale,
	Chart,
	LineController,
	LineElement,
	PointElement,
	TimeScale,
	TimeSeriesScale,
	Tooltip
} from 'chart.js';
import 'chartjs-adapter-moment';

Chart.register(
	LineElement,
	LineController,
	TimeScale,
	TimeSeriesScale,
	CategoryScale,
	PointElement,
	Tooltip
);

const legendColor = 'black';

export const registerlapTimeChart = (
	chartElement: CanvasRenderingContext2D,
	aiTimes: { [key: string]: number }
): Chart =>
	new Chart(<ChartItem>chartElement, {
		type: 'line' as ChartType,
		data: {
			labels: Object.keys(aiTimes),
			datasets: [
				{
					data: Object.values(aiTimes),
					borderColor: 'rgba(79, 70, 229, 100)'
				}
			]
		} as ChartData,
		options: {
			scales: {
				y: {
					title: {
						text: 'Lap Time',
						color: legendColor,
						display: true
					},
					type: 'time',
					time: {
						tooltipFormat: 'mm:ss.SSS',
						unit: 'second',
						displayFormats: {
							second: 'mm:ss.SSS'
						}
					},
					ticks: {
						color: legendColor
					},
					grid: {
						color: '#6B7280'
					},
					min: Math.min(...Object.values(aiTimes)),
					max: Math.max(...Object.values(aiTimes))
				},
				x: {
					title: {
						text: 'AI Level',
						color: legendColor,
						display: true
					},
					grid: {
						color: '#6B7280'
					},
					ticks: {
						maxTicksLimit: 12,
						color: legendColor
					}
				}
			},
			elements: {
				point: {
					borderWidth: 0,
					radius: 10,
					backgroundColor: 'rgba(0,0,0,0)'
				}
			},
			plugins: {
				legend: {
					display: false
				}
			}
		} as ChartOptions
	});
