console.log("calcModal in >> ");

let nav = {
	coinType : "",
	chargeType : "",
	requestCoinPrice : "",

}

$('#calcModal').on('show.bs.modal', function(evt){
	console.log("transDtlModal is open >", evt);

});

$('#calcModal').on('hidden.bs.modal', function(evt){
	console.log("transDtlModal is hidden >", evt);

	$('#calcForm')[0].reset();

});




function save(){

	//trans_req_mas 업데이트 항목
	// prcsCd, modDttm, coinType, charge_cd, charge_amt, 

	//trans_rcpt_mas merge 항목

	$('#transDtlForm input, textarea').prop('disabled', false);
	$('#chargeCd').prop('disabled', false);

	//prcsCd6Cnt 만 예외
	$('#prcsCd6Cnt').val(null);

	const myForm = document.getElementById("transDtlForm");
	const formData = new FormData(myForm);
	const formVo = Object.fromEntries(formData.entries());
	console.log(formVo);

	$.ajax({
		url: "/admin/transReqSave",
		type: 'POST',
		dataType: 'json',
		data: formVo,
		success: function (res) {
			console.log("res >>", res);
			if (res.statusCode == 'S001') {
				// alertNotice(null, '대행 신청이 정상 수정되었습니다.', () => {
					location.href = "/admin/main";
				// })
			} else {
				alertNotice(null, res.statusMessage, () => {
					location.href = "/admin/main";
				})
			}

		}, error(res) {
			console.log("error:  >>> 저장실패 ", res);
			alertNotice(null, '대행 신청 수정이 실패하였습니다. 다시 시도해주세요.', () => {
				location.href = "/admin/main";
			})
		}
	});




}

/*취소*/
function cancelCalc(){
	$('#calcForm')[0].reset();
	$('#calcModal').modal("hide");
}

/*계산*/
function goCalc(el){
	nav.coinType = $('#coinTypeC').val();
	console.log("nav.coinType : ", nav.coinType);
	$.ajax({
		url : "/api/coinPrice",
		type: 'POST',
		// contentType : 'application/json',
		global: false,
		data: {coinType : 'ADMIN'},
		dataType : 'json',
		success : function(res){
			console.log("res : ", res.data);
			for(let data of res.data){
				if(nav.coinType === data.coinType){
					coinPrice = data.amt;
					console.log("coinPrice: ", coinPrice);
					resultCalc(coinPrice);
				}
			}

		}
	});

}

function resultCalc(coinPrice){
	console.log("coinPrice: >>", coinPrice);

	let coin  = $('#coinC').val() * 1;

	let reqAmt = coin * coinPrice ;

	$('#reqAmtC').val(comma(reqAmt));

}