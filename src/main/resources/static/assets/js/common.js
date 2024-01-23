//var principalName = getCookie("SAVED_NAME");
//
//if(principalName){
//     $('.login_sec .none_login').hide();
//     $('.right_sec .btn_sec').hide();
//
//    $('.login_sec .login div[name="userNm"]').html(principalName + ' 님');
//    $('.right_sec .login_sec .name').html(principalName + ' 님');
//
//    $('.login_sec .login').show();
//    $('.right_sec .login_sec').show();
//
//
//}else{//로그인 안되었을때
//    $('.login_sec .none_login').show();
//    $('.right_sec .btn_sec').show();
//
//    $('.login_sec .login').hide();
//    $('.right_sec .login_sec').hide();
//
//}

/*브라우저 위경도 값 리턴*/
function currentPosition(){
	let object = {'lat':37.65183601305178, 'lng' : 126.9121547510149};
	window.navigator.geolocation.getCurrentPosition(
		function(position){
			let lat = position.coords.latitude;
			let lng = position.coords.longitude;
			object['lat'] = lat;
			object['lng'] = lng;
			object['code'] = "S001";
			object['msg'] = "위치를 성공적으로 조회하였습니다.";
		},
		function(error){
			object['code'] = "E001";
			switch(error.code){
				case error.PERMISSION_DENIED :
					object['msg'] = "사용자 거부";
					break;
				case error.POSITION_UNAVAILABLE :
					object['msg'] = "지리정보 없음";
					break;
				case error.TIMEOUT :
					object['msg'] = "시간 초과";
					break;
				case error.UNKNOWN_ERROR :
					object['msg'] = "알수없는 에러";
					break;
			}
		}
	)
    console.log("curposition. : ", object['msg']);
	return object;
}



function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

/*메뉴세팅하기*/
function setMenu(name) {
	  $('.menu .active').removeClass('active');
	  $('.menu div[name="' + name + '"]').addClass('active');
}

/*쿠키가져오기*/
function getCookie(name) {
	  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	  return value? value[2] : null;
}


$(function(){
    button_effect();
	if(!_.isEmpty){
		header_effect();
	}

    m_menu_effect();
    radio_effect();
    input_readonly();
});

/* header */
function header_effect(){
	 $(window).scroll(function () {
        var scrollValue = $(document).scrollTop();
        if(scrollValue > 0){
            $("header").addClass("down");
            if($("header").attr("class").indexOf("white_type") !== -1){
                $("header").removeClass("white_type");
                $("header").addClass("white_type_memory");
            }
        } else {
            $("header").removeClass("down");
            if($("header").attr("class").indexOf("white_type_memory") !== -1){
                $("header").removeClass("white_type_memory");
                $("header").addClass("white_type");
            }
        }
    });
}

/*header 초기화 */
function setHeaderBg(headerText){
	//$(".header_bg").attr("class","header_bg "+bgNo);
	$(".header_text").html(headerText);
}


/* 버튼 이펙트 */
function button_effect(){
    $('.button').on('touchstart mousedown',function(event){
        $(this).addClass("active");
    });
    $('.button').on('touchend mouseup mouseleave',function(event){
        $(this).removeClass("active");
    });
}

/* 모바일 메뉴 */
function m_menu_effect(){

    /* mobile menu top 위치 변경 */
    $(window).scroll(function () {
        scrollHeight = $(document).scrollTop();
        $(".m_menu_zone").css("top",scrollHeight);
    });

    /*ios 팝업스크룰 막기 -*/
    $(".m_menu_zone").bind("touchmove", function(e) {
    	e.preventDefault();
    });




    /* mobile menu 호출 */
    $(".m_menu_icon").on("click", function(){
        // scrollHeight = $(document).scrollTop();
        $(".m_menu_zone").css("transform","translateX(0%)");
        // $(".m_menu_zone").css("top",scrollHeight);
        $("body").css("overflow","hidden");

        /*ios 팝업스크룰 막기 -*/
        $('.all_wrap').addClass('m_scrollDisable').on('scroll touchmove mousewheel', function(e){
            e.preventDefault();
        });

    })

    /* mobile menu 닫기 */
    $("#close_m_menu").on("click", function(){
        $(".m_menu_zone").css("transform","translateX(-100%)");
        $("body").css("overflow","auto");


        /*ios 팝업스크룰 막기 -*/
        $('.all_wrap').removeClass('m_scrollDisable').off('scroll touchmove mousewheel');
    })

}

