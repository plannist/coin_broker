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

$('#transReqModal').on('show.bs.modal', function(evt){
    console.log("transReqModal is open >", evt);


});


$('#transReqModal').on('hidden.bs.modal', function(evt){
    console.log("transReqModal is hidden >", evt);
});

$('#submitButton').on('click', function(evt){
    let inputs = $('#transReqModal input, textarea');

    transVo.chargeCd = $('input[name=chargeCd]:checked').val();

    //$('.invalid-feedback').show()
    //is-invalid
    for(let el of inputs){
        console.log("el >>", el);
        if(!$(el).val()){
            $(el).addClass('is-invalid');
            $(el).find('.invalid-feedback').show();
        }
    }

    let form = $('#contactForm').serialize();


    // form = form + '&chargeCd='+transVo.chargeCd+"&coinType="+transVo.coinType;

    console.log("save!! form data: ", form);

    $.ajax({
        url : "/transReq",
        type: 'POST',
        dataType : 'json',
        data : form,
        success : function(res){
            console.log("res >>", res);

        }
    })

});

<!-- 코인선택 -->
function cointTypeSelect(el, type){

    let name= $(el).attr('name');
    $('button[name='+name+']').removeClass('bg-success');
    transVo.coinType = type;
    $('#coinType').val(type);
    $(el).addClass('bg-success');

}

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
