<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <el-aside width="18%">
			<el-image style="width: 80%; margin-top: 20%;margin-bottom: 8%; margin-left: 10%; margin-right: 10%;" src="/src/components/icons/logo.png"/>
      <el-scrollbar>
        <el-menu default-active="0">
					<el-menu-item @click="HomeClick" index="0">
						<el-icon><HomeFilled /></el-icon>
						<p style="font-weight: bolder;">首页</p>
					</el-menu-item>
					<el-divider style="width: 80%; margin: 0% auto;"></el-divider>
          <el-sub-menu index="1">
            <template #title>
              <el-icon><UserFilled /></el-icon> 
							<p style="font-weight: bolder;">个人中心</p>
            </template>
              <el-menu-item @click="InfoClick" index="1-1">用户信息维护</el-menu-item>
              <el-menu-item @click="FollowClick" index="1-2">关注商品列表</el-menu-item>
          </el-sub-menu>
					<el-divider style="width: 80%; margin: 0% auto;"></el-divider>
					<el-menu-item @click="CommodityClick" index="2">
						<el-icon><Goods /></el-icon>
						<p style="font-weight: bolder;">商品查询中心</p>
					</el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header>
				<div>
					<span class="header_left" style="margin-top: 18px;">
						<el-tooltip content="折叠侧边栏" placement="bottom" effect="dark">
							<el-icon @click = "" style="font-size: 30px;"><Fold /></el-icon>
						</el-tooltip>
					</span>
					<span class="header_right">
						<el-tooltip content="通知" placement="bottom" effect="dark">
							<el-icon @click = "" style="margin-top: 26px; margin-right: 25px;"><BellFilled /></el-icon>
						</el-tooltip>	
						<p style="color: dimgray; font-weight: bolder; font-family:'Courier New', Courier, monospace; margin-right: 30px; margin-top: 25px;">Hi, {{store.state.currentUser}} !</p>
						<el-button @click = "Logout" type="danger" style="margin-top: 17px; font-size: 13px;">
							退出登录
							<el-icon style="margin-left: 5px;"><SwitchButton /></el-icon>
						</el-button>
					</span>
				</div>
      </el-header>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { Goods, UserFilled, HomeFilled, Fold, SwitchButton, BellFilled } from '@element-plus/icons-vue'
import router from '@/router';
import { ElMessage } from 'element-plus';
import store from '@/stores/store';

const HomeClick = () => {
	router.push('/home');
}

const InfoClick = () => {
	router.push('/user-info');
}

const FollowClick = () => {
	router.push('/user-follow');
}

const CommodityClick = () => {
	router.push('/commodity');
}

const Logout = () => {
	ElMessage.success('退出登录成功！');
	store.commit('resetUser');
	router.push('/');
}

</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: white;
  color: var(--el-text-color-primary);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
	height: 8%;
	font-size: 17px;

	.header_left {
		float: left;
		margin-left: 5px;
	}

	.header_right {
		float: right;
		display: flex
	}
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background-image: url("/src/components/icons/aside.png");
	background-size: cover;
}

.layout-container-demo .el-scrollbar {
	opacity: 0.5;
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
	background-color: #f5f7fa;
	
}

</style>