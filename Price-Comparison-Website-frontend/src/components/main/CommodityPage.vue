<template>
	<el-scrollbar height="100%" style="width: 100%; opacity: 1;">
		
		<div style="margin-top: 20px; margin-left: 40px; font-size: 2em; font-weight: bold; color: grey;">
			商品查询中心
		</div>

		<div style="padding-top:5vh;">
			<el-input v-model="toQuery" style="width: 30%; margin-left: 33%;" placeholder="输入商品名称">
				<template #prefix>
					<el-icon><Search /></el-icon>
				</template>
			</el-input>
			<el-button style="margin-left: 20px;" type="primary" @click="QueryCommodity" :loading="QueryLoading">查询</el-button>
		</div>
		<div style="margin-top: 20px; margin-left: 36%; margin-bottom: 2%;">
			<span style="font-weight: 550; color: gray; margin-right: 2%;">查询平台筛选：</span>
			<el-checkbox label="京东" v-model="select_JD" border style="font-weight: bolder; border-radius: 10px; border: 1.5px solid lightgray;" />
			<el-checkbox label="苏宁" v-model="select_SN" border style="font-weight: bolder; border-radius: 10px; margin-left: -1%; border: 1.5px solid lightgrey;" />
		</div>

		<div class="container">
			<div class="commodityBox" v-for="item in Commodities">
				<div>
					
					<el-image :src="item.imgUrl" style="width: 100%; border-top-left-radius: 10px; border-top-right-radius: 10px;"/>
					
					<div style="margin-top: -2%; background-color: antiquewhite; padding-top: 1%; padding-bottom: 4%; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
						<div style="margin-left: 10px; margin-right: 10px; text-align: start; font-size: 16px;">
							<div class="boxText"> 
								<el-tag style="height: 22px; margin-top: -2px; background-color: #FF0036; color: white;"> {{ item.platform }} </el-tag> 
								{{ item.title }} 
							</div>
						</div>

						<div style="margin-top: 5px; margin-left: 10px; text-align: start; font-size: 16px; display: flex; align-items: center;">
							<span style="color:chocolate">
								￥
								<span style="font-size: 175%;">{{ item.priceInt }}</span>
								.{{ item.priceDec }}
							</span>
							<!-- <span style="margin-left: 12px; margin-top: 10px; color:dimgrey; font-weight: bolder; font-family: Fangsong;">{{ item.stock }} </span> -->
							<el-button @click="Follow(item)" v-show="!item.followed" style="margin-left: auto; margin-right: 10%;" type="info" :icon="Star" size="small" circle/>
							<el-button @click="Unfollow(item)" v-show="item.followed" style="margin-left: auto; margin-right: 10%;" type="warning" :icon="Star" size="small" circle/>
						</div>
					</div>

				</div>
			</div>
		</div>
	</el-scrollbar>
</template>

<script setup>
import { Search, Star } from '@element-plus/icons-vue'
import axios from 'axios';
import { ref } from 'vue';

let toQuery = ref('');
let QueryLoading = ref(false);
let Commodities = ref([]);
let select_JD = ref(true);
let select_SN = ref(true);

async function QueryCommodity() {
	QueryLoading.value = true;
	const response = await axios.post('/crawler', {
		keyword: toQuery.value,
		platforms: {
			JD: select_JD.value,
			SN: select_SN.value
		}
	});
	Commodities.value = response.data;
	QueryLoading.value = false;
	console.log(Commodities.value);
}

const Follow = (item) => {
	item.followed = true;
}

const Unfollow = (item) => {
	item.followed = false;
}

</script>

<style scoped>
.container {
	display: flex;
	gap: 20px;
	flex-wrap: wrap;
	margin-bottom: 20px;
	margin-left: 50px;
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