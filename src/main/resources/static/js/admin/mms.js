const DataTableBasic = function(){
    const initTable = function(id, order, length) {
        let _columns =
            [
                {data: 'prcsCd'}, //번호
                {data: 'mmsTitle'},
                {data: 'mmsContents'},
            ];

        let _columnDefs = [
            {
                targets: 1,
                width : '200px',
                render: function(data, type, full) {
                    if(full.titleChangeYn == 'Y'){
                        return `<input type="text" class="form-control form-control-user" placeholder="제목" value="${data}">`;
                    }
                    return data != 'null' ? data : "";
                },
            },
            {
                targets: 2,
                width : '500px',
                render: function(data, type, full) {
                    return `<textarea class="form-control form-control-user" style="height: 350px;">${data != 'null' ? data : ''}</textarea>`
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
    DataTableBasic.init('dataTable', [{colum: 'regDttm', dir:'desc'}], 10);
})