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

/* 업무처리 버튼 선택 이벤트 */
$('button[name=prcsCds]').on('click', function (){
	let id = $(this).attr('id');
	let prcsCd = $.trim(id.substring(id.lastIndexOf("_")+1));
	let $this = $(this);

	console.log("id : ", id);
	console.log("prcsCd:",prcsCd);

	//transPrcsCdUpdate
	$.ajax({
		url: "/admin/transPrcsCdUpdate",
		type: 'POST',
		dataType: 'json',
		data: {reqno : $('#reqno').val(), prcsCd : prcsCd},
		success: function (res) {
			$('#prcsCd').val(prcsCd);
			$('#mmsFormat option').eq(0).val(prcsCd);
			if(['2', '3', '4'].indexOf(prcsCd) != -1 ){
				$('#bankCd').val(prcsCd);
			}

			$('button[name=prcsCds]').removeClass("btn-primary").addClass("btn-light");
			$this.removeClass("btn-light").addClass("btn-primary");
		}
	});

})

/*텍스트 클립보드 복사*/
function copyText(el){
	let $input = $(el).prev('input, textarea');
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
	let prcsCd = $('#mmsFormat').val();
	let list = detailData.mmsFormatMasList;
	console.log("prcsCd: ", prcsCd);
	console.log("list: ", list)
	let text = list[prcsCd * 1 - 1].mmsContents;
	let count = 0;
	if(text.indexOf("{") !== -1){
		count = text.match(/{/g).filter(item => item !== '').length;
	}

	if(count > 0){

		while(count > 0){
			text = getChangeText(text);
			console.log("text : ", text);
			count --;
		}
	}


	$('#mmsContents').val(text);
}

function getChangeText(text){
	let startIdx = text.indexOf("{");
	let lastIdx = text.indexOf("}");
	let start = text.substring(0, startIdx-1);
	let idName = text.substring(startIdx+1, lastIdx);
	let last = text.substring(lastIdx+1);

	console.log("start>> ", start);
	console.log("idName>> ", idName);
	console.log("last>> ", last);

	let id = $('#'+idName).val();
	if(idName === 'transactionId'){
		id = "\n"+id;
	}
	let result = start.concat(id).concat(last) ;
	return result;
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
	$('#tradePrice').val(comma(data.tradePrice));
	$('#sendCoin').val(data.sendCoin);
	sendingCoinCalc();
	$('#toWalletAddr').val(data.toWalletAddr);
	if(data.memo){
		$('#memoArea').show();
		$('#memo').val(data.memo);
		$('#memo').prop('disabled', true);
	}
	$('#dstntTag').val(data.dstntTag);
	//트랜젝션아이디는 관리자 입력
	$('#rsnCtnt').val(data.rsnCtnt);
	$('#prcsNm').val(data.prcsNm);
	$('#prcsCd').val(data.prcsCd);
	//업무처리 상태 버튼 view처리
	$('button[name=prcsCds]').eq(data.prcsCd * 1 - 1).removeClass('btn-light').addClass('btn-primary');
	$('#modDttm').val(data.modDttm);
	$('#transactionId').val(data.transactionId);

	//문자생성 셀렉트 박스 생성
	$('#mmsFormat option').eq(0).val(data.prcsCd);
	for(let obj of data.mmsFormatMasList)
	$('#mmsFormat').append(`<option style="background-color: white" value="${obj.prcsCd}">${obj.mmsTitle}</option>`);

}

/**
 * 보낼코인양 , 가치확인
 * */
function sendingCoinCalc(){

	//변경가능 항목들
	let reqAmt = uncomma($('#reqAmt').val()) * 1;            //신청금액
	let coinType = $('#coinType :selected').val();      //코인종류
	let accType = $('[name=accType]:checked').val();    //현재시세: N, 적용시세: R
	let chargeCd = $('#chargeCd :selected').val();      //수수료방식 수수료별도 : I, 수수료 포함 : T
	let chargeAmt = uncomma($('#chargeAmt').val()) * 1;     //수수료

	//계산하기 버튼 클릭시 변경 되는 필드들
	let $sendCoin = $('#sendCoin');                     //전송코인
	let $calcPrice =  $('#calcPrice');                  //보낼코인의 가치확인
	let $tradePrice = $('#tradePrice');                 //적용시세
	let $totReqAmt = $('#totReqAmt');                   //입금금액(수수료방식 변경시)

	let digts = 8;
	if(coinType === 'KRW-XRP'){
		digts = 2;
	}

	//전송방식에 따른 금액계산
	let sendAmt = 0;
	if(chargeCd == 'T'){
		$('#totReqAmt').val(comma(reqAmt));
		sendAmt = reqAmt - chargeAmt;
	}else{
		$('#totReqAmt').val(comma(reqAmt + chargeAmt));
		sendAmt = reqAmt;
	}



	//시세 계산
	let price = uncomma($('#tradePrice').val());
	let sendCoin = $('#sendCoin').val() * 1; //적용시세면 변동없음.
	if(accType === 'N'){ //현제시세라면
		price = nowCoinPrice[coinType] * 1;
		//시세선택에 따른 적용 시세 변경
		$('#tradePrice').val(comma(price));
	}

	//요청금액의 0.3프로 계산 >> 10000 -> 10030
	sendAmt = (sendAmt * (100.3/100)).toFixed(8);
	sendAmt = Number(sendAmt);
	//전송할 코인
	sendCoin = sendAmt / (price * 1);
	sendCoin = sendCoin.toFixed(digts);
	$('#sendCoin').val(sendCoin);
	$('#transCoin').val(sendCoin);


	//가치확인
	sendCoin = Number(sendCoin);
	let calcPrice = ((sendCoin * 1) * (price * 1)).toFixed();

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
	$('#transDtlForm')[0].reset();
	$('#transDtlModal').modal("hide");
	// alertConfirm("주의"
	// 	, "저장하지않은 변경사항은 반영되지않습니다."
	// 	, "닫기", (res)=>{
	//
	// 	if(res.isConfirmed){
	// 		$('#transDtlForm')[0].reset();
	// 		$('#transDtlModal').modal("hide");
	// 	}
	// })
}