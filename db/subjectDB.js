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
		+type+" and topic_id = "
		+topic+" ";
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
	},


	//向subject表中添加数据
	addSubject(subject){
		var sql = "insert into tbl_exam_subject values(null,'"
		+subject.analysis+"','"
		+subject.answer+"','"
		+subject.checkState+"','"
		+subject.stem+"','"
		+subject.updateTime+"',"
		+subject.epartment+","
		+subject.level+","
		+subject.type+","
		+subject.topic+",null)";
		return pool.execute(sql);
	},

	//由于新插入的数据不知道id，所以需要获取题目的id值
	findId(){
		var sql = "select Max(id) as id from tbl_exam_subject";
		return pool.execute(sql);
	},
	//向选项表中添加制定题目的选项内容和正确答案
	addChoice(content,correct,id){
		content.forEach(function(item,index){
			var sql = "insert into tbl_exam_choice values(null,'"+item+"',"+correct[index]+","+id+" )";
			return pool.execute(sql);

		});
	},


	//删除题目
	delSubject(id){
		var sql = "delete from tbl_exam_subject where id = "+id;
		return pool.execute(sql);
	}

}