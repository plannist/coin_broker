let transVo = {
    reqno : "",
    coinType: "",
    chargeCd: "",
    reqAmt: "",
    chargeAmt: "",
    totReqAmt: "",
    sendCoin: "",
    toWalletAddr: "",
    dstntTag: "",
    deposNm: "",
    phoneNo: "",
    rsnCtnt: "",
    deviceType: "",
    refererUrl: "",
    regDttm: "",
    modDttm: "",
    prcsCd: "",
}

let coinMas = {
    coinType : "",
    maxAmt : "",
    minIAmt : "",
    minTAmt : "",
    chargeMngs : []
}


$('#transReqModal').on('show.bs.modal', function(evt){
    console.log("transReqModal is open >", evt);



});



$('#transReqModal').on('hidden.bs.modal', function(evt){
    console.log("transReqModal is hidden >", evt);
    pollingStart();
});




/**
 * 주의사항 동의 체크
 * */
function agreeAll(el){
    let flag = $(el).is(':checked');
    console.log("flag :: >> ", flag);
    if(flag){
        $('#submitButton').prop('disabled', false);
    }else{
        $('#submitButton').prop('disabled', true);
    }

}


/**
 * 신청 버튼 클릭
 * */
$('#submitButton').on('click', function(evt){

    //지갑주소 선확인
    let val = $('#toWalletAddr').val();
    if(val.length < 18){
        $('#toWalletAddr').find('.invalid-feedback').show();
        $('#toWalletAddr').addClass('is-invalid');
        $('#toWalletAddr').focus();
        return false;
    }


    // transVo.chargeCd = $('input[name=chargeCd]:checked').val();
    console.log("onSubmit >>DEVICE_TYPE >>", DEVICE_TYPE);
    console.log("onSubmit >>REFERER_URL >>", REFERER_URL);

    $('#deviceType').val(DEVICE_TYPE);
    $('#refererUrl').val(REFERER_URL ? REFERER_URL : "-");
    $('#tradePrice').val(tradePrice[$('#coinType').val()]);



    //Valid
    // let inputs = $('#transReqModal input, textarea');
    let inputs = $('#transReqModal input');
    //$('.invalid-feedback').show()
    //is-invalid
    let flag = true;
    for(let el of inputs){
        if(!$(el).val() && !$(el).prop('disabled')){
            $(el).addClass('is-invalid');
            $(el).find('.invalid-feedback').show();
            flag = false;
            if($(el).attr("id") == 'dstntTag' && $('#coinType').val() != 'KRW-XRP'){
                flag = true;
            }

            console.log("el >>", el);
        }
    }

    if(flag){
        $('#chargeAmt').prop('disabled', false);
        $('#totReqAmt').prop('disabled', false);
        $('#sendCoin').prop('disabled', false);

        let form = $('#contactForm').serialize();


        // form = form + '&chargeCd='+transVo.chargeCd+"&coinType="+transVo.coinType;

        console.log("save!! form data: ", form);

        $.ajax({
            url : "/api/isOpeningTime",
            type: 'POST',
            dataType : 'json',
            success : function(res){
                if(res.statusCode != 'S001'){
                    alertNotice("영업종료", "죄송합니다. 지금은 영업시간이 종료 되었습니다.", ()=>{
                        location.href = "/";
                    })
                }else{
                    $.ajax({
                        url : "/transReq",
                        type: 'POST',
                        dataType : 'json',
                        data : form,
                        success : function(res){
                            console.log("res >>", res);
                            if(res.statusCode == 'S001'){
                                alertNotice(null, '대행 신청이 정상 접수되었습니다. 진행사항은 문자로 안내 예정입니다.', ()=>{
                                    location.href = "/";
                                })
                            }else{
                                alertNotice(null, res.statusMessage, ()=>{
                                    location.href = "/";
                                })
                            }

                        },error(res){
                            console.log("error:  >>> 저장실패 ", res);
                            alertNotice(null, '대행 신청 접수가 실패하였습니다. 다시 신청하시거나 상담 신청해주세요.', ()=>{
                                location.href = "/";
                            })
                        }
                    })

                }
            }
        })


    }



});

