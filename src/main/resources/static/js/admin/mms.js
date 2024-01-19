const DataTableBasic = function(){
    const initTable = function(id, order, length) {
        let _columns =
            [
                {data: 'prcsCd'}, //번호
                {data: 'mmsTitle'},
                {data: 'mmsContents'},
                {data: 'prcsCd'}
            ];

        let _columnDefs = [
            {
                targets: 1,
                width : '200px',
                render: function(data, type, full) {
                    if(full.titleChangeYn == 'Y'){
                        return `<input id="title-${full.prcsCd}" type="text" class="form-control form-control-user" placeholder="제목" value="${data != 'null' ? data : ""}">`;
                    }
                    return data;
                },
            },
            {
                targets: 2,
                width : '500px',
                render: function(data, type, full) {
                    return `<textarea id="contents-${full.prcsCd}" class="form-control form-control-user" style="height: 350px;">${data != 'null' ? data : ''}</textarea>`
                },
            },
            {
                targets: 3,
                render: function(data, type, full) {
                    return `<button class="btn btn-primary" id="${data}" name="${data}" type="button" onclick="mmsSave('${data}', '${full.titleChangeYn}');">저장</button>`;
                },
            },
        ];

        const table = $('#'+id);

        table.DataTable({
            pagingType:'full_numbers',
            autoWidth: false,
            responsive: true,
            paging: false,
            searching: false,
            info: true,
            destroy: true,
            processing: true,
            serverSide: true,
            ordering: false,
            responsive: false,
            lengthMenu: [[10, 20, 50, 100], ['10개', '20개', '50개', '100개']],

            ajax: {
                url : "/admin/mmsFormatList",
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
    $('#sidebarToggleTop').click();
    DataTableBasic.init('dataTable', [{colum: 'regDttm', dir:'desc'}], 10);
});

function mmsSave(prcsCd, titleChangeYn){
    console.log("prcsCd : ", prcsCd);
    let title = '';

    if(titleChangeYn === 'Y'){
        title = $('#title-'+prcsCd).val();
    }
    let contents = $('#contents-'+prcsCd).val();

    let param = {prcsCd: prcsCd, mmsTitle:title, mmsContents: contents, titleChangeYn:titleChangeYn}

    console.log("param : ", param);


    $.ajax({
        url : "/admin/mmsFormatSave",
        type: 'POST',
        dataType : 'json',
        data : param,
        success : function(res){
            DataTableBasic.init('dataTable', [{colum: 'regDttm', dir:'desc'}], 10);
        }
    })


}

function copyText(el){
    let val = $(el).text();
    const textArea = document.createElement('textarea');
    document.body.appendChild(textArea);
    textArea.value = val;

    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);


}