let title = `공지사항`;

let notice1 = `코인 판매 또는 판매 대행 서비스는 제공하지 않습니다.
                서비스 이용을 권유 또는 홍보하거나 타사이트와 협약을 맺지 않습니다.
                타사이트에서 권유 또는 추천으로 방문하셨다면 유의하시어 이용 바랍니다.
                <p class="text-danger">모든 이용 책임은 신청자 본인에게 있습니다.</p>`;

let notice2 = `소액(10만원 이하)의 구매 및 전송 대행 전문 업체입니다.
                    정상 영업시간은 아침 9시 ~ 밤 12시까지 입니다.
                    가능한 경우 아침 8시 ~ 새벽 1시까지 서비스 제공이 가능합니다.
                    대행 신청 접수해주시면 진행 절차를 별도 안내드리겠습니다.
                    `;

let contactMsg = `
    최근 가상화폐로 결재하시면 대폭할인해드립니다 라는 사기가 급증하고 있습니다. 주의하세요!
    <p class="text-danger">신청자명과 입금자명은 같아야 하며, 이체된 계좌의 명의인도 동일해야 합니다.(입금자명 변경입금시도불가)</p>
    가상화폐지갑생성시 개인정보입력이 없어 지갑주인을 신고 하셔도 찾을수 없어요. 확실한거래만 진행하세요.
    가상화폐는 전송(블록체인 네트워크접수)을 접수하게되면 되돌리거나 수정, 취소를 할 수 없습니다.
    범죄우려(불법영상,마약류,약물등)가 있는 거래는 시도하지 마세요.(저희 오박코인은 경찰조사에 적극 협조합니다.)
    최근 가상화폐(암호화화폐)를 보내라는 거래방식의 <p class="text-danger">피싱 및 금융사기 시도가 연이어 발생하고 있으므로 주의가 필요합니다.</p> 
    저희는 고객이 입력한 지갑주소의 어떠한 정보도 알 수 없으며 사기를 당했을 시 도움을 드릴 수 있는 방법이 없습니다.
    저희는 해당 관련된 범죄에 대하여 강력히 규탄하며 사건발생시 수사기관과 적극협조하여 최대한 그러한 일이 발생하지 않도록 노력하겠습니다.
    <p class="text-danger">이러한 위험성을 인지하고 가상화폐(암호화화폐)의 구매전송대행을 이용하시는 모든 책임은 당사자 본인에게 있음을 안내 드립니다.</p>
    
    주의사항을 읽고 대행신청 및 진행에 대한 책임은 신청자 본인에게 있음을 동의합니다.
`;

var tradePrice = {
    'KRW-BTC' : '',
    'KRW-ETH' : '',
    'KRW-XRP' : ''
};

let timmer = setInterval(()=>{
    LOAD_YN = false;
    getCoinPrice();
}, 10000);

$(document).ready(function(){
    REFERER_URL = document.referrer;

    console.log("REFERER_URL >", REFERER_URL);
    console.log("DEVICE_TYPE >", DEVICE_TYPE);




    alertNotice(title, notice1, ()=>{
        alertNotice(title, notice2);

    });

    getCoinPrice();
});


function contact(){

    alertConfirm('유의사항', contactMsg, '확인했습니다',()=>{
        // $('#contactForm').reset();
        document.getElementById("contactForm").reset();
        LOAD_YN = true;
        clearInterval(timmer);
        $("#transReqModal").modal('show');
    })


}

function getCoinPrice(){

    $.ajax({
        url : "/api/coinPrice",
        type: 'POST',
        contentType : 'application/json',
        success : function(res){
            console.log("res >>", res);
            if(res.statusCode === 'S001'){
                for(let data of res.data){
                    $('#'+data.coinType).text(comma(data.amt).concat(" 원"));
                    tradePrice[data.coinType] = data.amt;
                    // if(data.coinType === 'KRW-BTC'){
                    //     tradePrice.BTC = data.amt;
                    // }else if(data.contentType === 'KRW-ETH'){
                    //     tradePrice.ETH = data.amt;
                    // }else{
                    //     tradePrice.XRP = data.amt;
                    // }
                }

                console.log("tradePrice >>" , tradePrice);
            }
        }
        , error : function(res){

        }
    })

}


