<template>
	<el-image style="width: 60%; margin-top: 20%;margin-bottom: 8%; margin-left: 20%; margin-right: 20%;" src="/src/components/icons/logo.png"/>
	<div style="font-size: 30px; font-family: Microsoft YaHei">登录</div>
	<el-divider style="width: 60%; margin: 5% 20%;"/>
	<div>
			<el-input v-model="info.username" style="width: 60%" placeholder="用户名/邮箱">
					<template #prefix>
							<el-icon><User /></el-icon>
					</template>
			</el-input>
			<el-input v-model="info.password" type="password" style="width: 60%; margin-top: 10px" placeholder="密码" show-password>
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
			<el-button @click="Login" style="width: 40%; margin-top: 15px" type="success">立即登录</el-button>
	</div>
	<el-divider style="width: 60%; margin: 3% 20%;"/>
	<div style="font-size: 15px; font-family: Fangsong; font-weight: bolder; color: grey; margin-top: 20px">
			没有账号？
			<el-link @click="Register" type="primary" style="translate: 0 -2px; font-weight: bolder; font-size: 15px;"> 
				立即注册
				<el-icon><Right /></el-icon> 
			</el-link>
	</div> 
</template>

<script setup>
import { User, Lock, Right } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';
import router from '@/router';

const info = reactive({
	username: '',
	password: ''
});

const Login = () => {
	if (info.username == '' || info.password == '') {
		ElMessage.warning('用户名或密码不能为空！');
	} else if (info.username == 'admin' && info.password == '123456') {
		ElMessage.success('登录成功！');
		router.push('/home');
	} else {
		ElMessage.error('用户名或密码错误！');
	}
}

const Register = () => {
	router.push('/register');
}

</script>

<style scoped>

</style>