/* 라디오 버튼 관련 */
function radio_effect(){
    $(".radio_item .value").on("click", function(){
        $("input[type='radio']").removeAttr("checked");
        $(this).siblings("input").prop("checked",true);
    })
}

/* ALERT 호출 */
function call_alert(title, message, okText){
    scrollHeight = $(document).scrollTop();
    if(!okText) okText = "확인";
    return new Promise(function(resolve, reject){
        $("body").append('<div id="popup_zone"><div class="popup" id="pw_change"><div><div class="title">'+title+'</div><div class="cont">'+message+'</div></div><div class="btn_group"><div class="popup_btn button ok">'+okText+'</div></div></div></div>');
        $("#popup_zone").css("top",scrollHeight);
        $("body").css("overflow","hidden");
        button_effect();

        /*ios 팝업스크룰 막기 -*/
        $("#popup_zone").bind("touchmove", function(e) {
        	e.preventDefault();
        });

        $('.all_wrap').addClass('alert_scrollDisable').on('scroll touchmove mousewheel', function(e){
            e.preventDefault();
        });


        $(".popup_btn").on("mousedown", function(){
            $(this).addClass("active");
        })
        $(".popup_btn.ok").on("click", function(){
            // 확인버튼 클릭
            resolve();
            close_popup();

            /*ios 팝업스크룰 막기 -*/
            $("#popup_zone").unbind("touchmove");
            $('.all_wrap').removeClass('alert_scrollDisable').off('scroll touchmove mousewheel');
        })
    })
}

/* confirm 호출 */
function call_confirm(title, message, okText, cancleText){
    if(!okText) okText = "확인";
    if(!cancleText) cancleText = "취소";
    scrollHeight = $(document).scrollTop();
    return new Promise(function(resolve, reject){
        $("body").append('<div id="popup_zone"><div class="popup" id="pw_change"><div><div class="title">'+title+'</div><div class="cont">'+message+'</div></div><div class="btn_group"><div class="popup_btn button cancle">'+cancleText+'</div><div class="popup_btn button ok">'+ okText + '</div></div></div></div>');
        $("#popup_zone").css("top",scrollHeight);
        $("body").css("overflow","hidden");

        /*ios 팝업스크룰 막기 -*/
        $("#popup_zone").bind("touchmove", function(e) {
        	e.preventDefault();
        });

        $('.all_wrap').addClass('confirm_scrollDisable').on('scroll touchmove mousewheel', function(e){
            e.preventDefault();
        });

        $(".popup_btn.ok").on("click", function(){
            // 확인버튼 클릭
            button_effect();
            resolve(true);
            close_popup();

            /*ios 팝업스크룰 막기 -*/
            $("#popup_zone").unbind("touchmove");
            $('.all_wrap').removeClass('confirm_scrollDisable').off('scroll touchmove mousewheel');

        });
        $(".popup_btn.cancle").on("click", function(){
            // 취소버튼 클릭
            button_effect();
            resolve(false);
            close_popup();

            /*ios 팝업스크룰 막기 -*/
            $("#popup_zone").unbind("touchmove");
            $('.all_wrap').removeClass('confirm_scrollDisable').off('scroll touchmove mousewheel');
        })
    })
}

/* 팝업 닫기 */
function close_popup(){
    $("#popup_zone").remove();
    $("body").css("overflow","auto");
}


