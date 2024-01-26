let coinType = "KRW-";


$(document).ready(function(){
    $('#sidebarToggleTop').click();
    $('.nav-item').removeClass('active').eq(3).addClass('active');
    search();
});

const DataTableBasic = function(){
    const initTable = function(id, order, length) {
        let _columns =
            [
                {data: 'firstIdx'}, //부터
                {data: 'rangeIdx'}, //까지
                {data: 'chargeAmt'} //수수료
            ];

        let _columnDefs = [
            {
                targets: 0,
                width : '150px',
                render: function(data, type, full) {
                    return comma(data+'');
                },
            },
            {
                targets: 1,
                width : '150px',
                render: function(data, type, full) {

                    if(data === 0 || full.maxId === 1){
                        // console.log("data :", data );
                        // console.log("full.maxId :", full.maxId);
                        return `<input name="rangeIdx" type="text" class="form-control form-control-user" placeholder="까지 입력" value="${comma(data+'')}">`;
                    }else{
                        return `<input name="rangeIdx" type="text" class="form-control form-control-user" disabled value="${comma(data+'')}">  </input>`;
                    }

                },
            },
            {
                targets: 2,
                width : '150px',
                render: function(data, type, full) {
                    // console.log("chargeAmtData :", data);
                    return `<input name="chargeAmt" type="text" class="form-control form-control-user" placeholder="수수료 입력" value="${comma(data+'')}">`;

                },
            },
        ];

        const table = $(id);

        table.DataTable({
            // pagingType:'full_numbers',
            autoWidth: true,
            responsive: true,
            paging: false,
            searching: false,
            info: false,
            destroy: true,
            processing: true,
            serverSide: true,
            ordering: false,
            responsive: false,
            // lengthMenu: [[10, 20, 50, 100], ['10개', '20개', '50개', '100개']],

            ajax: {
                url : "/admin/business-find",
                data : function(param){

                    param.coinType = coinType;
                    console.log("param >>", param);
                },
                type: 'POST',
                dataFilter: function(data) {
                    console.log("res  >>>", data);
                    let json = jQuery.parseJSON( data );
                    // console.log("res.json  >>>", json.data.coinType);
                    // console.log("res.json  >>>", json.data.maxAmt);
                    // console.log("res.json  >>>", json.data.minIAmt);
                    // console.log("res.json  >>>", json.data.minTAmt);


                    if(json != null) {
                        $('#coinType').val(json.data.coinType);
                        $('#maxAmt').val(comma(json.data.maxAmt+''));
                        $('#minIAmt').val(comma(json.data.minIAmt+''));
                        $('#minTAmt').val(comma(json.data.minTAmt+''));

                        json.recordsTotal = json.totalCount;
                        json.recordsFiltered = json.totalCount;
                        json.data = json.data.chargeMngs;



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

function search() {
    let lis = $('#myTab').find('button');
    let id = '';
    lis.each((i, o) => {
        // console.log(o, i);
        let cls = $(o).attr('class');

        console.log(i, cls);
        if(cls.includes("active")){
            id = $(o).attr('data-bs-target');
            return false;
        }

    })

    console.log("id: >>", id);

    coinType = coinType+id.substring(1);
    console.log("coinType: >>", coinType);

    DataTableBasic.init(id+'-table', [{colum: 'regDttm', dir:'desc'}], 10);
}

function save(){
    // console.log("res.json  >>>", json.data.coinType);
    // console.log("res.json  >>>", json.data.maxAmt);
    // console.log("res.json  >>>", json.data.minIAmt);
    // console.log("res.json  >>>", json.data.minTAmt);

    let vo = {
        coinType : coinType,
        maxAmt : uncomma($('#maxAmt').val()),
        minIAmt : uncomma($('#minIAmt').val()),
        minTAmt : uncomma($('#minTAmt').val()),
        chargeMngs : []
    }

    let len = $('[name=rangeIdx]').length;

    console.log("len :", len);

    for(let i=0; i<len ; i++){
        let rangeIdx =  uncomma($('input[name=rangeIdx]').eq(i).val());
        let chargeAmt = uncomma($('input[name=chargeAmt]').eq(i).val());
        vo.chargeMngs.push({rangeIdx:rangeIdx, chargeAmt:chargeAmt});
    }

    console.log("vo: ", vo);


}

