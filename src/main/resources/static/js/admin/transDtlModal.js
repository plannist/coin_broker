console.log("transDtlModal in >> ");
let param = {reqno : "", length : 11, prcsCd : "5"}
$('#transDtlModal').on('show.bs.modal', function(evt){
	console.log("transDtlModal is open >", evt);
	getDetailTransInfo();


});



$('#transDtlModal').on('hidden.bs.modal', function(evt){
	console.log("transDtlModal is hidden >", evt);
});

/*상세주문조회*/
function getDetailTransInfo(){
	console.log("modal param >>", param);
	$.ajax({
		url : "/admin/transReqList",
		type: 'POST',
		contentType : 'application/json',
		data: param,
		success : function(res){
			console.log("res >> ", res);

			//TODO: 화면 표시
		}
	})
}