<!-- 코인선택 -->
function cointTypeSelect(el, type){

    $('#reqAmt').val(null);
    $('#chargeAmt').val(null);
    $('#totReqAmt').val(null);

    let name= $(el).attr('name');
    $('button[name='+name+']').removeClass('btn-primary');
    $('button[name='+name+']').addClass('btn-light');
    transVo.coinType = type;
    $('#coinType').val(type);
    $(el).removeClass('btn-light');
    $(el).addClass('btn-primary');

    let flag = !!$('input[name=chargeCd]:checked').val();
    if(flag){
        $('#inputGroup').show();
        if(type === "KRW-XRP"){
            $('#repleShow1').show();
            $('#repleShow2').show();
        }else{
            $('#repleShow1').hide();
            $('#repleShow2').hide();
            $('#dstntTag').val(null);
        }
    }

    let param = {"coinType" : type};

    //코인 설정 조회
    $.ajax({
        url : "/api/getCoinMas",
        type: 'POST',
        dataType : 'json',
        data : param,
        success : function(res){
            console.log("getCoinMas res >>", res);
            coinMas = res.data;

            $('#toWalletAddr').next('label').text("선택된"+$(el).text()+"의 지갑주소를 입력해주세요.");
        }
    })


}

/**
 * 수수료 방식 선택
 * */
function chargeTypeSelect(){
    let flag = !! $('#coinType').val();
    if(flag){
        $('#inputGroup').show();

        let coinType = $('#coinType').val();
        if(coinType === 'KRW-XRP'){
            $('#repleShow1').show();
            $('#repleShow2').show();
        }else{
            $('#repleShow1').hide();
            $('#repleShow2').hide();
            $('#dstntTag').val(null);

        }

        $('#chargeAmt').val(null);
        $('#totReqAmt').val(null);

        if($('#reqAmt').val()){
            changeAmtListener($('#reqAmt'));
        }
    }
}

/**
 * 신청금액 입력 이벤트
 * */
function changeAmtListener(el){
    $(el).removeClass('is-invalid');
    $('#chargeAmt').val(null)
    $('#totReqAmt').val(null)
    $('#sendCoin').val(null)

    //숫자만 입력가능
    let val = uncomma($(el).val());
    if(isNaN(val)){

        $(el).addClass('is-invalid');
        $(el).next().next().text("숫자만 입력가능합니다.").show();

        $(el).val(null);
       return false;
    }else{
        $(el).next().next().hide();
        $(el).removeClass('is-invalid');
    }

    let chargeCd = $('input[name=chargeCd]:checked').val();

    if(chargeCd === 'I'){ //수수료별도

        //최소금액 미만 체크
        if(val * 1 < coinMas.minIAmt * 1) {

            $(el).addClass('is-invalid');
            $(el).next().next().text(`${coinMas.minIAmt} 이상 금액만 전송가능합니다.`).show();

        }else if(val * 1 > coinMas.maxAmt * 1){ //11만원 초과 체크
            $(el).addClass('is-invalid');
            $(el).next().next().text(`신청 가능금액은 ${comma(coinMas.minIAmt)} 부터 ${comma(coinMas.maxAmt)} 원 까지입니다. 초과는 타업체 이용바랍니다.`).show();
            $(el).val(null);
            return false;
        }else{
            $(el).next().next().hide();
            $(el).removeClass('is-invalid');
            chargeCalculate(val, chargeCd);
        }

    }else{ //수수료포함
        if(val * 1 < coinMas.minTAmt * 1){
            $(el).addClass('is-invalid');
            $(el).next().next().text(`${coinMas.minTAmt} 이상 금액만 전송가능합니다.`).show();
        }else if(val * 1 > coinMas.maxAmt * 1){ //11만원 초과 체크
            $(el).addClass('is-invalid');
            $(el).next().next().text(`신청 가능금액은 ${comma(coinMas.minTAmt)} 부터 ${comma(coinMas.maxAmt)} 원 까지입니다. 초과는 타업체 이용바랍니다.`).show();
            $(el).val(null);
            return false;
        }else{
            $(el).next().next().hide();
            $(el).removeClass('is-invalid');
            chargeCalculate(val, chargeCd);
        }
    }


    $(el).val(comma(val));


}

