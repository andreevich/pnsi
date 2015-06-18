module.exports = function() {
  return {
    LineObj:function(){
		return {
			MANAG_NO:"",
			P_SIGN_NO:"",
			V_KIND_NO:"",
			V_TYPE_NO:"",
			OWN_NO:"",
			CARGO:"",
			MANAG_NO_1:"",
			STA_NO:"",
			STA_NO_1:"",
			CARGO_SG:"",
			LIST_NO:"",
			COMP_L_BGN:"",
			COMP_L_END:"",
			V_NO_BAN:"",
			V_BAN_PER_BGN:"",
			V_BAN_PER_END:"",
			PR3STR:"",
			ROAD_NO:""
		}
	},
	V_BAN_PERMIT: function(lines) {
	var fff=function(data){
		temp=""
		if (data!==undefined)
			temp = data;
		return temp;
	}
    var date = new Date();
	var t =  
	'---\n'+
	'table: V_BAN_PERMIT\n'+
	'date: '+date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+'\n'+
	'reason: '+lines[0].RESON+'\n'+
	'\n'+
	'insert: \n';
	var line ="";
	for (i=0;i<lines.length;i++){
		line+='- ['+	
			'"'+fff(lines[i].MANAG_NO)+'",'+
			'"'+fff(lines[i].P_SIGN_NO)+'",'+
			'"'+fff(lines[i].V_KIND_NO)+'",'+
			'"'+fff(lines[i].V_TYPE_NO)+'",'+
			'"'+fff(lines[i].OWN_NO)+'",'+
			'"'+fff(lines[i].CARGO)+'",'+
			'"'+fff(lines[i].MANAG_NO_1)+'",'+
			'"'+fff(lines[i].STA_NO)+'",'+
			'"'+fff(lines[i].STA_NO_1)+'",'+
			'"'+fff(lines[i].CARGO_SG)+'",'+
			'"'+fff(lines[i].LIST_NO)+'",'+
			'"'+fff(lines[i].COMP_L_BGN)+'",'+
			'"'+fff(lines[i].COMP_L_END)+'",'+
			'"'+fff(lines[i].todoText)+'",'+
			'"'+fff(lines[i].V_BAN_PER_BGN)+'",'+
			'"'+fff(lines[i].V_BAN_PER_END)+'",'+
			'"'+fff(lines[i].PR3STR)+'",'+
			'"'+fff(lines[i].ROAD_NO)+'"]\n'
		}
	//'- ["21","4","","","","","20","","138507","","059","2012-06-20","2030-06-20","61219846","2014-10-26","2014-10-27","",""]\n'
	
	return t+line;
    }
  };
}