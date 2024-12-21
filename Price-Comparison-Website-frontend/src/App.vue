<script setup>
import { User, Lock, Right } from '@element-plus/icons-vue';
</script>

<template>
	<div style="width: 100vw; height: 100vh; overflow: hidden; display: flex">
		<div style="flex: 1">
			<el-image style="width: 100%; height: 100%"
						src="https://img.52desk.com/tp/185700iE26b.jpg"/>
		</div>
		<div style="width: 30%; background-color:aliceblue; text-align: center">
			<el-image style="width: 60%; margin-top: 20%;margin-bottom: 8%; margin-left: 20%; margin-right: 20%;" src="../public/logo.png"/>
			<div style="font-size: 30px; font-family: Microsoft YaHei">登录</div>
			<el-divider style="width: 60%; margin: 5% 20%;"/>
			<div>
				<el-input style="width: 60%" placeholder="用户名/邮箱">
					<template #prefix>
						<el-icon><User /></el-icon>
					</template>
				</el-input>
				<el-input style="width: 60%; margin-top: 10px" placeholder="密码">
					<template #prefix>
						<el-icon><Lock /></el-icon>
					</template>
				</el-input>
			</div>
			<el-row>
				<el-col :span="13" style="margin-top: 7px">
					<el-checkbox>
						<p style="color: dodgerblue;">保持登录</p>
					</el-checkbox>
				</el-col>
				<el-col :span="9">
					<el-link>
						<p style="color: dodgerblue;">忘记密码?</p>
					</el-link>
				</el-col>
			</el-row>
			<div>
				<el-button style="width: 40%; margin-top: 15px" type="success">立即登录</el-button>
			</div>
			<el-divider style="width: 60%; margin: 3% 20%;"/>
			<div>
				<el-button style="width: 40%;" type="warning">
					没有账号？立即注册
					<el-icon style="margin-left: 5px;"><Right /></el-icon>
				</el-button>
			</div>
		</div>	
  </div> 
</template>

<style scoped>

</style>
