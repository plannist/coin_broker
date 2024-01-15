console.log("관리자메인페이지")

var tradePrice = {
    'KRW-BTC' : '',
    'KRW-ETH' : '',
    'KRW-XRP' : ''
};

let timer;

let newRequestCnt =0;


function getCoinPrice(){

    $.ajax({
        url : "/api/coinPrice",
        type: 'POST',
        contentType : 'application/json',
        success : function(res){
            console.log("res >>", res);
            if(res.statusCode === 'S001'){
                for(let data of res.data){
                    $('#'+data.coinType).text('$'+comma(data.amt).concat(" 원"));
                    tradePrice[data.coinType] = data.amt;
                }

                console.log("tradePrice >>" , tradePrice);
                if(newRequestCnt < res.totalCount){
                    newRequestCnt = res.totalCount;
                    //TODO: 알람
                    $('#alarm').text(newRequestCnt +""+ "+")
                    // $('#audio').show();
                    // document.querySelector("audio").play();

                }


            }
        }
        , error : function(res){

        }
    })

}

function pollingStart(){
    LOAD_YN = false;
    timmer = setInterval(()=>{
        getCoinPrice();
    }, 10000);
}

function pollingEnd(){
    clearInterval(timmer);
    LOAD_YN = true;
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
 * tradePrice;
 *
 * */
const DataTableBasic = function(){
    const initTable = function(id, order, length) {
        let _columns =
            [
                {data: 'reqno'}, //번호
                {data: 'coinType'},
                {data: 'reqAmt'},
                {data: 'deposNm'},
                {data: 'phoneNo'},
                {data: 'prcsCd'},
                {data: 'regDttm'},
        ];

        let _columnDefs = [
            // {
            //     targets: 0,
            //     className : 'column-title',
            //     render: function(data, type, full) {
            //
            //     },
            // },
            {
                targets: 2,
                render: function(data, type, full) {
                    _data = `<a href="/member/detail.do?mgtId=` + data + `"><ins>` + comma(data) + `</ins></a>`;
                    return _data;
                },
            },
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
                },
                type: 'POST',
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
        init : function(id, order, length){
            initTable(id, order, length);
        }
    }
}();


$(document).ready(function(){
    getCoinPrice();
    // pollingStart();


    DataTableBasic.init('dataTable', [{colum: 'regDttm', dir:'desc'}], 10);

    // DataTableBasic.init('dataTable', null, 10);
});