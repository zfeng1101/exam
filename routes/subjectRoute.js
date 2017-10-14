require('babel-polyfill');
var express = require('express');
var route = express.Router();
var subjectDB = require('../db/subjectDB');

//查询所有类型数据
route.get('/findAlltype',(req,resp)=>{
	console.log("+++++++++++++++++++++++++++++++","类型");
	subjectDB.findAlltype().then((data)=>{
		console.log("----------------",data);
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
});


//查询所有难易程度数据
route.get('/findAlllevel',(req,resp)=>{
	console.log("+++++++++++++++++++++++++++++++","难易程度");
	subjectDB.findAlllevel().then((data)=>{
		console.log("----------------",data);
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
});


//查询所有方向数据
route.get('/findAlldepartment',(req,resp)=>{
	console.log("+++++++++++++++++++++++++++++++","方向");
	subjectDB.findAlldepartment().then((data)=>{
		console.log("----------------",data);
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
});


//查询所有知识点数据
route.get('/findAlltopic',(req,resp)=>{
	console.log("+++++++++++++++++++++++++++++++","知识点");
	subjectDB.findAlltopic().then((data)=>{
		console.log("----------------",data);
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
});


//查询所有已有题目
route.post('/findSubject',(req,resp)=>{
	console.log("++++++++++++++++++++++++++++++++++","选中的题目");
	//依次获取前台传过来的参数
	var type = req.body.type;
	var level = req.body.level;
	var epartment = req.body.epartment;
	var topic = req.body.topic;
	console.log(type,level,epartment,topic);
	//然后调用findSubject这个方法,把参数传过去
	subjectDB.findSubject(type,level,epartment,topic).then((data)=>{
		console.log("-------有沙滩",data);
		//把查找到的数据发送到前端
		resp.send(data);
	}).catch((error)=>{
		//如果出错，就返回错误信息
		resp.send(error);
	});
});


//查询选项
route.post('/findContent',(req,resp)=>{
	var id = req.body.id;
	subjectDB.findContent(id).then((data)=>{
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
})


//审查
route.post('/checkState',(req,resp)=>{
	var id = req.body.id;
	var checkState = req.body.checkState;
	console.log(id,checkState);
	subjectDB.checkState(id,checkState).then((data)=>{
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
});


//模糊查询或是关键字查询
route.get('/query/:keys',(req,resp)=>{
	var keys = req.params.keys;
	console.log(keys);
	subjectDB.query(keys).then((data)=>{
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
});


//向subject表中添加题目
route.post('/addSubject',(req,resp)=>{
	var subject = req.body;
	console.log('subject-------',subject);
	subjectDB.addSubject(subject).then((data)=>{
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	}); 
});

//获取最新题目的id
route.get('/findId',(req,resp)=>{
	// console.log("+++++++++++++++++++++++++++++++","id值");
	subjectDB.findId().then((data)=>{
		// console.log("----------------",data);
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
});


//向choice表插入数据
route.post('/addChoice',(req,resp)=>{
	var content = req.body.content;
	content = content.split(",");
	var correct = req.body.correct;
	correct = correct.split(",");
	var id = +req.body.id;
	console.log('id',id)
	content.forEach(function(item,index){
		var f = correct[index];
		subjectDB.addChoice(item,f,id).then((data)=>{
			return ;
			resp.send(data);
		}).catch((error)=>{
			console.log('aaaa');
			resp.send(error);
		}); 	
	});
});



//删除题目
route.post('/delSubject',(req,resp)=>{
	var id = req.body.id;
	console.log("+++++++++++++++++++++++++++++++","id值");
	subjectDB.delSubject(id).then((data)=>{
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
});

module.exports = route;