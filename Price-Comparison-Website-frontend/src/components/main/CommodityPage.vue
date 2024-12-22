<template>
	<el-scrollbar height="100%" style="width: 100%; opacity: 1;">
		
		<div style="margin-top: 20px; margin-left: 40px; font-size: 2em; font-weight: bold; color: grey;">
			商品查询中心
		</div>

		<div style="padding-top:5vh; padding-bottom:6vh;">
			<el-input v-model="toQuery" style="width: 30%; margin-left: 35%;" placeholder="输入商品名称">
				<template #prefix>
					<el-icon><Search /></el-icon>
				</template>
			</el-input>
			<el-button style="margin-left: 20px;" type="primary" @click="QueryCommodity">查询</el-button>
		</div>

		<div class="container">
			<div class="commodityBox" v-for="item in tableData" v-show="item.name.includes(toQuery)" :key="item.price">
				<div>
					
					<el-image :src="item.imageUrl" style="width: 100%; border-top-left-radius: 10px; border-top-right-radius: 10px;"/>
					
					<div style="margin-left: 10px; margin-right: 10px; text-align: start; font-size: 16px;">
						<div class="boxText"> 
							<el-tag style="height: 22px; margin-top: -2px; background-color: #FF0036; color: white;"> {{ item.platform }} </el-tag> 
							{{ item.name }} 
						</div>
					</div>

					<div style="margin-top: 5px; margin-left: 10px; text-align: start; font-size: 16px;">
						<span style="color:chocolate">
							￥
							<span style="font-size: 150%;">{{ item.price }} </span>
						</span>
						<span style="margin-left: 10px; color:dimgrey; font-weight: bolder; font-family: Fangsong;">{{ item.address }} </span>
					</div>

				</div>
			</div>
		</div>
	</el-scrollbar>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue';

let toQuery = ref('');

const Commodities = [
	{
		imageUrl: 'http://img.alicdn.com/img/i3/1442240160/O1CN01BiAHnQ1D3KNxD0Dsy_!!4611686018427385504-0-saturn_solar.jpg_.webp',
		name: '2025新年装饰品蛇年福字挂件过年客厅生肖中国结挂饰春节场景布置',
		price: 11.80,
		platform: '淘宝',
		address: '广东 广州'
	}, {
		imageUrl: 'http://img.alicdn.com/img/i2/111546368/O1CN017GMnMc1wub9sBDX6H_!!4611686018427383808-0-saturn_solar.jpg_.webp',
		name: '故宫淘宝｜相思玉兔香薰礼盒闺蜜生日结婚新婚礼物',
		price: 199,
		platform: '京东',
		address: '天津'	
	}
]

let tableData = [];
for (let i = 0; i < 10; i++) {
	tableData = tableData.concat(Commodities);
}

const QueryCommodity = () => {
	console.log(toQuery.value);
}

</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
	margin-bottom: 20px;
}

.commodityBox {
	height: 350px;
	width: 240px;
	background-color: white;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	text-align: center;
	border-radius: 10px;
}

.boxText {
	font-weight: bolder;
	margin-top: 10px;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	line-height: 1.5;
	overflow: hidden;
	text-overflow: ellipsis;
}

</style>