console.log("관리자메인페이지")

var nowCoinPrice = {
    'KRW-BTC' : '',
    'KRW-ETH' : '',
    'KRW-XRP' : ''
};

var isModalOpen = false;

let timer;

let newRequestCnt =-1;

var AudioContext;

var audioContext;


function getCoinPrice(){

    $.ajax({
        url : "/api/coinPrice",
        type: 'POST',
        // contentType : 'application/json',
        global: false,
        data: {coinType : 'ADMIN'},
        dataType : 'json',
        success : function(res){
            // console.log("getCoinPrice res >>", res);
            if(res.statusCode === 'S001'){
                for(let data of res.data){
                    $('#'+data.coinType).text(comma(data.amt));
                    nowCoinPrice[data.coinType] = data.amt;

                }

                if(isModalOpen){
                    console.log("모달이오픈")
                    lookingForNowCoinPrice();
                }

                if(res.totalCount * 1 > 0){
                    console.log("알람이 울립니다. ::", res.totalCount);
                    // 알람
                    $('#alarm').text(newRequestCnt +""+ "+")
                    let src = "/assets/image/audio/alarm-new.mp3";
                    let audio = new Audio(src);
                    audio.play();

                    search(false);
                    // DataTableBasic.init('dataTable', [{colum: 'regDttm', dir:'desc'}], 10, false);
                }

                // if(newRequestCnt < 0){
                //     newRequestCnt = res.totalCount * 1;
                //     return false;
                // }else{
                //     if(newRequestCnt < res.totalCount){
                //
                //         newRequestCnt = res.totalCount * 1;
                //         // 알람
                //         $('#alarm').text(newRequestCnt +""+ "+")
                //         let src = "/image/audio/alarm-new.mp3";
                //         let audio = new Audio(src);
                //         audio.play();
                //
                //         DataTableBasic.init('dataTable', [{colum: 'regDttm', dir:'desc'}], 10);
                //
                //
                //     }
                //
                // }

                // console.log("nowCoinPrice >>" , nowCoinPrice);


            }
        }
        , error : function(res){

        }
    })

}

function pollingStart(){
    // LOAD_YN = false;
    timmer = setInterval(()=>{

        getCoinPrice();
    }, 10000);
}

function pollingEnd(){
    clearInterval(timmer);
    // LOAD_YN = true;
}

/**
 * reqno;
 * coinType;        <th>번호</th>
 * chargeCd;<th>코인</th>
 * reqAmt;<th>신청금액</th>
 * chargeAmt;<th>입금자명</th>
 * totReqAmt;<th>전화번호</th>
 * sendCoin;<th>입력내용</th>
 * toWalletAddr;<th>현재단계</th>
 * dstntTag;
 * deposNm;
 * phoneNo;
 * rsnCtnt;
 * deviceType;
 * refererUrl;
 * regDttm;
 * modDttm;
 * prcsCd;
 * nowCoinPrice;
 *
 * */
const DataTableBasic = function(){
    const initTable = function(id, order, length, global) {
        let _columns =
            [
                {data: 'reqno'}, //번호
                {data: 'coinType'},
                {data: 'totReqAmt'},
                {data: 'deposNm'},
                {data: 'phoneNo'},
                {data: 'prcsNm'},
                {data: 'rsnCtnt'},
                {data: 'regDttm'},
        ];

        let _columnDefs = [
            {
                targets: 1,
                // className : 'column-title',
                render: function(data, type, full) {
                    return data.substring(data.indexOf("-")+1);
                },
            },
            {
                targets: 2,
                render: function(data, type, full) {
                    let reqno = full.reqno;
                    _data = `<a href="#" onclick='goDetail(${reqno})'><ins>` + comma(data) + `</ins></a>`;
                    return _data;
                },
            },
            {
                targets: 5,
                render: function(data, type, full) {

                    if(data === '신규신청'){
                        return `<p class="text-danger"> ${data} </p>`;
                    }
                    return data;
                },
            },
            {
                targets: 6,
                render: function(data, type, full) {
                    let val = data;
                    if(val.length > 5){
                       val = val.substring(0, 5).concat("...");
                    }
                    return val;
                },
            },

            // {
            //     targets: 4,
            //     render: function(data, type, full) {
            //         // _data = data.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
            //         return _data;
            //     },
            // },
        ];

        const table = $('#'+id);

        table.DataTable({
            pagingType:'full_numbers',
            autoWidth: false,
            responsive: true,
            paging: true,
            searching: false,
            info: true,
            destroy: true,
            processing: true,
            serverSide: true,
            ordering: false,
            responsive: false,
            lengthMenu: [[10, 20, 50, 100], ['10개', '20개', '50개', '100개']],

            ajax: {
                url : "/admin/transReqList",
                data : function(param){
                    console.log("param >>", param);

                    let keyword = $('#keyword :selected').val();
                    let val = $('#searchContents').val();
                    if(keyword){
                        param.keyword = keyword;

                        if(!val){
                            val = $('#navSearchContents').val();
                        }

                        param.input = val;
                    }


                },
                type: 'POST',
                global : global,
                dataFilter: function(data) {
                    const json = jQuery.parseJSON( data );
                    console.log("res.json  >>>", json);
                    if(json != null) {
                        // $('#' + id + ' input[name=orders]').val(json.result.orders);
                        json.recordsTotal = json.totalCount;
                        json.recordsFiltered = json.totalCount;
                        // json.data = json.resultList;
                    } else {
                        json.recordsTotal = 0;
                        json.recordsFiltered = 0;
                        json.data = [];
                    }
                    return JSON.stringify( json );
                },

            },

            columns: _columns,
            pageLength: length,
            columnDefs: _columnDefs,
        });
        //dataTable End;;


    }

    return {
        init : function(id, order, length, global){
            initTable(id, order, length, global);
        }
    }
}();


var spiker;
var constraints;
$(document).ready(function(){
    navigator.mediaDevices.enumerateDevices().then(devices => {
        console.log("devices [] >> ", devices);
        spiker = devices.find(function(device) {
            // console.log("device info >> ", device);
            return device.kind === "audiooutput";
        });
        const audioSource = '';
        const videoSource = '';
        constraints = {
            audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
            video: {deviceId: videoSource ? {exact: videoSource} : undefined}
        };
        // console.log("spiker 11>> ", spiker);
    }).then(()=>{
        // console.log("spiker 22>> ", spiker);
        navigator.mediaDevices.getUserMedia(constraints).then(()=>{
            AudioContext = window.AudioContext ;
            audioContext = new AudioContext();
            getCoinPrice();
        }).catch(e => {
            console.error(`Audio permissions denied:`, e);

            getCoinPrice();
        });
    })

    // const audioSource = audioInputSelect.value;
    // const videoSource = videoSelect.value;
    // const constraints = {
    //     audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
    //     video: {deviceId: videoSource ? {exact: videoSource} : undefined}
    // };
    // navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);



    //TODO: 개발자 모드
    if(localStorage.getItem("developer") ){
        pollingStart();
        pollingEnd();
    }else{
        pollingStart();
    }

    $('#sidebarToggleTop').click();


    search();

});

function goDetail(reqNo){
    console.log("reqNo: >>", reqNo);
    param.reqno = reqNo+"";
    $("#transDtlModal").modal('show');
}

function search(global){
    let length = $('[name=dataTable_length]').val();
    DataTableBasic.init('dataTable', [{colum: 'regDttm', dir:'desc'}], length, global);

}

