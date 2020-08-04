define([], function() {
    return {
        init: function() {
            // console.log(123);
            // $('document').scrollTop(0);
            // console.log(123);
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
                init() {
                    // console.log(123);
                    $.ajax({
                        url: 'http://localhost/ugoshop/php/doem.php',
                        dataType: 'json'
                    }).done((data) => {
                        // console.log(data.arr1);
                        let arr = data.arr1;
                        let str = '<ul>';
                        $.each(arr, function(index, value) {
                            str += `
                            <li>
                    <a href="javascript:;">
                        <img src="${value.url}" alt="">
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
                    });
                    this.slideshow();
                }
                slideshow() {
                    let index = this.index;
                    this.lunli.on('click', function() {
                        index = $(this).index();
                        $('.article3 ul li').eq(index).addClass('active').siblings('li').removeClass('active');
                        $('.article3 a img').eq(index).show().siblings('img').hide();
                    })

                    this.show();
                    this.boxright.on('click', () => {
                        index++;
                        if (index > this.lunli.length - 1) {
                            index = 0;
                        }
                        $('.article3 ul li').eq(index).addClass('active').siblings('li').removeClass('active');
                        $('.article3 a img').eq(index).show().siblings('img').hide();
                    })
                    this.boxleft.on('click', () => {
                        index--;
                        if (index < 0) {
                            index = this.lunli.length - 1;
                        }
                        $('.article3 ul li').eq(index).addClass('active').siblings('li').removeClass('active');
                        $('.article3 a img').eq(index).show().siblings('img').hide();
                    })
                    let times = null;
                    times = setInterval(() => {
                        index++;
                        if (index > this.lunli.length - 1) {
                            index = 0;
                        }
                        $('.article3 ul li').eq(index).addClass('active').siblings('li').removeClass('active');
                        $('.article3 a img').eq(index).show().siblings('img').hide();
                    }, 2000);
                    this.boxlunbotu.hover(() => {
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
                show() {
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
                init() {
                    this.loutili.not('.back').on('click', function() {
                        $(this).css('backgroundColor', 'red').siblings('li').css('backgroundColor', '#918888');
                    });
                    this.backonclick();
                    this.loutishou();
                    this.louticolor();
                    this.loutipa();
                }
                backonclick() {
                    this.loutiback.on('click', function() {
                        $('html,body').animate({
                            scrollTop: 0
                        });
                    });
                }
                loutishou() {
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
                louticolor() {
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
                loutipa() {
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
                init() {
                    // if () {

                    // }
                    $(window).on('scroll', () => {
                        if ($(window).scrollTop() > 600) {
                            console.log(123);
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