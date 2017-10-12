require('babel-polyfill');
let pool = require('./pool');
module.exports = {
	//获取所有类型数据
	findAlltype(){
		var sql = "select * from tbl_exam_subjecttype";
		return pool.execute(sql);
	},

	//查询所有难易程度数据
	findAlllevel(){
		var sql = "select * from tbl_exam_subjectlevel";
		return pool.execute(sql);
	},

	//查询所有方向数据
	findAlldepartment(){
		var sql = "select * from tbl_exam_epartment";
		return pool.execute(sql);
	},

	//查询所有知识点数据
	findAlltopic(){
		var sql = "select * from tbl_exam_topic";
		return pool.execute(sql);
	},

	//查询题目
	findSubject(type,level,epartment,topic){
		console.log(type,level,epartment,topic);
		// var sql = "select * from tbl_exam_subject where department_id = "
		// +epartment+" and  subjectLevel_id = "
		// +level+" and subjectType_id = "
		// +type+" and topic_id = "+topic+" ";
		var sql = "select tbl_exam_subjecttype.realName as tName,tbl_exam_subjectlevel.realName as lName,tbl_exam_subject.* from tbl_exam_subject,tbl_exam_subjectlevel,tbl_exam_subjecttype where tbl_exam_subject.subjectLevel_id = tbl_exam_subjectlevel.id and tbl_exam_subject.subjectType_id = tbl_exam_subjecttype.id and department_id = "
		+epartment+" and  subjectLevel_id = "
		+level+" and subjectType_id = "
		+type+" and topic_id = "+topic+" ";
		return pool.execute(sql);
	},

	//查询出选项
	findContent(id){
		var sql = "select * from tbl_exam_choice where subject_id = "+id;
		return pool.execute(sql);
	},

	//审核
	checkState(id,checkState){
		var sql = "update tbl_exam_subject set checkState = '"+checkState+"' where id = "+id+" ";
		return pool.execute(sql);
	},

	//模糊查询
	query(keys){
		var sql ="select * from tbl_exam_subject where stem like '%"+keys+"%' ";
		return pool.execute(sql);
	}

}