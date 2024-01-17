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
	console.log("lookingForNowCoinPrice ..", nowCoinPrice[vo.coinType]);
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

	//코인종류
	$('#coinType').val(data.coinType).prop('selected', true);
	vo.coinType = data.coinType;

	//수수료 방식
	$('#chargeCd').val(data.chargeCd).prop('selected', true);
	vo.chargeCd = data.chargeCd;

	$('#deposNm').val(data.deposNm);
	$('#phoneNo').val(data.phoneNo.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`));
	$('#regDttm').val(data.regDttm);
	$('#clientIp').val(data.clientIp);
	$('#prcsCd6Cnt').val(data.prcsCd6Cnt+"/ 최종완료시각: "+data.modDttm);
	$('#refererUrl').val(data.refererUrl);
	$('#reqAmt').val(comma(data.reqAmt));
	$('#chargeAmt').val(comma(data.chargeAmt));
	$('#totReqAmt').val(comma(data.totReqAmt));
	$('#deviceType').val(data.deviceType);
	//현제시세 >> main.js >> function 호출
	$('#tradePrice').val(data.tradePrice);
	sendingCoinCalc();
	$('#toWalletAddr').val(data.toWalletAddr);
	if(data.memo){
		$('#memo').show();
		$('#memo').val(data.memo);
	}
	$('#dstntTag').val(data.dstntTag);
	//트랜젝션아이디는 관리자 입력
	$('#rsnCtnt').val(data.rsnCtnt);
	$('#prcsCd').val(data.prcsCd);
	$('#modDttm').val(data.modDttm);


}

/**
 * 보낼코인양 , 가치확인
 * */
function sendingCoinCalc(){

	let amt = uncomma($('#totReqAmt').val());
	let coinType = $('#coinType :selected').val();
	let accType = $('[name=accType]:checked').val();
	let chargeCd = $('#chargeCd :selected').val();
	let chargeAmt = uncomma($('#chargeAmt').val());

	let digts = 8;
	if(coinType === 'KRW-XRP'){
		digts = 2;
	}

	//전송방식에 따른 금액계산
	let numAmt = amt * 1;
	if(chargeCd == 'T'){
		numAmt = amt * 1 - chargeAmt * 1;
	}


	//시세 계산
	let price = $('#tradePrice').val();
	if(accType === 'N'){ //현제시세라면
		price = nowCoinPrice[coinType] * 1;
	}
	//전송할 코인
	let sendCoin = numAmt / (price * 1)
	let strCoin = sendCoin.toFixed(digts)
	$('#transCoin').val(strCoin);
	// console.log("sendCoin >> " , strCoin);

	//가치확인
	let numCoin = Number(strCoin);
	let krwChange = (numCoin * price * 1).toFixed();
	$('#calcPrice').val(`${comma(krwChange)}원`);
}

/*변경사항저장*/
function save(){
	//trans_req_mas 업데이트 항목
	// prcsCd, modDttm, coinType, charge_cd, charge_amt, 

	//trans_rcpt_mas merge 항목

	//
}

/*취소*/
function cancel(){

}