console.log("transDtlModal in >> ");
let reqno = "";
$('#transDtlModal').on('show.bs.modal', function(evt){
	console.log("transDtlModal is open >", evt);
	getDetailTransInfo();


});



$('#transDtlModal').on('hidden.bs.modal', function(evt){
	console.log("transDtlModal is hidden >", evt);
});

/*상세주문조회*/
function getDetailTransInfo(){
	console.log("modal reqno >>", reqno);
	$.ajax({
		url : "/admin/transReqList",
		type: 'POST',
		contentType : 'application/json',
		data: {reqno : reqno},
		success : function(res){
			console.log("res >> ", res);

			//TODO: 화면 표시
		}
	})
}