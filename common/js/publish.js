// 포트폴리오 값 입력
function insertPortfolio(val) {
    var item = portfolio[val];
    for (var i = 0; i < item.length; i++) {
        if ($('.val').eq(i).is('img')) {
            $('.val').eq(i).attr({
                src: item[i][0],
                alt: item[i][1],
            });
        } else if ($('.val').eq(i).is('a')) {
            $('.val').eq(i).attr('href', item[i]).text(item[i]);
        } else {
            $('.val').eq(i).text(item[i]);
        }
    }
}
function FullHeightBanner() {
    winH = $(window).outerHeight();
    $('.mb_wrap .mb,.head').outerHeight(winH);
}
// 스크롤 방지(스크롤 위치 반영)
function pageScroll(state) {
    if (state == 'on') {
        $('body').removeClass('active');
    } else if (state == 'off') {
        $('body').addClass('active');
    }
}

$(function () {
    var winH;
    // wow.js 초기화
    new WOW().init();

    //페이지 로드시 실행
    $('.work .container').height($('.work section').height() + 'px');

    //우리가 하는일 - 탭클릭 이벤트
    $('.work button').on({
        click: function () {
            $('.work li').removeClass('active');
            $(this).closest('li').addClass('active');
        },
    });

    // 메인슬라이드 배너 이벤트
    if ($('.main_slide').length > 0) {
        var mainSlider = $('.main_slide');
        mainSlider
            .slick({
                centerPadding: 0,
                autoplay: true,
                cssEase: 'ease-in',
                pauseOnHover: false,
                infinite: true,
                autoplaySpeed: 4000,
                prevArrow: $('.mb_prev'),
                nextArrow: $('.mb_next'),
            })
            .on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
                var i = (currentSlide ? currentSlide : 0) + 1;
                $('.slide_count').html('<span class="current">' + i + '</span> / ' + slick.slideCount);
                $('.main_slide').find('p').removeClass('active');
                $('.slick-active p').addClass('active');
            });

        // 210108 추가
        $('.ProgressBar').addClass('pro-ani');
        mainSlider.on('afterChange', function () {
            $('.ProgressBar').addClass('pro-ani');
        });
        mainSlider
            .on('beforeChange', function () {
                $('.ProgressBar').removeClass('pro-ani');
            })
            .on('afterChange', function (event) {
                event.stopPropagation();
            });

        setTimeout(function () {
            $('.slick-active p').addClass('active');
        }, 300);
    }

    // function hh(){
    // 	var portH = $('.tab_con.active .port_list').innerHeight();
    // 	console.log(portH);
    // 	$('.tab_con.active .port_list').css('height', portH);
    // }
    //
    // 포트폴리오 레이아웃 플러그인
    $(window).on('load resize', function () {
        if (window.innerWidth > 768) {
            if ($('.port_list').length > 0) {
                var $portList = $('.port_list').masonry({
                    horizontalOrder: true,
                    transitionDuration: '0.5s',
                    resize: true,
                    containerStyle: { height: '1904px', position: 'relative' },
                });
                $portList.imagesLoaded().progress(function () {
                    $portList.masonry('layout');
                });
            }
        } else {
            $('.port_list').css('animation', 'none');
            $('.portfolio li').css('position', 'relative');
            $('.portfolio li').css('top', 'auto');
        }
    });
    $(window).on('load resize orientationchange', function () {
        $('.header .container').each(function () {
            var con = $(this);
            if ($(window).width() > 1017) {
                con.removeClass('active');
                $('body').removeClass('scrollDisable');
            } else {
            }
        });
        
    });
    //포트폴리오 보기
    $('.port_list a').on('click', function () {
        var portNum = $(this).attr('data-port');
        insertPortfolio(portNum);
        pageScroll('off');
        $('#modal').show();
        return false;
    });
    //버튼클릭시 모달팝업 열기
    $('.modal button').click(function (e) {
        if (e.target !== this) {
            return false;
        }
        pageScroll('on');
        $('.modal').hide();
    });

    $(window).resize(function () {
        FullHeightBanner();
    });
    FullHeightBanner();

    $('.cate_filter button').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        var tabIn = $(this).index();
    });
    $('.scrollTop').click(function () {
        $('html,body').animate({ scrollTop: 0 }, 500);
    });
    gnbToggle();
    function gnbToggle() {
        //gnb 토글
        $('.header .container button').click(function () {
            $(this).parent().toggleClass('active');
            $('body').toggleClass('scrollDisable');
        });
    }

    var pfItem = 0;
    // 210205 노재룡 추가

      var visual = $('.visual_slide');

      // 콘텐츠 탭메뉴 (컴패니, 비즈니스, 솔루션)
      $('.tabA > li > a').click(function(){
          var tabNum = $(this).parent().index();
          console.log(tabNum);
          $(this).parent().addClass('active').siblings().removeClass('active');
          $('.tabCon > li').eq(tabNum).addClass('active').siblings().removeClass('active');
          visual.slick('refresh');
          return false;
      });

       // 비즈니스 비주얼 영역
    if ($('.visual_slide').length > 0) {

        visual.slick({
            slide: 'div', //슬라이드 되어야 할 태그 ex) div, li
            slidesToShow: 1, // 한 화면에 보여질 컨텐츠 개수
            slidesToScroll: 1, //스크롤 한번에 움직일 컨텐츠 개수
            autoplay: true, // 자동 스크롤 사용 여부
            autoplaySpeed: 4000, // 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
            infinite: true, //무한 반복 옵션
            speed: 500, // 다음 버튼 누르고 다음 화면 뜨는데까지 걸리는 시간(ms)
            arrows: true, // 옆으로 이동하는 화살표 표시 여부
            dots: true, // 스크롤바 아래 점으로 페이지네이션 여부
            appendDots: $('.visual .mb_paging'),
            customPaging: function (slide, i) {
                return '<button type="button">' + (i + 1) + '번째 슬라이드로 이동</button>';
            },
            pauseOnHover: true, // 슬라이드 이동시 마우스 호버하면 슬라이더 멈추게 설정
            // vertical: false, // 세로 방향 슬라이드 옵션
            draggable: true, //드래그 가능 여부
            prevArrow: $('.visual .prev'), // 이전 화살표 특정한 클래스로 변경
            nextArrow: $('.visual .next'), // 다음 화살표 특정한 클래스로 변경
            // accessibility: true, // 접근성 여부
            responsive: [
                // 반응형 웹 구현 옵션
                {
                    breakpoint: 1030, //화면 사이즈 px
                    settings: {
                        // 여기에 추가하면 그걸로 변경
                        arrows: false,
                    },
                },
            ],
        });
        visual.slick('refresh');
    }

    $('.visual .stop').click(function () {
        var s_btn = $(this).attr('class');

        if (s_btn == 'stop') {
            visual.slick('slickPause');
            $(this).attr('class', 'play');
            $(this).children().text('재생');
        } else {
            visual.slick('slickPlay');
            $(this).attr('class', 'stop');
            $(this).children().text('정지');
        }
    });

    $('.visual .prev').click(function () {
        visual.slick('slickPrev');
    });

    $('.visual .next').click(function () {
        visual.slick('slickNext');
    });

    // 210204 김영산 추가
    $('.more_port').on( 'click', function() {   
        if(portfolio.length == pfItem){
            alert('내용이 없습니다.');
            return false;
        }     
        for(var j = 0; j < 4;j++){
            var $items = $('<li class="item '+portfolio[pfItem][1]+'"><a href="'+ portfolio[pfItem][0] +'"><b>'+ portfolio[pfItem][1] +'</b><strong>'+ portfolio[pfItem][2] +' <span>'+ portfolio[pfItem][3] +'</span></strong><img src="'+ portfolio[pfItem][4] +'" alt="'+ portfolio[pfItem][5] +'"></a></li>');
            // append items to grid
            $('#gall').append($items).masonry( 'appended', $items );
            pfItem++;
        }
      });
    if($('.partners .slide').length > 0){
        $('.partners .slide').slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            centerPadding: '200px',
            centerMode:true,
            autoplay: true,
            pauseOnHover: true,
            infinite: true,
            autoplaySpeed: 2000,
            prevArrow: $('.partners .prev'),
            nextArrow: $('.partners .next'),
            responsive: [
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 5,
                    centerPadding: '80px',
                  }
                },
                {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 3,
                      centerPadding: '20px',
                    }
                  }    
            ]

        });
    }
    


}); //jQuery End

// 윈도우 로드시 동작
$(window).load(function () {
    // 210204 김영산 추가
    // 포트폴리오 플러그인 init
    if($('#gall').length > 0){
        $('#gall').masonry({
            itemSelector: '.item',
        });
    }
    if($('#gall2').length > 0){
        $('#gall2').multipleFilterMasonry({
            itemSelector: '.item',
            filtersGroupSelector: '.filters'
            });
    }
    $('#page_load').fadeOut(600);
});