/* ie input readonly cursor */
function input_readonly(){
    $("input[readonly]").on("click",function(){
        this.blur();
    })
}

/*페이징 처리*/
function pageBlockSetting(data,divId){
	var pageHtml = '<div class="page_wrap">';
	if(data.hasPrevUnit){
		//pageHtml += "<a href='#' rel="+data.endPageOfPrevUnit+" class='link-page ico btn_page_frist'><i></i></a>";
		pageHtml += '<a rel="' + data.endPageOfPrevUnit + '" class="link-page arrow2 pprev" href="#"></a>';

	}
	if(data.currentPage > 1){
		pageHtml += '<a rel="' + (data.currentPage - 1) + '" class="link-page arrow prev" href="#"></a>';
	}

	pageHtml += '<div class="page_nation">';
	for(var i=data.beginPage; i<=data.endPage; i++){
		if(i == data.currentPage){
			//pageHtml +="<a href='#' rel='0' class='link-page here'>"+i+"</a>";
			pageHtml +='<a rel="0" href="#" class="link-page active">' + i + '</a>';
		}else{
			//pageHtml +="<a href='#' rel='"+i+"' class='link-page'>"+i+"</a>";
			pageHtml +='<a rel="' + i + '" href="#" class="link-page">' + i + '</a>';
		}
	}
	pageHtml += '</div>';

	if(data.currentPage < data.lastPage){
		pageHtml += '<a rel="' + (data.currentPage + 1) + '" class="link-page arrow next" href="#"></a>';
	}

	if(data.hasNextUnit){
		//pageHtml += "<a href='#' rel='"+data.beginPageOfNextUnit+"' class='link-page ico btn_page_last'><i></i></a>";
		pageHtml += '<a rel="' + data.beginPageOfNextUnit + '" class="link-page arrow2 nnext" href="#"></a>';

	}
	pageHtml += '</div>';

	if(divId==null){
		$('#pageList').html(pageHtml);
	}else{
		$('#' + divId).html(pageHtml);
	}

	console.log("data.beginPage: ", data.beginPage,", data.endPage: ",data.endPage,", data.currentPage: ",data.currentPage);

	$('.link-page').click(function(e){

		if($(this).attr('rel')>0){
			/*페이지브럭 클릭이벤트 직접 선어해서 사용할것*/
			pageBlockEvent($(this).attr('rel'));
		}else{
			e.preventDefault();
		}
	});
}


/*널롹인*/
isEmptyCheck = function(object, title, message, okText){
	try{
		//var str = $(object).attr("value");
		var str = $(object).val();			// ver 1.9.1
		str = $.trim(str);
		if(str == ''){
			if(message != null && '' != message){
//				alert(msg);
				call_alert(title, message).then(function(tableData){ $(object).focus(); });
			};

			return false;
		}else{
			return true;
		}
	}catch (e) {
//		alert(e);
		call_alert('오류', e);
	}
}

/*딜레이*/
var delay = (function(){
    var timer = 0;
    return function(callback, ms){
       clearTimeout(timer);
       timer = setTimeout(callback, ms);
    }
 })();

/* 확인, 취소 alert */
function alertConfirm(title, html, confirmText, permission, onClose){
    Swal.fire({
        html: html,
        title: title,
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        confirmButtonText: confirmText,
        cancelButtonText: '취소',
        focusConfirm: false,
        // onClose: () => {
        //     onClose();
        // },

    }).then(function(confirm){
        permission(confirm);
    });
}

/* 확인 alert */
function alertNotice(title, html, onClose){
    Swal.fire({
        html: html,
        title: title,
        onClose: () => {
        	if(onClose){
		        onClose();
	        }

        }
    });
}

function alertMaintenance(title, html){
	Swal.fire({
		html: html,
		title: title,
		showCancelButton: false,
	});
}

