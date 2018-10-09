// 縦横畫面が変わるタイミングをみる				
var window_long

// 起動、リロードしたときに呼ぶ関数				
function MangaScreen(number){
    CreateIMG(number)
    var wh = WidthHeight()
    console.log(wh);
    //スマホ時に行う処理を書く
    if (wh == 'vertical') {
        console.log('縦');
        $('.slider').children('img').removeClass('prev');
        $('.slider').children('img').addClass('next');
        $(".slider").width($(window).width()*0.9);
        console.log($(".slider").width($(window).width()*0.9));
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
        console.log('横');
        $(".slider").width(($(window).height())*1.416);
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
    console.log('resize');
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
	$('.slider').append(html_img);
}
