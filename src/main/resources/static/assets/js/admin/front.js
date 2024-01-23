
$(document).ready(function(){
    frontMng();
});

function frontMng(){
    $.ajax({
        url : "/api/front-mng",
        type: 'POST',
        dataType : 'json',
        // contentType : 'application/json',
        success : function(res){
            let data = res.data;

            $('#openTime').val(data.openTime);
            $('#closeTime').val(data.closeTime);

            if(data.mtnMsgYn === 'Y'){
                $('#mtnMsgYn').prop('checked', true);
            }else{
                $('#mtnMsgYn').prop('checked', false);
            }

            if(data.mtnYn === 'Y'){
                $('#mtnYn').prop('checked', true);
            }else{
                $('#mtnMsgYn').prop('checked', false);
            }

            $('#mtnMsg').val(data.mtnMsg);

            if(data.ntc1Yn === 'Y'){
                $('#ntc1Yn').prop('checked', true);
            }else{
                $('#ntc1Yn').prop('checked', false);
            }

            if(data.ntc2Yn === 'Y'){
                $('#ntc2Yn').prop('checked', true);
            }else{
                $('#ntc2Yn').prop('checked', false);
            }

            $('#ntc1Title').val(data.ntc1Title);
            $('#ntc2Title').val(data.ntc2Title);

            $('#ntc1Msg').val(data.ntc1Msg);
            $('#ntc2Msg').val(data.ntc2Msg);

        }
    });
}

function save(){

}