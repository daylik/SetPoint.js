/* SP (Really Use Style HTML) v.1 - from Russia with love.
Script created 07.03.2015
Copyright Meshaev Oleg 2015
vk.com/day_like

This script created a css @media classes!
GLOBAL vars SP and functions:
------------------------------
S.device = SP.GetDevice();
S.device_type = SP.GetDeviceType();
S.browser = SP.GetBrowser();
S.m_ratio = SP.Mratio(); 		//monitor aspect Ratio!

*/

(function($) {
    var respondend = true,
        ww = $(window).width(),
        wh = $(window).height(),
        sw = screen.width,
        sh = screen.height,
        wsize,
        hsize,
        dwsize,
        dhsize,
        swsize,
        shsize,
        aspect,
        aspect_is,
        w_num,
        S_or;
    var f = [];
    var S = {};
    window.S = S; //set S global
    S.ua = navigator.userAgent.toLowerCase(); //global user agent info to lower case for fast search;
    var S_ua = S.ua;

    var set = {
        head: 'html', // this tag or class or id to set a global CSS settings class
        body: 'body', //S framework id on html page, this make some settings at class name if this have Class .fluid - all page be in fluid mode!

        resize_delay: 10, //10ms
        respond_delay: 200,
        smart_resize: false,
        smart_resize_speed: 200, // 350ms resize delay

        //w_scroll: 0,

        w_step_on: true,
        w_step_class: 'w-xs w-xs w-sm w-md w-lg', //for bootstrap: w_step_class = 'w-xs w-xs w-sm w-md w-lg';  (count = min: 1, max: 99+)
        w_step_size: '478 768 992 1200 1980', //for bootstrap: w_step_size = '478 768 992 1200 1980'; (count = min: 1, max: 99+)
        // 0 > 478 = .w-xs | 478 > 768 = .w-xs | 768 > 992 = .w-sm | 992 > 1200 = .w-md | 1200 > 1980 = .w-lg 

        w_max_on: true,
        w_max_class: 'w-max478 w-max767 w-max992', //	'w-max478 w-max767 w-max992'; (count = min: 0, max: 99+)
        w_max_size: '478 767 992', // '478 767 992' = CSS: @media (max-width: 478), @media (max-width: 767) ...
        // width < 478 = [0 > 478] = .w-max478 | width < 767 = [0 > 767]= .w-max767

        w_min_on: true,
        w_min_class: 'w-min768 w-min992', // 'w-min768 w-min992'; (count =  min: 0, max: 99+)
        w_min_size: '768 992', // '768 992' = CSS: @media (min-width: 768), @media (min-width: 992) ...
        // width > 768 = .w-min768 | width > 992+ = .w-min768, .w-min992

        h_step_on: false, //if need to listen a browser height - $(window).height();
        h_step_class: 'h-min h-xs h-sm h-md h-max', //(count =  min: 0, max: 99+)
        h_step_size: '240 478 768 992 1200',

        S_Webmaster: false, //Webmaster info view or hide true/false; WARNING this param is low speed respond function!
        S_start_view: false, //Webmaster info view if page loaded or hide true/false;
        S_timers: false, //Timer function on/off;
        S_console_ie6: true,

        //css class names: .land, .port ...
        landscape: 'land',
        portriet: 'port',
        blackberry: 'blackberry',
        iemobile: 'winphone',
        firefox: 'ffox',
        windows: 'windows',
        macos: 'macos',
        px_: '_', // '_' = css class: px1_2 = pixel ratio 1.2 don't use a dot!
        ratio_prefix: 'r' // css class prefix for default screen ratio: 'ratio-' + value = 'ratio-16x9', 'ratio-4x3';
    };

    /* IE6 Concolse analog */
    if (typeof console == "undefined") {
        console = {};
        $(document).ready(function() {
            if (set.S_console_ie6) {
                $('body').prepend('<div class="setpoint-con_log">console.log:<br /><div class="con_log"></div></div>');
            }
            console.log = function(txt) {
                if (set.S_console_ie6) {
                    $('.setpoint-con_log .con_log').append('<p>' + txt + '</p>');
                }
                return;
            };
        });
    }
    /* console */
    var con_log = function(txt) {
        console.log(txt);
        return;
    };

    var SP = {
        instance: null,
        //proto: SP.prototype,
        //modules: [],
        GetBrowser: function() {
            if (S_ua.search(/chrome/) != -1) return 'chrome';
            if (S_ua.search(/webkit/) != -1) return 'webkit';
            if (S_ua.search(/opera/) != -1) return 'opera';
            if (S_ua.search(/ie 6/) != -1) return 'ie ie6 ie6-7 ie6-8';
            if (S_ua.search(/ie 7/) != -1) return 'ie ie7 ie6-7 ie6-8';
            if (S_ua.search(/ie 8/) != -1) return 'ie ie8 ie6-8';
            var IE = '\v' == 'v';
            if (IE) return 'ie ie6-8';
            if (S_ua.search(/msie/) != -1) return 'ie ie9plus';
            var FF2 = (function x() {})[-6] == 'x';
            if (FF2) return 'fox2';
            if (S_ua.search(/safari/) != -1) return 'safari';
            if (S_ua.search(/firefox/) != -1) return set.firefox;
            if (S_ua.search(/mozilla/) != -1) return set.firefox;
            //return 'N/A';
        },
        PixelRatio: function() {
            var ratio = 1;
            if (window.devicePixelRatio) {
                ratio = window.devicePixelRatio;
            } else {
                if (screen.deviceXDPI) {
                    ratio = screen.deviceXDPI / screen.logicalXDPI;
                }
            }
            ratio = ratio.toFixed(1);

            var px = ['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1.0', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9', '2.0', '2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8', '2.9', '3.0'];

            for (pi = 0; pi < px.length; pi++) {
                if (ratio == px[pi]) {
                    var px_is;
                    if (px[pi] == '1.0') {
                        px_is = '1';
                    } else if (px[pi] == '2.0') {
                        px_is = '2';
                    } else if (px[pi] == '3.0') {
                        px_is = '3';
                    } else {
                        px_is = px[pi];
                    }

                    px_is = px_is.replace('.', set.px_);
                    return 'px' + px_is;
                    break;
                }

            }

        },
        dpi: function() {
            if (screen.logicalXDPI) {
                return 'dpi' + screen.logicalXDPI;
            } else if (screen.deviceXDPI) {
                return 'dpi' + screen.deviceXDPI;
            } else {
                var dpi = [96, 105, 115, 120, 125, 135, 144, 154, 163, 173, 182, 192, 202, 211, 221, 230, 240, 250, 259, 267, 278, 288];
                for (di = 0; di < dpi.length; di++) {
                    if (window.matchMedia('screen and (min-resolution: ' + dpi[di] + 'dpi)').matches) {
                        return 'dpi' + dpi[di];
                        break;
                    }
                }
            }
        },
        GetDevice: function() {
            if (/android|applewebkit|webos|iphone|ipod|blackberry|bb10|rim|iemobile|mobile|phone|opera mini/i.test(S_ua)) {
                return 'mobile';
            } else if (/touch|ipad|tablet/i.test(S_ua)) {
                return 'tablet';
            } else if (/googletv|viera|smarttv|internet.tv|netcast|nettv|appletv|boxee|kylo|roku|dlnadoc|roku|pov_tv|hbbtv|ce-html/i.test(S_ua)) {
                return 'TV';
            } else {
                return 'desktop';
            }
        },
        GetDeviceType: function() {
            if (S_ua.search(/iphone/) != -1) return 'ios iphone';
            if (S_ua.search(/ipod/) != -1) return 'ios ipod';
            if (S_ua.search(/ipad/) != -1) return 'ios ipad';
            if (S_ua.search(/android/) != -1) return 'android';
            if (S_ua.search(/blackberry/) != -1) return set.blackberry;
            if (S_ua.search(/bb10/) != -1) return set.blackberry;
            if (S_ua.search(/iemobile/) != -1) return set.iemobile;
            if (S_ua.search(/windows/) != -1) return set.windows;
            if (S_ua.search(/mac os/) != -1) return set.macos;
            if (S_ua.search(/linux/) != -1) return 'linux';
            if (S_ua.search(/freebsd/) != -1) return 'freebsd';
            //return 'N/A';
        },
        Mratio: function() {
            //aspect ratio
            var S_ratio;
            ratio_prefix = set.ratio_prefix;
            swsize = screen.width;
            shsize = screen.height;
            aspect = swsize / shsize;
            aspect = aspect.toFixed(1);
            if (aspect == 1.2) {
                aspect_is = '5:4';
                S_ratio = ratio_prefix + '4x3';
            } else if (aspect == 1.3) {
                aspect_is = '4:3';
                S_ratio = ratio_prefix + '4x3';
            } else if (aspect == 1.5) {
                aspect_is = '3:2';
                S_ratio = ratio_prefix + '3x2';
            } else if (aspect == 1.6) {
                aspect_is = '8:5';
                S_ratio = ratio_prefix + '8x5';
            } else if (aspect == 1.7) {
                aspect_is = '16:9';
                S_ratio = ratio_prefix + '16x9';
            } else if (aspect == 1.8) {
                aspect_is = '16:9';
                S_ratio = ratio_prefix + '16x9';
            } else {
                aspect = aspect.replace('.', 'x');
                aspect_is = ratio_prefix + '' + aspect;
                S_ratio = aspect_is;
            }

            if (set.S_Webmaster) {
                $('.setpoint-info .sp-aspect').text(aspect_is + ' .' + S_ratio);
            }
            return S_ratio;
        },
        isIE: function(num) {
            var S_ua = navigator.userAgent.toLowerCase();
            if (num != '') {
                if (S_ua.indexOf('ie ' + ie) != -1) return true;
            } else {
                if (S_ua.indexOf('msie') != -1) return true;
            }
            return false;
        },
        log: function(txt) {
            console.log(txt);
            return;
        },
        SmartResize: function(func, speed) {

            f.push(func);
            var fun_speed = set.smart_resize_speed;
            if (speed) {
                fun_speed = speed;
            }

            $(window).bind('resize', function(e) {
                window.resizeEvt;
                $(window).resize(function() {
                    clearTimeout(window.resizeEvt);
                    window.resizeEvt = setTimeout(function() {

                        for (i = 0; i < f.length; i++) {
                            f[i]();
                        }

                    }, fun_speed);
                });
            });
        },
        SetPointActive: function(delay) {
            $(window).resize(function() {
                SetPoint();
            });

            $(window).bind('resize', function(e) {
                window.resizeSP;
                $(window).resize(function() {
                    clearTimeout(window.resizeSP);
                    window.resizeSP = setTimeout(function() {

                        SetPoint();

                    }, delay);
                });
            });
        },
        run: function(options) {
            if (options != "") {
                set = $.extend(set, options);
            }
            points_init(set);
        }
    };

    window.SP = SP; //set to global =)

    SP.ww = ww;



    var points_init = function(options) {

        if (!set.S_console_ie6) {
            $('.setpoint-con_log').remove();
        }

        set.scroll_width = getScrollBarWidth();
        if (!set.scroll_width > 0) {
            set.scroll_width = 0;
        }



        /* for Sespond */
        if (set.w_step_class != '') {
            var w_step = {};
            window.w_step = w_step; //w_step to global var

            w_step.clas = set.w_step_class.split(' ');
            w_step.size = set.w_step_size.split(' ');

            if (set.w_scroll > 0) {
                for (i = 0; i < w_step.size.length; i++) {
                    w_step.size[i] = w_step.size[i] - set.w_scroll;
                }
            }
            //con_log(w_step.clas+':'+w_step.clas.length+' - '+w_step.clas[0]);

            if (w_step.clas.length == w_step.size.length) {
                w_step.num = w_step.size.length;
            } else {
                alert('THIS PASAM: w_step_class != w_step_size');
            }
        }
        if (set.h_step_on && set.h_step_class != '') {
            var h_step = {};
            window.h_step = h_step; //h_step to global var

            h_step.clas = set.h_step_class.split(' ');
            h_step.size = set.h_step_size.split(' ');

            if (set.w_scroll > 0) {
                for (i = 0; i < h_step.size.length; i++) {
                    h_step.size[i] = h_step.size[i] - set.w_scroll;
                }
            }
            //con_log(h_step.clas+':'+h_step.clas.length+' - '+h_step.clas[0]);

            if (h_step.clas.length == h_step.size.length) {
                h_step.num = h_step.size.length;
            } else {
                alert('THIS PASAM: h_step_class != h_step_size');
            }
        }
        if (set.w_max_on && set.w_max_class != '') {
            var w_max = {};
            window.w_max = w_max; //w_max to global var

            w_max.clas = set.w_max_class.split(' ');
            w_max.size = set.w_max_size.split(' ');

            if (set.w_scroll > 0) {
                for (i = 0; i < w_max.size.length; i++) {
                    w_max.size[i] = w_max.size[i] - set.w_scroll;
                }
            }
            //con_log(w_max.clas+':'+w_max.clas.length+' - '+w_max.clas[0]);

            if (w_max.clas.length == w_max.size.length) {
                w_max.num = w_max.size.length;
            } else {
                alert('THIS PASAM: w_max_class != w_max_size');
            }
        }
        if (set.w_min_on && set.w_min_class != '') {
            var w_min = {};
            window.w_min = w_min; //w_min to global var

            w_min.clas = set.w_min_class.split(' ');
            w_min.size = set.w_min_size.split(' ');

            if (set.w_scroll > 0) {
                for (i = 0; i < w_min.size.length; i++) {
                    w_min.size[i] = w_min.size[i] - set.w_scroll;
                }
            }

            if (w_min.clas.length == w_min.size.length) {
                w_min.num = w_min.size.length;
            } else {
                alert('THIS PASAM: w_min_class != w_min_size');
            }
        }


        var S_timer = {};
        window.S_timer = S_timer;

        S_timer.start = function(id) {
            var S_date = {};
            window.S_date = S_date;
            S_date.id = id;
            S_date.a = new Date();
            S_date.a = S_date.a.getMilliseconds();
        }
        S_timer.finish = function(name) {
            S_date.b = new Date();
            S_date.b = S_date.b.getMilliseconds();
            S_date.sum = S_date.b - S_date.a;
            if (S_date.sum < 0) {
                S_date.sum = 0;
            }
            con_log('Timer: ' + name + ' = ' + S_date.sum + 'ms');
        }

        /* S WebMaster param */
        if (set.S_Webmaster) {

            $('body').prepend('<p class="setpoint-info setpoint-info-inline"><b>SP</b><b> by inline studio</b><b><i>screen:</i></b><b><span class="ww"></span> x <span class="wh"></span></b><b><span class="w-w"></span> | <span class="w-h"></span></b> | <b><span class="w-max"></span> | <span class="w-min"></span></b><b><span class="prop"><i>html:</i></b><b><span class="dw"></span> x <span class="dh"></span></span></b><b><span class="resolut"><i>resolution:</i></b><b><span class="sw"></span> x <span class="sh"></span></span></b><b><i>aspect ratio:</i></b><b><span class="sp-aspect"></span></b><b><i>px-ratio:</i><span class="sp-px"></span></b><b><span class="sp-dpi"></span></b><b><i>orientation:</i></b><b><span class="sp-or"></span></b><b><i>browser:</i></b><b><span class="sp-br"></span></b><b><span class="sp-d"></span></b><b><span class="sp-dt"></span></b><b><i>w-scroll:</i><span class="sp-scroll"></span></b><b class="sp-informer"></b></p>');
            var dw = $(document).width();
            var dh = $(document).height();
            $('.sp-scroll').text(set.scroll_width + 'px');

            if (!set.S_start_view) {
                $('.setpoint-info').hide();
            }
        }

        SP_active(set);
    };

    var SP_active = function(set) {

        //default set to start
        S.w_class_old = '1';
        S.w_max_old = '1';
        S.w_min_old = '1';

        if ($(set.body).is('.fluid')) {
            if (ww < w_step.size[0]) {
                wsize = w_step.clas[0];
            } else {
                wsize = 'fluid';
            }
            $(set.body).addClass(wsize);

            $(window).resize(function(e) {
                SP.ww = $(window).width();
                if (SP.ww < w_step.size[0]) {
                    wsize = w_step.clas[0];
                } else {
                    wsize = 'fluid';
                }
                $(set.body).removeClass().addClass(wsize);
            });

        } else {
            SetPoint(); //first start page respond

            if (set.smart_resize) {
                $(document).ready(function() {
                    SP.SmartResize(SetPoint);
                });
            } else {
                /* $(window).resize(function(e){
                	SetPoint();
                }); */
                SP.SetPointActive(set.resize_delay);
            }
        };


        if (set.S_Webmaster) {
            if (set.S_start_view) {
                SP.Mratio();
            } else {
                $('.setpoint-info').hide();
            }
        };

        S.Device = SP.GetDevice();
        S.DeviceType = SP.GetDeviceType();
        S.Browser = SP.GetBrowser();
        S.Mratio = SP.Mratio();
        S.PixelRatio = SP.PixelRatio();
        S.dpi = SP.dpi();

        if (set.S_Webmaster) {
            $('.setpoint-info .sp-br').text(S.Browser);
            $('.setpoint-info .sp-dt').text(S.DeviceType);
            $('.setpoint-info .sp-d').text(S.Device);
            $('.setpoint-info .sp-px').text(S.PixelRatio);
            $('.setpoint-info .sp-dpi').text(S.dpi);
        };

        $(set.head).addClass(S.Browser); //set browser class in the header tag
        $(set.head).addClass(S.Device); //set device class in the header tag
        $(set.head).addClass(S.DeviceType); //set device type class in the header tag
        $(set.head).addClass(S.Mratio); //set monitor aspect ratio class in the header tag
        $(set.head).addClass(S.PixelRatio); //set monitor pixel ratio
        $(set.head).addClass(S.dpi); //set monitor pixel ratio

        /* S WebMaster*/
        if (set.S_Webmaster) {
            /* press (Z) key to view borders */
            var keyZ = 0;
            var keyX = 0;
            $(window).keydown(function(e) {
                //alert(e.keyCode);
                /* Z view borders*/
                if (e.keyCode == 90) {
                    if (keyZ == 0) {
                        $('body').addClass('bordme');
                        keyZ = 1;
                    } else {
                        $('body').removeClass('bordme');
                        keyZ = 0
                    }
                }
                /* press (X) key view window width and height*/
                if (e.keyCode == 88) {
                    if (keyX == 0) {
                        $('.setpoint-info').show();
                        $('.setpoint-info .ww').text($(window).width());
                        $('.setpoint-info .wh').text($(window).height());
                        $('.setpoint-info .dw').text($(document).width());
                        $('.setpoint-info .dh').text($(document).height());
                        $('.setpoint-info .sw').text(screen.width);
                        $('.setpoint-info .sh').text(screen.height);
                        keyX = 1;
                        $(window).resize(function(e) {
                            S_respond();
                        });
                    } else {
                        $('.setpoint-info').hide();
                        keyX = 0
                    }
                }
            });
        };
        /* S WebMaster END*/
    };


    function getScrollBarWidth() {
        var inner = document.createElement('p');
        inner.style.width = "100%";
        inner.style.height = "200px";

        var outer = document.createElement('div');
        outer.style.position = "absolute";
        outer.style.top = "0px";
        outer.style.left = "0px";
        outer.style.visibility = "hidden";
        outer.style.width = "200px";
        outer.style.height = "150px";
        outer.style.overflow = "hidden";
        outer.appendChild(inner);

        document.body.appendChild(outer);
        var w1 = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        var w2 = inner.offsetWidth;
        if (w1 == w2) w2 = outer.clientWidth;

        document.body.removeChild(outer);

        return (w1 - w2);
    };

    var count = 0;

    var SetPoint = function(options) {
        if (respondend) {

            respondend = false;

            if (set.S_timers) {
                S_timer.start(1);
            }

            ww = $(window).width();
            wh = $(window).height();

            if (ww == 0) {
                ww = $(document).width();
                wh = $(document).height();
            }

            //aspect position
            S_or = wh / ww;
            if (S_or > 1) {
                if ($(set.head).hasClass(set.landscape)) {
                    $(set.head).removeClass(set.landscape).addClass(set.portriet);
                } else {
                    $(set.head).addClass(set.portriet);
                }
                if (set.S_Webmaster) {
                    $('.setpoint-info .sp-or').text(set.portriet);
                }

            } else {
                if ($(set.head).hasClass(set.portriet)) {
                    $(set.head).removeClass(set.portriet).addClass(set.landscape);
                } else {
                    $(set.head).addClass(set.landscape);
                }
                if (set.S_Webmaster) {
                    $('.setpoint-info .sp-or').text(set.landscape);
                }
            }



            if (set.w_step_on) {
                // compare browser size width at @media max-width and min-width
                if (ww < w_step.size[0]) {
                    wsize = w_step.clas[0];
                } else {
                    var ni
                    for (i = 0; i < w_step.num; i++) {
                        if (ww >= (w_step.size[i]) && ww <= (w_step.size[i + 1] - 1)) {
                            wsize = w_step.clas[i + 1];
                            break;
                        }
                    }
                }
                S.w = wsize;
            } else {
                wsize = '';
            }

            if (set.w_max_on) {
                if (w_max.num > 1) {
                    w_max_size = '';
                    for (m = 0; m < w_max.num; m++) {
                        if (w_max.size[m] >= ww) {
                            w_max_size += ' ' + w_max.clas[m];
                        }
                    }
                } else {
                    if (ww <= w_max.size[0]) {
                        w_max_size = w_max.clas[0];
                        /* w_max_size = '';
                        for(m = 0; m < w_max.num; m++){
                        		w_max_size += ' '+w_max.clas[m];
                        		break;
                        } */
                    }
                }
            } else {
                w_max_size = '';
            }

            //if set param @media min-width
            if (set.w_min_on) {
                if (w_min.num > 1) {
                    if (ww > w_min.size[0]) {
                        w_min_size = w_min.clas[0];
                        for (q = 0; q < w_min.num; q++) {
                            if (ww >= w_min.size[q + 1]) {
                                w_min_size += ' ' + w_min.clas[q + 1];
                                break;
                            }
                        }
                    } else {
                        w_min_size = '';
                    }
                } else {
                    if (ww >= w_min.size[0]) {
                        w_min_size = w_min.clas[0];
                    }
                }
            } else {
                w_min_size = '';
            }

            if (set.h_step_on) {

                // compare browser size height at @media height-width and height-width
                if (wh <= h_step.size[0]) {
                    hsize = h_step.clas[0];
                } else {
                    for (h = 0; h < h_step.num; h++) {
                        if (wh > h_step.size[h] && wh <= h_step.size[h + 1]) {
                            hsize = h_step.clas[h + 1];
                            break;
                        }
                    }
                }

                S.h = hsize;
                // if step @media size changed
                if (S.w_class_old == '1') {
                    $(set.body).addClass(wsize).addClass(hsize);
                    S.w_class_old = wsize;
                    S.h_class_old = hsize;

                } else {
                    if (S.w_class_old != wsize) {
                        $(set.body).removeClass(S.w_class_old).addClass(wsize);
                        S.w_class_old = wsize;
                    }
                    if (S.h_class_old != hsize) {
                        $(set.body).removeClass(S.h_class_old).addClass(hsize);
                        S.h_class_old = hsize;
                    }
                }
            } else {
                // if step @media size changed
                if (S.w_class_old == '1') {
                    $(set.body).addClass(wsize);
                    S.w_class_old = wsize;

                } else {
                    if (S.w_class_old != wsize) {
                        $(set.body).removeClass(S.w_class_old).addClass(wsize);
                        S.w_class_old = wsize;

                    }
                }
            }

            if (set.w_min_on) {
                if (S.w_min_old == '1') {
                    $(set.body).addClass(w_min_size);
                    S.w_min_old = w_min_size;
                } else {
                    if (S.w_min_old != w_min_size) {
                        $(set.body).removeClass(S.w_min_old).addClass(w_min_size);
                        S.w_min_old = w_min_size;
                    }
                }
            }

            if (set.w_max_on) {
                if (S.w_max_old == '1') {
                    $(set.body).addClass(w_max_size);
                    S.w_max_old = w_max_size;
                } else {
                    if (S.w_max_old != w_max_size) {
                        $(set.body).removeClass(S.w_max_old).addClass(w_max_size);
                        S.w_max_old = w_max_size;
                    }
                }
            }
            SP.ww = ww;

            /* S WebMaster param*/
            if (set.S_Webmaster) {
                dwsize = $(document).width();
                dhsize = $(document).height();
                $('.setpoint-info .w-w').text(wsize);
                $('.setpoint-info .w-h').text(hsize);
                $('.setpoint-info .ww').text(ww);

                $('.setpoint-info .wh').text(wh);
                $('.setpoint-info .dw').text(dwsize);
                $('.setpoint-info .dh').text(dhsize);
                $('.setpoint-info .sw').text(sw);
                $('.setpoint-info .sh').text(sh);
                $('.setpoint-info .w-max').text(w_max_size);
                $('.setpoint-info .w-min').text(w_min_size);
            }

            if (set.S_timers) {
                count++;
                S_timer.finish('#' + count + ' SetPoint()');
            }

            setTimeout(function() { respondend = true }, set.respond_delay);
        }
    };
    //SetPoint()
})(jQuery);
