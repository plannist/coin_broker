$(document).ready(function(){
	$('#sidebarToggleTop').click();
	$('.nav-item').removeClass('active');
	$('.nav-item').eq(2).addClass('active');
	DataTableBasic.init('dataTable', [{colum: 'regDttm', dir:'desc'}], 10);
});

const DataTableBasic = function(){
	const initTable = function(id, order, length) {
		let _columns =
			[
				{data: 'wltAddr'}, //번호
				{data: 'memo'},
				{data: 'wltAddr'}
			];

		let _columnDefs = [
			{
				targets: 0,
				width : '200px',
				render: function(data, type, full) {
					if(full.titleChangeYn == 'Y'){
						return `<input id="title-${full.prcsCd}" type="text" class="form-control form-control-user" placeholder="제목" value="${data != 'null' ? data : ""}">`;
					}
					return data;
				},
			},
			{
				targets: 1,
				width : '500px',
				render: function(data, type, full) {
					return `<textarea id="contents-${full.prcsCd}" class="form-control form-control-user" style="height: 350px;">${data != 'null' ? data : ''}</textarea>`
				},
			},
			{
				targets: 2,
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
				url : "/admin/walletList",
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