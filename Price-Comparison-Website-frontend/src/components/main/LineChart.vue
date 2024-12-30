<template>
	<div ref="chartContainer" style="width: 100%; height: 60vh;"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
	chartData: {
		type: Object,
		required: true
	}
});

const chartContainer = ref(null);
let chart = null;

onMounted(() => {
	chart = echarts.init(chartContainer.value);
	updateChart(props.chartData);
});

watch(() => props.chartData, (newData) => {
	updateChart(newData);
});

const updateChart = (data) => {
	const option = {
		grid: {width: '80%', height: '60%', left: '8%', top: '15%'},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			show: true,
			textStyle: {
				color: 'black',
				weight: 'bold',
				fontSize: 15
			}
		},
		xAxis: {
			type: 'time',
			name: '时间',
			nameTextStyle: {
				fontSize: 15,
				fontWeight: 'bold'
			},
		},
		yAxis: {
			type: 'value',
			name: '价格',
			nameTextStyle: {
				fontSize: 15,
				fontWeight: 'bold'
			},
			axisLabel: {
				formatter: '{value} 元'
			}
		},
		series: [
			{
				type: 'line',
				data: data.map(item => [item.label, item.value]),
			}
		],
		dataZoom: [
      {
        type: 'slider',
        bottom: '10%',
        start: 0,
        end: 100,
        textStyle: {
          color: 'rgb(230, 230, 230, 1)',
        }
      }, {
        type: 'inside',
        start: 0,
        end: 100
      }
    ],
	};

	chart.setOption(option);
};

onBeforeUnmount(() => {
	if (chart) {
		chart.dispose();
	}
});
</script>

<style scoped>
</style>
