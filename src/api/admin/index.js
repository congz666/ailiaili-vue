import axios from 'axios';

//登录
const AdminLogin = ruleForm => axios.post('/api/v2/admin/login', ruleForm).then(res => res.data);

//获取个人信息
const getAdmin = () => axios.get('/api/v2/admin/me').then(res => res.data);

//获取管理员信息
const Exit = () => axios.delete('/api/v2/admin/logout').then(res => res.data);

export {
  AdminLogin,
  getAdmin,
  Exit
};