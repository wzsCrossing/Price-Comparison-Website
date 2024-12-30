<template>
	<el-scrollbar height="100%" style="width: 100%; opacity: 1;">
		
		<div style="margin-top: 20px; margin-left: 40px; font-size: 2em; font-weight: bold; color: grey; margin-bottom: 50px;">
			关注商品列表
		</div>

		<div class="container">
			<div class="commodityBox" v-for="item in FollowCommodities">
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
import { Star, Link, DataLine } from '@element-plus/icons-vue'
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue';
import store from '@/stores/store';
import LineChart from '@/components/main/LineChart.vue';

let FollowCommodities = ref([]);
let dialogVisible = ref(false);
let chartData = ref([]);

onMounted(() => {
    axios.post('/user/followed', {
        username: store.state.currentUser
    }).then(response => {
        FollowCommodities.value = response.data;
    });
});

async function Follow(item) {
	ElMessage.success('关注成功');
	item.followed = true;

    let Commodities = store.state.Commodities;
    for (let commodity of Commodities) {
        if (commodity.cid === item.cid) {
            commodity.followed = true;
            break;
        }
    }
    store.commit('setCommodities', Commodities);

	await axios.post('/commodity/follow', {
		username: store.state.currentUser,
		cid: item.cid
	});
}

async function Unfollow(item) {
	ElMessage.success('取消关注成功');
	item.followed = false;

    let Commodities = store.state.Commodities;
    for (let commodity of Commodities) {
        if (commodity.cid === item.cid) {
            commodity.followed = false;
            break;
        }
    }
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