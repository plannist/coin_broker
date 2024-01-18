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
});

/* main.js 에서 pooling 시 modal 떠있으면 호출 */
function lookingForNowCoinPrice(){
	// console.log("lookingForNowCoinPrice ..", nowCoinPrice[vo.coinType]);
	$('#nowPrice').val(comma(nowCoinPrice[vo.coinType]));
	//TODO: 10초 카운터 구현

}

/* 업무처리 버튼 선택 이벤트 */
$('button[name=prcsCds]').on('click', function (){
	let id = $(this).attr('id');
	let prcsCd = $.trim(id.substring(id.lastIndexOf("_")+1));

	console.log("id : ", id);
	console.log("prcsCd:",prcsCd);

	$('#prcsCd').val(prcsCd);

	if(['2', '3', '4'].indexOf(prcsCd) != -1 ){
		$('#bankCd').val(prcsCd);
	}

	$('button[name=prcsCds]').removeClass("btn-primary").addClass("btn-light");
	$(this).removeClass("btn-light").addClass("btn-primary");

})

/*텍스트 클립보드 복사*/
function copyText(el){
	let $input = $(el).prev('input');
	let flag = false;
	if($input.prop('disabled')){
		$input.prop('disabled', false);
		flag = true;
	}
	$input.select();
	let copy = document.execCommand('copy');

	if(flag){
		$input.prop('disabled', true);
	}

}

/*MMS 조회*/
function createMms(el){

}

/*상세주문조회*/
function getDetailTransInfo(){
	console.log("modal param >>", param);
	$.ajax({
		url : "/admin/transReqDtl",
		type: 'POST',
		// contentType : 'application/json',
		dataType: 'json',
		data: param,
		success : function(res){
			console.log(" 상세주문조회 !! res >> ", res);
			detailData = res.data;

			//화면 표시
			draw(res.data);
		}
	})
}

/*화면표시*/
function draw(data){
	$('#reqno').val(data.reqno);
	//코인종류
	$('#coinType').val(data.coinType).prop('selected', true);
	vo.coinType = data.coinType;

	//수수료 방식
	$('#chargeCd').val(data.chargeCd).prop('selected', true);
	vo.chargeCd = data.chargeCd;

	$('#deposNm').val(data.deposNm);
	// $('#phoneNo').val(data.phoneNo.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`));
	$('#phoneNo').val(data.phoneNo);
	$('#regDttm').val(data.regDttm);
	$('#clientIp').val(data.clientIp);
	if(data.prcsCd6Cnt*1 > 0){
		$('#prcsCd6Cnt').val(data.prcsCd6Cnt+"/ 최종완료시각: "+data.rcptDttm);
	}
	$('#refererUrl').val(data.refererUrl);
	$('#reqAmt').val(comma(data.reqAmt));
	$('#chargeAmt').val(comma(data.chargeAmt));
	$('#totReqAmt').val(comma(data.totReqAmt));
	$('#deviceType').val(data.deviceType);
	//현제시세 >> main.js >> function 호출
	$('#tradePrice').val(data.tradePrice);
	$('#sendCoin').val(data.sendCoin);
	sendingCoinCalc();
	$('#toWalletAddr').val(data.toWalletAddr);
	if(data.memo){
		$('#memo').show();
		$('#memo').val(data.memo);
	}
	$('#dstntTag').val(data.dstntTag);
	//트랜젝션아이디는 관리자 입력
	$('#rsnCtnt').val(data.rsnCtnt);
	$('#prcsNm').val(data.prcsNm);
	$('#prcsCd').val(data.prcsCd);
	$('#modDttm').val(data.modDttm);
	$('#transactionId').val(data.transactionId);


}

/**
 * 보낼코인양 , 가치확인
 * */
function sendingCoinCalc(){

	let amt = uncomma($('#reqAmt').val());
	let coinType = $('#coinType :selected').val();
	let accType = $('[name=accType]:checked').val();
	let chargeCd = $('#chargeCd :selected').val();
	let chargeAmt = uncomma($('#chargeAmt').val());

	let digts = 8;
	if(coinType === 'KRW-XRP'){
		digts = 2;
	}

	//전송방식에 따른 금액계산
	amt = amt * 1;
	if(chargeCd == 'T'){
		amt = amt  - chargeAmt * 1;
	}


	//시세 계산
	let price = $('#tradePrice').val();
	let sendCoin = $('#sendCoin').val() * 1; //적용시세면 변동없음.
	if(accType === 'N'){ //현제시세라면
		price = nowCoinPrice[coinType] * 1;
		sendCoin = amt / (price * 1);
	}
	//전송할 코인

	sendCoin = sendCoin.toFixed(digts);
	$('#sendCoin').val(sendCoin);
	$('#transCoin').val(sendCoin);


	//가치확인
	sendCoin = Number(sendCoin);
	let calcPrice = (sendCoin * price * 1).toFixed();
	$('#calcPrice').val(`${comma(calcPrice)}원`); //현시세대비 가치만 리턴
}

/*변경사항저장
* {
    "coinType": "KRW-XRP",
    "chargeCd": "I",
    "regDttm": "2024-01-17 11:44:46",
    "clientIp": "0:0:0:0:0:0:0:1",
    "prcsCd6Cnt": "0/ 최종완료시각: null",
    "refererUrl": "-",
    "reqAmt": "50,000",
    "chargeAmt": "6,000",
    "totReqAmt": "56,000",
    "deviceType": "PC",
    "nowPrice": "784",
    "tradePrice": "790",
    "calcPrice": "56,003원",
    "accType": "R",
    "transCoin": "70.89",
    "memo": "",
    "dstntTag": "as321d56qwe",
    "transactionId": "",
    "rsnCtnt": "zz",
    "prcsCd": "",
    "modDttm": "",
    "mmsFormat": "",
    "mmsContents": ""
}
* */
function save(){

	//trans_req_mas 업데이트 항목
	// prcsCd, modDttm, coinType, charge_cd, charge_amt, 

	//trans_rcpt_mas merge 항목

	$('#transDtlForm input, textarea').prop('disabled', false);

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
				alertNotice(null, '대행 신청이 정상 수정되었습니다.', () => {
					location.href = "/admin/main";
				})
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
	alertConfirm("주의"
		, "저장하지않은 변경사항은 반영되지않습니다."
		, "닫기", (res)=>{

		if(res.isConfirmed){
			$('#transDtlForm')[0].reset();
			$('#transDtlModal').modal("hide");
		}
	})
}