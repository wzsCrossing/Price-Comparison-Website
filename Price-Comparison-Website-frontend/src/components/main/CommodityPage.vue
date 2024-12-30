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
					
					<div style="height: 140px; margin-top: -2%; background-color: antiquewhite; padding-top: 1%; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; position: relative;">
						<div style="margin-left: 10px; margin-right: 10px; text-align: start; font-size: 16px;">
							<div class="boxText"> 
								<el-tag style="height: 22px; margin-top: -2px; background-color: #FF0036; color: white;"> {{ item.platform }} </el-tag> 
								{{ item.title }} 
							</div>
						</div>

						<div style="margin-left: 10px; text-align: start; font-size: 16px; display: flex; align-items: center;">
							<span style="color:chocolate">
								￥
								<span style="font-size: 175%;">{{ item.priceInt }}</span>
								.{{ item.priceDec }}
							</span>
							<!-- <span style="margin-left: 12px; margin-top: 10px; color:dimgrey; font-weight: bolder; font-family: Fangsong;">{{ item.stock }} </span> -->
						</div>
						
						<el-button-group style="width: 100%; position: absolute; bottom: 0; left: 0;">
							<el-tooltip content="商品历史价格曲线" placement="bottom" effect="dark">
								<el-button type="primary"  @click="ShowCharts(item.cid)" style="width:33%; border-bottom-left-radius: 10px; border-top-left-radius: 0px;" :icon="DataLine" size="large" />
							</el-tooltip>
							<el-tooltip content="关注该商品" placement="bottom" effect="dark">
								<el-button style="width:34.8%" @click="Follow(item)" v-show="!item.followed" type="info" :icon="Star" size="large"/>
							</el-tooltip>
							<el-tooltip content="取消关注" placement="bottom" effect="dark">
								<el-button style="width:34.8%" @click="Unfollow(item)" v-show="item.followed" type="warning" :icon="Star" size="large"/>
							</el-tooltip>
							<el-tooltip content="商品详情页链接" placement="bottom" effect="dark">
								<el-link :href="item.link" target="_blank" style="width:33%;">
									<el-button type="danger" style="width: 80px; border-bottom-right-radius: 10px; border-top-right-radius: 0px; border-top-left-radius: 0px; border-bottom-left-radius: 0px;" :icon="Link" size="large"/>
								</el-link>
							</el-tooltip>
						</el-button-group>
					</div>

				</div>
			</div>
		</div>

		<el-dialog title="商品历史价格曲线" v-model="dialogVisible" style="font-weight: bolder; margin-left: 32%; margin-top: 10%;">
			<LineChart :chartData="chartData" style="width: 50vw; height: 60vh;" />
		</el-dialog>

	</el-scrollbar>
</template>

<script setup>
import { Search, Star, Link, DataLine } from '@element-plus/icons-vue'
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import store from '@/stores/store';
import LineChart from './LineChart.vue';

let toQuery = ref(store.state.toQuery);
let QueryLoading = ref(false);
let Commodities = ref(store.state.Commodities);
let select_JD = ref(store.state.select_JD);
let select_SN = ref(store.state.select_SN);
let dialogVisible = ref(false);
let chartData = ref([]);

async function QueryCommodity() {
	QueryLoading.value = true;
	const response = await axios.post('/commodity/crawler', {
		username: store.state.currentUser,
		keyword: toQuery.value,
		platforms: {
			JD: select_JD.value,
			SN: select_SN.value
		}
	});
	Commodities.value = response.data;
	QueryLoading.value = false;
	store.commit('setQuery', toQuery);
	store.commit('setCommodities', Commodities);
	store.commit('setSelectJD', select_JD);
	store.commit('setSelectSN', select_SN);
}

async function Follow(item) {
	ElMessage.success('关注成功');
	item.followed = true;
	store.commit('setCommodities', Commodities);
	await axios.post('/commodity/follow', {
		username: store.state.currentUser,
		cid: item.cid
	});
}

async function Unfollow(item) {
	ElMessage.success('取消关注成功');
	item.followed = false;
	store.commit('setCommodities', Commodities);
	await axios.post('/commodity/unfollow', {
		username: store.state.currentUser,
		cid: item.cid
	});
}

async function ShowCharts(cid) {
	const response = await axios.post('/commodity/history', {
		cid: cid
	});

	chartData.value = response.data;
	dialogVisible.value = true;
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
	height: 380px;
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