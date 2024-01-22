$(document).ready(function(){
	$('#sidebarToggleTop').click();
	$('.nav-item').removeClass('active');
	$('.nav-item').eq(2).addClass('active');
	search();
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
					if(!data ){
						return `<input id="walletAddr" type="text" class="form-control form-control-user" placeholder="지갑주소 입력" >`;
					}else{
						return data;
					}

				},
			},
			{
				targets: 1,
				width : '400px',
				render: function(data, type, full) {
					if(!data){
						return `<textarea id="memo" class="form-control form-control-user" style="height: 100px;"</textarea>`
					}else{
						return data;
					}

				},
			},
			{
				targets: 2,
				render: function(data, type, full) {

					if(data){
						return `<button class="btn btn-primary" type="button" onclick="update('D', '${data}');">삭제</button>`;
					}else{
						return `<button class="btn btn-primary" type="button" onclick="update('I', null);">저장</button>`;
					}


				},
			},
		];

		const table = $('#'+id);

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
				url : "/admin/service-walletList",
				data : function(param){

					let keyword = $('#keyword :selected').val();
					let val = $('#navSearchContents').val();
					if(keyword){
						param.keyword = keyword;

						if(!val){
							val = $('#navSearchContents').val();
						}

						param.input = val;
					}
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

function update(type, walletAddr){
	let param = {type: type }
	if(!walletAddr){
		param.wltAddr = $('#walletAddr').val();
		param.memo = $('#memo').val();
	}else{
		param.wltAddr = walletAddr;
	}


	$.ajax({
		url : "/admin/service-walletUpdate",
		type: 'POST',
		// contentType : 'application/json',
		dataType: 'json',
		data: param,
		success : function(res){
			console.log(" 상세주문조회 !! res >> ", res);
			search();

		}
	})
}

function search(){
	DataTableBasic.init('dataTable', [{colum: 'regDttm', dir:'desc'}], 10);
}