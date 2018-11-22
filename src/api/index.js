// const baseUrl = "http://coinloot8090.cointobe.vip";
// const baseUrl = "http://10.1.0.11:8090/";
// const baseUrl = "http://192.168.23.33:9090/";
const baseUrl = "http://10.1.0.38:8090/";
const api={
	USER_LOGIN:'/inner/v1/game/login',              //登录接口
	USER_REGISTER:'/inner/v1/game/register',      //注册
	
		
	LOGIN_SENDM0ASSAGE:'/inner/v1/game/sendMassage', // 登录页面获取验证码接口 
	 
	 
	SY_BANNER:'/inner/v1/index/banners',             //首页banner
	//SY_JPLIST:'/inner/v1/index/goodsByStatus',         //首页获取奖品列表
	SY_JPLIST:'/inner/v1/index/goodsList',
	
	JOINERINFO:'/inner/v1/order/joinerInfo',         //开奖界面参与玩家参 与次数参与时间
	ASSETSBYUSER:'/inner/v1/assets /assetsByUser',          //获取用户资产
	GOODINFO:'/inner/v1/goods/goodsInfo',                    //奖品详情
	CURRENCY:'/inner/v1/assets/currencyInfo',                 //资产列表
	USERASSETSBYID:'/inner/v1/assets/userAssetsById',             //查用户资产    
	
	
	
	ORDERDETAIL:'/inner/v1/order/orderDetail',           //我的订单中的四种状态
	OPEN_RESULT:'/inner/v1/index/goodsByStatus',          //开奖结果
	
	
	USER_ASSETSBYUSER:'/inner/v1/assets/assetsByUser',   //我的页面 进来我的资产接口
	
	
	UPDATEMOBILE:'/inner/v1/game/updateMobile',     //设置-更换手机号
	
	GETBACKPWD:'/inner/v1/game/getBackPassWord',//手机找回密码  和设置资金密码
	UPDATEPWD:'/inner/v1/game/updatePassWord', //修改密码
	
	
	
	CREATEORDER:'/inner/v1/order/createOrder',     //下注接口
	VALIDATEPWD:'/inner/v1/game/validatePassWord',  //验证资金密码接口
	
	
	
	MYRECORD:'/inner/v1/assets/myAssetsRecords' , //我的账单记录
	
	
	
	RECHARGE:'/inner/v1/wallet/recharge', //充值
	REPAIDRECORD:'/inner/v1/wallet/repaidRecord' ,//转账记录
	
	
	WITHDRAW:'/inner/v1/wallet/withdraw',  //提币
	VALIDADDRESS:'/inner/v1/wallet/validAddress' ,//校验提现地址
	REPAIDDETAIL:'/inner/v1/wallet/repaidDetail' ,//单挑充提记录
}
export {baseUrl,api};