/*ajax promise*/
function ajaxPromise  (url, data, cont)  {
    return new Promise(function(resolve, reject){
        let contentType = "application/x-www-form-urlencoded; charset=UTF-8";
        if(cont){
            contentType = cont;
            if(cont.indexOf("application/json") != -1){
                data = JSON.stringify(data);
            }
        }
        $.ajax({
            url : url,
            type: 'POST',
            dataType : 'json',
            contentType : contentType,
            data : data,
            success : function(res){
                resolve(res);
            }, error : function(res){
                reject(res);
            }
        })
    });
}

//본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
function execDaumPostcode() {
	new daum.Postcode({
		oncomplete : function(data) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            alert("팝업1");
			// 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
			var extraRoadAddr = ''; // 도로명 조합형 주소 변수

			// 법정동명이 있을 경우 추가한다. (법정리는 제외)
			// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
			if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
				extraRoadAddr += data.bname;
			}
			// 건물명이 있고, 공동주택일 경우 추가한다.
			if (data.buildingName !== '' && data.apartment === 'Y') {
				extraRoadAddr += (extraRoadAddr !== '' ? ', '
						+ data.buildingName : data.buildingName);
			}
			// 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
			if (extraRoadAddr !== '') {
				extraRoadAddr = ' (' + extraRoadAddr + ')';
			}
			// 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
			if (fullRoadAddr !== '') {
				fullRoadAddr += extraRoadAddr;
			}

			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			document.getElementById('zipCd').value = data.zonecode; //5자리 새우편번호 사용
			document.getElementById('rgnCd').value = data.sigunguCode;
			document.getElementById('baseAddr').value = fullRoadAddr;
			$("#dtlAddr").removeAttr("readonly");
			//document.getElementById('dtlAddr').value = data.jibunAddress;
			// 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
			//                 if(data.autoRoadAddress) {
			//                     //예상되는 도로명 주소에 조합형 주소를 추가한다.
			//                     var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
			//                     document.getElementById('guide').innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';

			//                 } else if(data.autoJibunAddress) {
			//                     var expJibunAddr = data.autoJibunAddress;
			//                     document.getElementById('guide').innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';

			//                 } else {
			//                     document.getElementById('guide').innerHTML = '';
			//                 }
            alert("팝업2");
		}
	}).open();
}


/*escapeXml 변환*/
function trustHtml(str) {
	return $('<div />').html(str).text();
}


/*--------Date() format 적용 함수 start----------*/
Date.prototype.format = function (f) {

    if (!this.valueOf()) return " ";



    var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

    var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];

    var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    var d = this;



    return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {

        switch ($1) {

            case "yyyy": return d.getFullYear(); // 년 (4자리)

            case "yy": return (d.getFullYear() % 1000).zf(2); // 년 (2자리)

            case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)

            case "dd": return d.getDate().zf(2); // 일 (2자리)

            case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)

            case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)

            case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)

            case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)

            case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)

            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)

            case "mm": return d.getMinutes().zf(2); // 분 (2자리)

            case "ss": return d.getSeconds().zf(2); // 초 (2자리)

            case "a/p": return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분

            default: return $1;

        }

    });

};



String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };

String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };

Number.prototype.zf = function (len) { return this.toString().zf(len); };
/*--------Date() format 적용 함수 end----------*/

function headerLogout(){
	swal({
		title : "로그아웃 하시겠습니까?",
		type : "warning",
		showCancelButton : true,
		confirmButtonText : 'OK',
		cancelButtonText : 'NO',
		reverseButton  : true
	}).then(function(result){
		if(result.value){
			location.href='/logout';
		}
	});
}

function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

// post 전송
function post(path, params, target='_self', method='post') {
    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    const form = document.createElement('form');
    form.method = method;
    form.action = path;
    form.target = target;

    for (const key in params) {
        if (params.hasOwnProperty(key) && params[key]) {
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = key;
            hiddenField.value = params[key];
            form.appendChild(hiddenField);
        }
    }
    document.body.appendChild(form);
    form.submit();
//ex)	post('/contact/', {name: 'Johnny Bravo'});
}