//수수료 입금금액 계산
function chargeCalculate(amt, chargeCd){
    let type = $('#coinType').val();
    let coinMngs = coinMas.chargeMngs;
    let chargeAmt = 0; //수수료금액
    // debugger;

    // $('#chargeAmt').prop('disabled', false);
    // $('#totReqAmt').prop('disabled', false);
    // $('#sendCoin').prop('disabled', false);

    if(amt * 1 <= coinMngs[0].rangeIdx){ //최소금액입력시
        chargeAmt = Number(coinMngs[0].chargeAmt);
        $('#chargeAmt').val(comma(chargeAmt));
        if(chargeCd === 'I') { //수수료별도
            $('#totReqAmt').val(comma(amt * 1 + coinMngs[0].chargeAmt))
        }else{
            $('#totReqAmt').val(comma(amt))
        }
        sendingCoinCalc(amt, type, chargeCd, chargeAmt);
        return false;
    }else if(amt * 1 == coinMas.maxAmt){ //최대금액입력시
        chargeAmt = Number(coinMngs[coinMngs.length-1].chargeAmt);
        $('#chargeAmt').val(chargeAmt);
        if(chargeCd === 'I') { //수수료별도
            $('#totReqAmt').val(comma(amt * 1 + chargeAmt))
        }else{
            $('#chargeAmt').val(comma(chargeAmt));
        }
        sendingCoinCalc(amt, type, chargeCd, chargeAmt);
        return false;
    }

    //최소금액 ~ 최대금액 사이입력시
    for(let i=0; i<coinMngs.length; i++){
        if(amt * 1 == coinMngs[i].rangeIdx){
            chargeAmt = coinMngs[i].chargeAmt;
            $('#chargeAmt').val(comma(chargeAmt));
            if(chargeCd === 'I'){
                $('#totReqAmt').val(comma(amt * 1 + chargeAmt))
            }else{
                $('#totReqAmt').val(comma(amt))
            }
        }
        else if(amt * 1 > coinMngs[i].rangeIdx){
            chargeAmt = coinMngs[i+1].chargeAmt;
            $('#chargeAmt').val(comma(chargeAmt));
            if(chargeCd === 'I'){
                $('#totReqAmt').val(comma(amt * 1 + chargeAmt))
            }else{
                $('#totReqAmt').val(comma(amt));
            }
        }
    }

    sendingCoinCalc(amt, type, chargeCd, chargeAmt);
}

/**
 * 전송금액 to 코인 변환
 * */
function sendingCoinCalc(amt, type, chargeCd, chargeAmt){
    let digts = 8;
    if(type === 'KRW-XRP'){
        digts = 2;
    }

    //전송방식에 따른 금액계산
    let numAmt = amt * 1;
    if(chargeCd == 'T'){
        numAmt = amt * 1 - chargeAmt;
    }
    // 요청금액 의 0.3프로 계산 10000 > 10030
    let ff = (numAmt * (100.3/100)).toFixed(8);
    // console.log("ff str >> " , ff);
    ff = Number(ff);
    // console.log("ff num >> " , ff);

    //전송코인 계산
    let sendCoin = ff / (tradePrice[type] * 1)
    let strCoin = sendCoin.toFixed(digts)
    $('#sendCoin').val(strCoin);
    console.log("sendCoin >> " , strCoin);


    let numCoin = Number(strCoin);
    let krwChange = (numCoin * tradePrice[type] * 1).toFixed();
    $('#krwChange').text(`${comma(krwChange)}원`);


    // $('#chargeAmt').prop('disabled', true)
    // $('#totReqAmt').prop('disabled', true)
    // $('#sendCoin').prop('disabled', true)
}

function changeAddrListener(el){
    $(el).removeClass('is-invalid');
    $(el).find('.invalid-feedback').hide();
}

function changeDstntListener(el){

    $(el).removeClass('is-invalid');
    $(el).find('.invalid-feedback').hide();
}

function changeNameListener(el){

    $(el).removeClass('is-invalid');
    $(el).find('.invalid-feedback').hide();
}

/* 휴대폰번호 입력 */
function changePhoneListener(el){
    let data = $(el).val();
    data = data.replaceAll("-", "");
    if(data.length > 11){
        $(el).val(null);
        return false;
    }
    $(el).removeClass('is-invalid');
    $(el).find('.invalid-feedback').hide();

    $(el).val(data.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`));
}



/**
 * 수수료금액 입력
 * */

function testDataSet(){
    cointTypeSelect($('button[name=coinType]')[0], 'R');
    $('input[name=chargeCd]').eq(0).click();
    $('#reqAmt').val(comma('110000'));
    $('#chargeAmt').val(comma('33000'));
    $('#totReqAmt').val(comma('140000'));
    $('#sendCoin').val("12.221");
    $('#toWalletAddr').val("asdlkasjd1231241");
    $('#dstntTag').val('asdlkasjd123112312312ascx');
    $('#deposNm').val("박종석");
    $('#phoneNo').val("01087369249");
    $('#rsnCtnt').val("테스트데이터 입니다.");
}
