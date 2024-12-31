<template>
	<el-scrollbar height="100%" style="width: 100%; opacity: 1;">
		<el-image style="width: 60%; margin-top: 20%;margin-bottom: 8%; margin-left: 20%; margin-right: 20%;" src="https://s21.ax1x.com/2025/01/01/pAzjLmn.png"/>
		<div style="font-size: 2em; font-family: Microsoft YaHei">登录</div>
		<el-divider style="width: 60%; margin: 5% 20%;"/>
		<div>
				<el-input v-model="info.username" style="width: 60%" placeholder="用户名">
						<template #prefix>
								<el-icon><User /></el-icon>
						</template>
				</el-input>
				<el-input v-model="info.password" type="password" style="width: 60%; margin-top: 2vh" placeholder="密码" show-password>
						<template #prefix>
								<el-icon><Lock /></el-icon>
						</template>
				</el-input>
		</div>
		<div>
				<el-button @click="Login" style="width: 40%; margin-top: 4vh" type="success">立即登录</el-button>
		</div>
		<el-divider style="width: 60%; margin: 3% 20%;"/>
		<div style="font-size: 15px; font-family: Fangsong; font-weight: bolder; color: grey; margin-top: 3vh">
				没有账号？
				<el-link @click="Register" type="primary" style="translate: 0 -2px; font-weight: bolder; font-size: 15px;"> 
					立即注册
					<el-icon><Right /></el-icon> 
				</el-link>
		</div>
	</el-scrollbar>
</template>

<script setup>
import { User, Lock, Right } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';
import router from '@/router';
import axios from 'axios';
import store from '@/stores/store';

const info = reactive({
	username: '',
	password: ''
});

async function Login() {
	if (info.username == '' || info.password == '') {
		ElMessage.warning('用户名或密码不能为空！');
	} else {
		const response = await axios.post('/login', {
			username: info.username,
			password: info.password
		});
		
		if (response.data == '登录成功') {
			ElMessage.success('登录成功！');
			store.commit('setUser', info.username);
			router.push('/home');
		} else {
			ElMessage.error(response.data);
		}
	}
}

const Register = () => {
	router.push('/register');
}

</script>

<style scoped>

</style>
