<template>
	<el-image style="width: 60%; margin-top: 10%;margin-bottom: 8%; margin-left: 20%; margin-right: 20%;" src="/src/components/icons/logo.png"/>
	<div style="font-size: 30px; font-family: Microsoft YaHei">注册新用户</div>
	<el-divider style="width: 60%; margin: 5% 20%;"/>
	<div>
			<el-input v-model="info.username" style="width: 60%" placeholder="用户名">
					<template #prefix>
							<el-icon><User /></el-icon>
					</template>
			</el-input>
			<el-input v-model="info.password" type="password" style="width: 60%; margin-top: 10px" placeholder="密码" show-password>
					<template #prefix>
							<el-icon><Lock /></el-icon>
					</template>
			</el-input>
            <el-input v-model="info.password_repeat" type="password" style="width: 60%; margin-top: 10px" placeholder="重复密码" show-password>
					<template #prefix>
							<el-icon><Lock /></el-icon>
					</template>
			</el-input>
            <el-input v-model="info.email" style="width: 60%; margin-top: 10px" placeholder="电子邮件地址">
					<template #prefix>
							<el-icon><Message /></el-icon>
					</template>
			</el-input>
			<el-row style="width: 60%; margin-top: 10px; margin-left: 20%;">
				<el-col :span="15">
					<el-input v-model="info.code" placeholder="请输入验证码">
						<template #prefix>
								<el-icon><Check /></el-icon>
						</template>
					</el-input>
				</el-col>
				<el-col :span="4" style="margin-left: 4%">
					<el-button type="danger">获取验证码</el-button>
				</el-col>
			</el-row>
	</div>
	<div>
			<el-button @click="Register" style="width: 40%; margin-top: 20px" type="warning">立即注册</el-button>
	</div>
	<el-divider style="width: 60%; margin: 3% 20%;"/>
	<div style="font-size: 15px; font-family: Fangsong; font-weight: bolder; color: grey; margin-top: 20px">
			已有账号？
			<el-link @click="Login" type="primary" style="translate: 0 -1.5px; font-weight: bolder; font-size: 15px;"> 
				立即登录
				<el-icon><Right /></el-icon> 
			</el-link>
	</div> 
</template>

<script setup>
import { User, Lock, Right, Message, Check } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import router from '@/router';

const info = reactive({
	username: '',
	password: '',
	password_repeat: '',
	email: '',
	code: ''
});

const emailError = ref(false);

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailError.value = !emailRegex.test(info.email);
};

const Register = () => {
	validateEmail();
	if (info.username == '' || info.password == '' || info.password_repeat == '' || info.email == '' || info.code == '') {
		ElMessage.warning('请填写完整信息！');
	} else if (info.password.length < 6) {
		ElMessage.error('密码长度不能小于6位！');
	} else if (info.password != info.password_repeat) {
		ElMessage.error('两次密码输入不一致！');
	} else if (emailError.value) {
		ElMessage.error('邮箱格式错误！');
	} else {
		ElMessage.success('注册成功！');
		router.push('/home');
	}
}

const Login = () => {
	router.push('/');
}

</script>

<style scoped>

</style>
