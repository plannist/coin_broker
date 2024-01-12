

$('#transReqModal').on('show.bs.modal', function(evt){
    console.log("transReqModal is open >", evt);


});


$('#transReqModal').on('hidden.bs.modal', function(evt){
    console.log("transReqModal is hidden >", evt);
});

$('#submitButton').on('click', function(evt){
    let inputs = $('#transReqModal input, textarea');

    //$('.invalid-feedback').show()
    //is-invalid
    for(let el of inputs){
        console.log("el >>", el);
        if(!$(el).val()){
            $(el).addClass('is-invalid');
            $(el).find('.invalid-feedback').show();
        }

    }
})