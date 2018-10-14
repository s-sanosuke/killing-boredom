// 縦横畫面が変わるタイミングをみる				
var window_long

// 起動、リロードしたときに呼ぶ関数				
function MangaScreen(number, stnum){
    story_number = stnum;
    CreateIMG(number)
    var wh = WidthHeight()
    //スマホ時に行う処理を書く
    if (wh == 'vertical') {
        $('.slider').children('img').removeClass('prev');
        $('.slider').children('img').addClass('next');
        $(".slider").width($(window).width()*0.9);
        $('#sp').height($(window).height());
        $('#sp').width($(window).width()*0.9);
        $('#nex').offset({top: $('#nex').position().top*1.3, left: $('#sp').position().left+20});
        $('#pre').offset({top: $('#pre').position().top*1.5, left: $('#sp').position().left+20});
        $('.slider').slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            vertical: true,
            verticalSwiping: true,
            // variableWidth: true
        });
        window_long = 'vertical';
    } 
    //タブレット、PCに行う処理を書く
    else {
        $(".slider").width(($(window).height())*1.416);
        $('#sp').height($(window).height());
        $('#sp').width(($(window).height())*1.416/2);
        $('#nex').offset({top: $('#nex').position().top*1.3, left: $('#sp').position().left+20});
        $('#pre').offset({top: $('#pre').position().top*1.5, left: $('#sp').position().left+20});
        $('.slider').slick({
            rtl: true,
            infinite: false,
            slidesToShow: 2,
            slidesToScroll: 2,	
            variableWidth: true
        });
        window_long = 'horizontal';
    }
}

// 画面サイズが変わったら呼ぶ関数
$(window).on('resize', function() {
    var wh = WidthHeight()
    if (wh == 'vertical') {
        $(".slider").width($(window).width()*0.9);
        if (window_long == 'horizontal') {
            location.reload();
        }
        window_long = 'vertical';
    } else {
        $(".slider").width(($(window).height())*1.416);
        if (window_long == 'vertical') {
            location.reload();
        }
        window_long = 'horizontal';
    } 
});

// 前後ろページに移動
$(document).on('click','.prev', function() {
    $('.slider').slick('slickPrev');
});
$(document).on('click','.next', function() {
    $('.slider').slick('slickNext');
});

// 次前の話に移動
$(document).on('click','#nex', function() {
    url = 'https://s-sanosuke.github.io/killing-boredom/manga1/';
    window.location.href = url+'web'+String(story_number+1)+'/mv'+String(story_number+1);
});
$(document).on('click','#pre', function() {
    if (story_number != 1){
        url = 'https://s-sanosuke.github.io/killing-boredom/manga1/';
        window.location.href = url+'web'+String(story_number-1)+'/mv'+String(story_number-1);
    }
});


// 縦長か横長か調べる関数
function WidthHeight(){
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var aspect = windowHeight/windowWidth
	if (aspect > 0.757) {
		return 'vertical'
	} else {
		return 'horizontal'
	} 
}


// imgタグを生成する
function CreateIMG(number){
	var page
	var html_img = '<img class="prev" src="1.jpg">';
	for (var i=2; i<=number; i++) {
		if (i%2 == 0){page = 'next';}
		else{page = 'prev';}
		html_img += '<img class="' + page + '" src="' + String(i) + '.jpg">';
      }
    html_img +='<span id="sp" style="background-color: #FFFFFF"><button id="pre">前の話</button><button id="nex">次の話</button></span>';    
	$('.slider').append(html_img);
}
