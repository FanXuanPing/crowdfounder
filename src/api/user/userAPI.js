import {api} from "@/api";
import http from "@/utils/http"


// 获取验证码
export function getYzm(telNum){
	let data={
		"mobile":telNum
	};
	return http.post(api.LOGIN_SENDM0ASSAGE,data)
}

//登录
export  function userLogin(username,pwd){
	let data={
		"userName":username,
		"passWord":pwd
	};
	return http.post(api.USER_LOGIN,data)
}
//注册
export function userregister(name,pwd,mob,vercation,cCode){
	let data={
		'userName':name,
		'passWord':pwd,
		'mobile':mob,
		'verification':vercation,
		'cCode':cCode
	}
	
	return http.post(api.USER_REGISTER,data)
}


//获取首页banner
export function getsybanner(data){
	return http.post(api.SY_BANNER,data)
}


//获取首页奖品列表
export function getjplist(){
	let data={
		'status':0,
	}
	return http.post(api.SY_JPLIST,data)
}


//获取期号
export function gettrmnum(termNum){
	let data={
		'termNum':termNum,
		'status':2,
	}
	return http.post(api.SY_JPLIST,data)
}


//开奖页面参与详情
export function getPerson(gid){
	let data={
		'gid':gid
	}
	return http.post(api.JOINERINFO,data)
}
//开奖页面获取奖品信息接口
export function getGoodInfo(gid){
	let data={
		'gid':gid
	}
	return http.post(api.GOODINFO,data)
}
//开奖页面获取资产
export function getassestbyuser(uid){
	let data={
		'uid':uid
	}
	return http.post(api.ASSETSBYUSER,data)
}
export function getcurrencyinfo(){
	return http.post(api.CURRENCY)
}
//检查用户资产
export function getuserassetsbyid(uid,cid){
	let data={
		'uid':uid,
		'cid':cid
	}
	return http.post(api.USERASSETSBYID,data)
}
// 验证资金密码接口
export function vaildatePwd(uid,password){
	let data={
		'uid':uid,
		'passWord':password
	}
	return http.post(api.VALIDATEPWD,data)
}









//我的页面中 我的资产获取
export function getMyassets(uid){
	let data={
		'uid':uid
	}
	return http.post(api.USER_ASSETSBYUSER,data)
}
//我的订单中的四种状态
export function getOrderDetail(stu,uid){
	let data={
		'status':stu,
		'uid':uid
	}
	return http.post(api.ORDERDETAIL,data)
}





//开奖结果
export function getOpenResult(status){
	let data={
		'status':2
	}
	return http.post(api.OPEN_RESULT,data)
}





//设置-更换手机号
export function updatemobile(mobile,verification){
	let data={
		'mobile':mobile,
		'verification':verification
	}
	return http.post(api.UPDATEMOBILE,data)
}

// 手机找回密码 和设置资金密码
export function getbackpwd(mobile,passWord,verification,type){
	let data={
		'mobile':mobile,
		'passWord':passWord,
		'verification':verification,
		'type':type
	}
	return http.post(api.GETBACKPWD,data)
}

// 修改密码
export function updatepwd(uid,passWord,newPassWord){
	let data={
		'uid':uid,
		'passWord':passWord,
		'newPassWord':newPassWord
	}
	return http.post(api.UPDATEPWD,data)
}


export function createOrder(uid,gid,cid,assetsNum,betsNum){
	let data={
		'uid':uid,
		'gid':gid,
		'cid':cid,
		'assetsNum':assetsNum,
		'betsNum':betsNum
	}
	return http.post(api.CREATEORDER,data)
}


// 我的账单
export function myrecord(uid,cid,state){
	let data={
		'uid':uid,
		'cid':cid,
		'state':state
	}
	return http.post(api.MYRECORD,data)
}

//充值
export function recharge(uid,cid){
	let data={
		'uid':uid,
		'cid':cid
	}
	return http.post(api.RECHARGE,data)
}

//提现
export function withdraw(uid,cid,address,amount,fee,pwd){
	let data={
		'uid':uid,
		'cid':cid,
		'address':address,
		'amount':amount,
		'fee':fee,
		'pwd':pwd
	}
	return http.post(api.WITHDRAW,data)
}
//校验体现地址
export function validaddress(cid,address){
	let data={
		'cid':cid,
		'address':address
	}
	return http.post(api.VALIDADDRESS,data)
}
//充提记录
export function repaidrecord(uid,cid){
	let data ={
		'uid':uid,
		'cid':cid
	}
	return http.post(api.REPAIDRECORD,data)
}

//单条充提记录详情
export function repaiddetail(rid){
	let data={
		'rid':rid
	}
	return http.post(api.REPAIDDETAIL,data)
}













