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
	var type = req.body.type;
	var level = req.body.level;
	var epartment = req.body.epartment;
	var topic = req.body.topic;
	console.log(type,level,epartment,topic);
	subjectDB.findSubject(type,level,epartment,topic).then((data)=>{
		console.log("-------有沙滩",data);
		resp.send(data);
	}).catch((error)=>{
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
	console.log(subject);
	subjectDB.addSubject(subject).then((data)=>{
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	}); 
});

//获取最新题目的id
route.get('/findId',(req,resp)=>{
	console.log("+++++++++++++++++++++++++++++++","id值");
	subjectDB.findId().then((data)=>{
		console.log("----------------",data);
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
	});
});


//向choice表插入数据
route.post('/addChoice',(req,resp)=>{
	var content = req.body.content;
	content = content.split(",");
	console.log("这是选项内容数组",content);
	var correct = req.body.correct;
	correct = correct.split(",");
	console.log("这是正确答案数组",correct);
	var id = req.body.id;
	console.log("这是当前题目的id",id);
	subjectDB.addChoice(content,correct,id).then((data)=>{
		resp.send(data);
	}).catch((error)=>{
		resp.send(error);
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