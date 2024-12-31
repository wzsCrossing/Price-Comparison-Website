<template>
    <el-scrollbar height="100%" style="width: 100%; opacity: 1;">
		
		<div style="margin-top: 20px; margin-left: 40px; font-size: 2em; font-weight: bold; color: grey; margin-bottom: 50px;">
			用户信息维护
		</div>

        <div style="margin-top: 20px; margin-left: 60px; font-size: 1.5em; font-weight: bold; color: grey; margin-bottom: 30px;">
			基本信息
		</div>
        <el-form label-width="auto" style="max-width: 600px; margin-left: 80px; font-weight: bolder;">
            <el-form-item label="用户名：">
                <el-text> {{ UserInfo.username }} </el-text>
            </el-form-item>
            <el-form-item label="绑定邮箱：">
                <el-text> {{ UserInfo.email }} </el-text>
            </el-form-item>
            <el-form-item label="注册时间：">
                <el-text> {{ UserInfo.createAt }} </el-text>
            </el-form-item>
        </el-form>

        <div style="margin-top: 50px; margin-left: 60px; font-size: 1.5em; font-weight: bold; color: grey; margin-bottom: 30px;">
			修改用户名
		</div>
        <el-form label-width="auto" style="max-width: 600px; margin-left: 80px; font-weight: bolder;">
            <el-form-item label="新用户名：">
                <el-input v-model="newUsername" style="width: 50%;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="UpdateUsername" style="width: 15%; margin-left: 15%;">提交</el-button>
            </el-form-item>
        </el-form>

        <div style="margin-top: 50px; margin-left: 60px; font-size: 1.5em; font-weight: bold; color: grey; margin-bottom: 30px;">
			修改密码
		</div>
        <el-form label-width="auto" style="max-width: 600px; margin-left: 65px; font-weight: bolder;">
            <el-form-item label="原密码：">
                <el-input v-model="Password.oldPassword" type="password" style="width: 50%;"></el-input>
            </el-form-item>
            <el-form-item label="新密码：">
                <el-input v-model="Password.newPassword" type="password" style="width: 50%;"></el-input>
            </el-form-item>
            <el-form-item label="重复新密码：">
                <el-input v-model="Password.confirmPassword" type="password" style="width: 50%;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="UpdatePassword" style="width: 15%; margin-left: 17%;">提交</el-button>
            </el-form-item>
        </el-form>

    </el-scrollbar>
</template>

<script setup>
import store from '@/stores/store';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';

let UserInfo = ref({});
let newUsername = ref('');
let Password = ref({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
});

onMounted(() => {
    QueryUser();
});

async function QueryUser() {
    const response = await axios.post('/user/query', {
        username: store.state.currentUser
    });
    UserInfo.value = response.data;
}

async function UpdateUsername() {
    if (UserInfo.value.username === newUsername.value) {
        ElMessage.warning('新用户名不能与原用户名相同');
    } else if (newUsername.value.length < 6) {
        ElMessage.warning('用户名长度不能小于6');
    } else {
        const response = await axios.post('/user/updateUsername', {
            username: UserInfo.value.username,
            newUsername: newUsername.value
        });

        if (response.data === 'exist') {
            ElMessage.error('新用户名已存在');
        } else {
            UserInfo.value.username = newUsername.value;
            store.commit('setUser', newUsername.value);
            newUsername.value = '';
            ElMessage.success('用户名修改成功');
        }
    }
}

async function UpdatePassword() {
    if (Password.value.newPassword.length < 6) {
        ElMessage.warning('密码长度不能小于6');
    } else if (Password.value.newPassword !== Password.value.confirmPassword) {
        ElMessage.warning('两次输入的密码不一致');
    } else {
        const response = await axios.post('/user/updatePassword', {
            username: UserInfo.value.username,
            oldPassword: Password.value.oldPassword,
            newPassword: Password.value.newPassword
        });

        if (response.data === 'success') {
            Password.value.oldPassword = '';
            Password.value.newPassword = '';
            Password.value.confirmPassword = '';
            ElMessage.success('密码修改成功');
        } else if (response.data === 'wrong') {
            ElMessage.error('原密码输入错误');
        } else {
            ElMessage.error('新密码不能与原密码相同');
        }
    }
}

</script>

<style scoped>

</style>