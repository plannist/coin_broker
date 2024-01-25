let html = `             <!-- Page Heading -->
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-black-50 krFont">관리자 계정 설정</h1>
                    </div>
                    <div class="row mt-3">
                        <div class="col">
                            <label class="form-label" for="adminId1">관리자ID 1</label>
                            <input class="form-control form-control-user" id="adminId1" name="adminList[0].id" placeholder="차단문구" >
                            <input type="hidden" id="beforeId1" name="adminList[0].beforeId">
                        </div>

                        <div class="col">
                            <label class="form-label" for="pwd1">비밀번호</label>
                            <input class="form-control form-control-user" id="pwd1" name="adminList[0].password" placeholder="차단문구" >
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col">
                            <label class="form-label" for="adminId2">관리자ID 2</label>
                            <input class="form-control form-control-user" id="adminId2" name="adminList[1].id" placeholder="차단문구" >
                            <input type="hidden" id="beforeId1" name="adminList[1].beforeId">
                        </div>

                        <div class="col">
                            <label class="form-label" for="pwd2">비밀번호</label>
                            <input class="form-control form-control-user" id="pwd2" name="adminList[1].password" placeholder="차단문구" >
                        </div>
                    </div>
                     <div class="row mt-5">
                        <div class="btn-group">
                            <button class="btn btn-primary" id="submit" type="button" onclick="save();">변경사항 저장하기</button>
                        </div>
                    </div>
`;

$(document).ready(function(){

    $('.nav-item').removeClass('active');
    $('.nav-item').eq(1).addClass('active');
    $('#sidebarToggleTop').click();
    $('#adminForm').append(html);

    draw();
});

function draw(){
    $.ajax({
        url : "/admin/basic-info-find",
        type: 'POST',
        dataType : 'json',
        // contentType : 'application/json',
        success : function(res){
            let data = res.data;
            $('#metaTag').val(data.metaTag);
            $('#salName').val(data.salName);
            $('#oderName').val(data.oderName);
            $('#salSno').val(data.salSno);
            $('#firstPhoneNo').val(data.firstPhoneNo);
            $('#kakaoOpenUrl').val(data.kakaoOpenUrl);
            $('#telegramId').val(data.telegramId);
            $('#phoneNo').val(data.phoneNo);
            $('#email').val(data.email);
            $('#bankAcc1').val(data.bankAcc1);
            $('#bankAcc2').val(data.bankAcc2);
            $('#bankAcc3').val(data.bankAcc3);
            $('#bankAcc4').val(data.bankAcc4);

            let html = `
                <!-- Page Heading -->
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 class="h3 mb-0 text-black-50 krFont">관리자 계정 설정</h1>
                </div>
            `;

            let adminList = data.adminList;
            adminList.forEach((o, i) => {
                html += `
                     <div class="row mt-3">
                        <div class="col">
                            <label class="form-label" for="adminId${i}">관리자ID ${i+1}</label>
                            <input class="form-control form-control-user" id="adminId${i}" name="adminList[${i}].id" placeholder="차단문구" value="${o.id}">
                            <input type="hidden" name="adminList[${i}].beforeId" value="${o.id}">
                        </div>

                        <div class="col">
                            <label class="form-label" for="password${i}">비밀번호</label>
                            <input class="form-control form-control-user" id="password${i}" name="adminList[${i}].password" placeholder="변경할 비밀번호" value="">
                        </div>
                    </div>
                `;
            })



            html += `
                 <div class="row mt-5">
                    <div class="btn-group">
                        <button class="btn btn-primary" id="submit" type="button" onclick="save();">변경사항 저장하기</button>
                    </div>
                </div>
            `;

            $('#basicForm').append(html);
        }
    });
}

function save(){
    const myForm = document.getElementById("basicForm");
    const formData = new FormData(myForm);
    const formVo = Object.fromEntries(formData.entries());
    console.log(formVo);


    $.ajax({
        url : "/admin/basic-info-save",
        type: 'POST',
        dataType : 'json',
        data : formVo,
        // contentType : 'application/json',
        success : function(res){
            if(res.statusCode === 'S001'){
                if(res.data.flag){
                    alertNotice("주의", "현재사용자의 변경사항이 있습니다. 다시 로그인해주세요", ()=>{
                        location.href = "/logout";
                    })
                }else{
                    location.href="/admin/basic-info";
                }
            }else{
                alertNotice("에러", "필수입력값이 없습니다.", ()=>{
                    return false;
                })
            }

        }
    });


}
