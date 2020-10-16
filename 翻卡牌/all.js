// 計時和紀錄

let timesec = 0
let timer = 0
let isInGame = false

let highrecord = { name: "", time: ""}

let highrecordStorage = JSON.parse(localStorage.getItem('highrecord')) 
if(highrecordStorage!=null){
    highrecord = highrecordStorage
    $('#player').text(highrecord.name)
    $('#playerTime').text(highrecord.time)
}

$('#btn-start').click(function(){
    timesec = 0
    isInGame = true
    $(this).attr('disabled',true)
    
     timer = setInterval(() => {
        timesec++
        $('#time').text(timesec)
    }, 1000); 

    if($('.clear').length==totalCard){
        $('.card').remove()
        cards();
    }

})



// 翻卡牌
const totalCard = 18

function cards(){
    for(let i=0;i<totalCard;i++){
        $('#game').append(`
            <div class="card close">
                <div class="back"></div>
                <div class="front"></div>
            </div>
        `)

        const num = i %(totalCard/3)+1
        $('#game').find('.front').eq(i).css('background-image',`url('./img/${num}F.png')`)
        $('.card').eq(i).attr('data-card', num)
        
        const rand = Math.floor(Math.random()*$('.card').length)    
        $('.card').eq(rand).insertAfter($('.card').eq(i))
    
    }

}
cards();


$('#game').on('click','.card',function(){
    if(isInGame == true && $('.card:not(.close)').length<3){
    $(this).removeClass('close')
    }


    if($('.card:not(.close)').length==3){

    if($('.card:not(.close)').eq(0).attr('data-card')==$('.card:not(.close)').eq(1).attr('data-card') && $('.card:not(.close)').eq(1).attr('data-card')==$('.card:not(.close)').eq(2).attr('data-card')){
        $('.card:not(.close)').fadeTo(800,0).addClass('clear')
    }

    setTimeout(()=>{
        $('.card:not(.close)').addClass('close')
    },1000)
    }

    if($('.clear').length==totalCard){
        setTimeout(()=>{
            alert('恭喜你完成了!')
        },1000)

        clearInterval(timer)
        $('#btn-start').attr('disabled',false)
        
        
        if(highrecordStorage===null || timesec<highrecordStorage.time){
            setTimeout(() => {
                
                const name = prompt('你是最快完成的人! 輸入你的大名吧')
                highrecord.name = name || 'player'
                highrecord.time = timesec
                localStorage.setItem('highrecord',JSON.stringify(highrecord))

                $('#player').text(highrecord.name)
                $('#playerTime').text(highrecord.time)
                clearInterval(timer)
            }, 1200);
        }

    
    }
})


