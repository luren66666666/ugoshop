define([], function() {
    return {
        init: function() {
            // console.log(123);
            // $('document').scrollTop(0);
            // console.log(123);
            class First {
                constructor() {
                    this.a = $('.ul1 .navcat a');
                    this.box2 = $('.article2 .box1 .ul1 .box2');
                    this.input1 = $('.article1 .box1 form .input1');
                    this.li = $('nav .nav0 .top-nav-tool .yg-card');
                    this.quit = $('.nav0 .quit');
                    this.tuichu = $('.nav0 .quit .quit_a');
                    this.quit_span = $('.nav0 .quit .quit_span');
                }
                init() {
                    this.tuichu.on('click', () => { //退出登录
                        // console.log(123);
                        $.cookie('phone', 'delete', { expires: -1, path: '/' });
                        window.location.href = 'http://10.31.163.32/ugoshop/src/homepage.html';
                    });
                    if ($.cookie('phone')) { //判断用户是否登录，
                        this.quit_span.html($.cookie('phone') + '!欢迎您');
                        this.li.eq(0).hide();
                        this.li.eq(1).hide();
                        this.quit.show();
                    } else {
                        this.li.eq(0).show();
                        this.li.eq(1).show();
                        this.quit.hide();
                    };

                    this.a.hover(() => {
                        this.box2.show();
                    }, () => {
                        this.box2.hide();
                    });
                    this.box2.on('mousemove', function() {
                        $(this).show();
                    });
                    this.box2.on('mouseout', function() {
                        $(this).hide();
                    });
                    this.input1.on('focus', () => {
                        // console.log(123);
                        this.input1.attr('placeholder', '')
                    });
                    this.input1.on('blur', () => {
                        if (this.input1.val() === '') {
                            // console.log();
                            this.input1.attr('placeholder', '请输入商品名称或货号');
                        }
                    });
                }
            }
            new First().init();
            class Homepage {
                constructor() {
                    this.boxfooter = $('.section .boxfooter');
                    this.lunul = $('.article3 ul');
                    this.lunli = $('.article3 ul li');
                    this.lunimg = $('.article3 a img');
                    this.boxleft = $('.boxleft');
                    this.boxright = $('.boxright');
                    this.luna = $('.article3 a');
                    this.boxlunbotu = $('.article3 .boxlunbotu');
                    this.index = 0;
                }

                init() { //渲染
                    // console.log(123);
                    $.ajax({
                        url: 'http://10.31.163.32/ugoshop/php/doem.php',
                        dataType: 'json'
                    }).done((data) => {
                        // console.log(data.arr1);
                        let arr = data.arr1;
                        let str = '<ul>';
                        $.each(arr, function(index, value) {
                            str += `
                            <li>
                    <a href="javascript:;">
                    <img  data-original="${value.url}" class="lazy" width="200" height="200"/>
                        <p class="p1">${value.title}</p>
                        <p class="p2">${value.keyword}</p>
                        <div>
                            <span class="span1">
                                ￥${value.nowprice}
                            </span>
                            <span class="span2">
                                <i>￥</i>${value.originalprice}
                            </span>
                            <span class="span3">
                                <i>${value.sailnumber}</i>人已购买
                            </span>
                        </div>
                    </a>
                </li>
                            `;
                        });
                        str += '</ul>';
                        this.boxfooter.html(str);
                        $(function() {
                            $("img.lazy").lazyload({ effect: "fadeIn" });
                        });
                    });
                    this.slideshow();
                }
                slideshow() {
                    let index = this.index;
                    this.lunli.on('click', function() { //点击小圆圈
                        index = $(this).index();
                        $('.article3 ul li').eq(index).addClass('active').siblings('li').removeClass('active');
                        $('.article3 a img').eq(index).show().siblings('img').hide();
                    })

                    this.show();
                    this.boxright.on('click', () => { //点击右箭头
                        index++;
                        if (index > this.lunli.length - 1) {
                            index = 0;
                        }
                        $('.article3 ul li').eq(index).addClass('active').siblings('li').removeClass('active');
                        $('.article3 a img').eq(index).show().siblings('img').hide();
                    })
                    this.boxleft.on('click', () => { //点击左箭头
                        index--;
                        if (index < 0) {
                            index = this.lunli.length - 1;
                        }
                        $('.article3 ul li').eq(index).addClass('active').siblings('li').removeClass('active');
                        $('.article3 a img').eq(index).show().siblings('img').hide();
                    })
                    let times = null;
                    times = setInterval(() => { //图片轮播，每过2秒点击下右箭头
                        index++;
                        if (index > this.lunli.length - 1) {
                            index = 0;
                        }
                        $('.article3 ul li').eq(index).addClass('active').siblings('li').removeClass('active');
                        $('.article3 a img').eq(index).show().siblings('img').hide();
                    }, 2000);
                    this.boxlunbotu.hover(() => { //移入清除定时器，移出添加定时器
                        clearInterval(times);
                    }, () => {
                        times = setInterval(() => {
                            // console.log(index);
                            index++;
                            if (index > this.lunli.length - 1) {
                                index = 0;
                            }
                            $('.article3 ul li').eq(index).addClass('active').siblings('li').removeClass('active');
                            $('.article3 a img').eq(index).show().siblings('img').hide();
                        }, 2000);
                    });
                }
                show() { //移入箭头显示，移入箭头变白
                    // console.log(123);         
                    this.boxlunbotu.hover(() => {
                        this.boxleft.show();
                        this.boxright.show();
                    }, () => {
                        this.boxleft.hide();
                        this.boxright.hide();
                    });
                    this.boxleft.hover(function() {
                        // console.log(123);
                        $(this).css('opacity', 1);
                    }, function() {
                        $(this).css('opacity', 0.7);
                    });
                    this.boxright.hover(function() {
                        // console.log(123);
                        $(this).css('opacity', 1);
                    }, function() {
                        $(this).css('opacity', 0.7);
                    });
                }
            }
            new Homepage().init();

            class Louti {
                constructor() {
                    this.loutili = $('aside ul li');
                    this.loutiback = $('aside ul .back');
                    this.loutiaside = $('aside');
                    this.boxtop = $('section .boxtop');
                    this.boxcenter = $('section .boxcenter');
                    this.boxbottom = $('section .boxbottom');
                }
                init() { //点击变色
                    this.loutili.not('.back').on('click', function() {
                        $(this).css('backgroundColor', 'red').siblings('li').css('backgroundColor', '#918888');
                    });
                    this.backonclick();
                    this.loutishou();
                    this.louticolor();
                    this.loutipa();
                }
                backonclick() { //回到顶部
                    this.loutiback.on('click', function() {
                        $('html,body').animate({
                            scrollTop: 0
                        });
                    });
                }
                loutishou() { //滚动到某个位置，楼梯显示
                    if ($(window).scrollTop() > 200) {
                        // console.log(123);
                        this.loutiaside.show();
                    } else {
                        this.loutiaside.hide();
                    }
                    // console.log(456);
                    $(window).on('scroll', () => {
                        if ($(window).scrollTop() > 200) {
                            // console.log(123);
                            this.loutiaside.show();
                        } else {
                            this.loutiaside.hide();
                        }
                    })
                }
                louticolor() { //楼梯颜色跟随界面内容改变
                    if (this.boxtop.offset().top >= $(window).scrollTop()) {
                        this.loutili.not('.back').css('backgroundColor', '#918888');
                        $('aside .liboxtop').css('backgroundColor', 'red');
                    } else if (this.boxcenter.offset().top >= $(window).scrollTop()) {
                        this.loutili.not('.back').css('backgroundColor', '#918888');
                        $('aside .liboxcenter').css('backgroundColor', 'red');
                    } else {
                        this.loutili.not('.back').css('backgroundColor', '#918888');
                        $('aside .liboxbottom').css('backgroundColor', 'red');
                    }
                    $(window).on('scroll', () => {
                        if (this.boxtop.offset().top >= $(window).scrollTop()) {
                            this.loutili.not('.back').css('backgroundColor', '#918888');
                            $('aside .liboxtop').css('backgroundColor', 'red');
                        } else if (this.boxcenter.offset().top >= $(window).scrollTop()) {
                            this.loutili.not('.back').css('backgroundColor', '#918888');
                            $('aside .liboxcenter').css('backgroundColor', 'red');
                        } else {
                            this.loutili.not('.back').css('backgroundColor', '#918888');
                            $('aside .liboxbottom').css('backgroundColor', 'red');
                        }
                    })
                }
                loutipa() { //点击楼梯，跳转到对应位置
                    $('aside ul .liboxtop').on('click', () => {
                        let top = this.boxtop.offset().top;
                        $('html,body').stop(true).animate({
                            scrollTop: top
                        });
                    });
                    $('aside ul .liboxcenter').on('click', () => {
                        let top = this.boxcenter.offset().top;
                        $('html,body').stop(true).animate({
                            scrollTop: top
                        });
                    });
                    $('aside ul .liboxbottom').on('click', () => {
                        let top = this.boxbottom.offset().top;
                        $('html,body').stop(true).animate({
                            scrollTop: top
                        });
                    });
                }
            }
            new Louti().init();
            class Suspension {
                constructor() {
                    this.article0 = $('#article0');
                }
                init() { //顶部悬浮
                    $(window).on('scroll', () => {
                        if ($(window).scrollTop() > 600) {
                            // console.log(123);
                            this.article0.stop(true).animate({
                                top: 0
                            })
                        } else {
                            this.article0.stop(true).animate({
                                top: -95
                            })
                        }
                    })
                }
            }
            new Suspension().init();
        }
    }
});