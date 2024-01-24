let ckEditor1;
let ckEditor2;
let ckEditor3;

$(document).ready(function(){


    ClassicEditor.create(document.querySelector('#mtnMsg'), {

    }).then(newEditor => {
        ckEditor1 = newEditor;
    });

    ClassicEditor.create(document.querySelector('#ntc1Msg'), {

    }).then(newEditor => {
        ckEditor2 = newEditor;
    });

    ClassicEditor.create(document.querySelector('#ntc2Msg'), {

    }).then(newEditor => {
        ckEditor3 = newEditor;
    })

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
            console.log("frontMng data >>>", data);
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
                $('#mtnYn').prop('checked', false);
            }

            // $('#mtnMsg').val(data.mtnMsg);

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

            // $('#ntc1Msg').val(data.ntc1Msg);
            // $('#ntc2Msg').val(data.ntc2Msg);


            ckEditor1.setData(data.mtnMsg);

            ckEditor2.setData(data.ntc1Msg);

            ckEditor3.setData(data.ntc2Msg);

        }
    });
}

function save(){

    if($('#mtnYn').is(':checked')){
        $('input[name=mtnYn]').val('Y');
    }else{
        $('input[name=mtnYn]').val('N');
    }

    if($('#mtnMsgYn').is(':checked')){
        $('input[name=mtnMsgYn]').val('Y');
    }else{
        $('input[name=mtnMsgYn]').val('N');
    }

    if($('#ntc1Yn').is(':checked')){
        $('input[name=ntc1Yn]').val('Y');
    }else{
        $('input[name=ntc1Yn]').val('N');
    }

    if($('#ntc2Yn').is(':checked')){
        $('input[name=ntc2Yn]').val('Y');
    }else{
        $('input[name=ntc2Yn]').val('N');
    }

    $('#mtnMsg').val(ckEditor1.getData())
    $('#ntc1Msg').val(ckEditor2.getData());
    $('#ntc2Msg').val(ckEditor3.getData());


    let form = $('#frontForm').serialize();
    console.log("save!! form data: ", form);

    $.ajax({
        url : "/admin/front-save",
        type: 'POST',
        dataType : 'json',
        data : form,
        success : function(res){
            frontMng();
        }
    });

}