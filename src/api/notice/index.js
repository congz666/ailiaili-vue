import axios from 'axios';

//获取公告列表
const ListNotices = () => axios.get('/api/v2/notices').then(res => res.data);

//新建公告
const  PostNotice = form => axios.post('/api/v2/notice',form).then(res => res.data);

//更新公告
const  UpdateNotice = (id,form) => axios.put(`/api/v2/notice/${id}`,form).then(res => res.data);

//删除公告
const  DeleteNotice = id => axios.delete(`/api/v2/notice/${id}`).then(res => res.data);


export {
  ListNotices,
  PostNotice,
  UpdateNotice, 
  DeleteNotice
};