console.log("transDtlModal in >> ");
let param = {reqno : "", length : 11, prcsCd : "5"}

let vo = {
	coinType : "",
	chargeType : "",
	requestCoinPrice : "",

}

let detailData = {};

$('#transDtlModal').on('show.bs.modal', function(evt){
	console.log("transDtlModal is open >", evt);
	isModalOpen = true;
	getDetailTransInfo();


});

$('#transDtlModal').on('hidden.bs.modal', function(evt){
	isModalOpen = false;
	console.log("transDtlModal is hidden >", evt);

	$('button[name=prcsCds]').removeClass('btn-primary').addClass('btn-light');


	$('#transDtlForm')[0].reset();
	$('#memoArea').hide();

});

/* main.js 에서 pooling 시 modal 떠있으면 호출 */
function lookingForNowCoinPrice(){
	// console.log("lookingForNowCoinPrice ..", nowCoinPrice[vo.coinType]);
	// $('#nowPrice').val(comma(nowCoinPrice[$('#coinType').val()]));
	$('#nowPrice').val(comma(nowCoinPrice[vo.coinType]));

}




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
function cancel(){
	$('#calcForm')[0].reset();
	$('#calcModal').modal("hide");
}