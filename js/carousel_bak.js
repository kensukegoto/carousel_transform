
var $target_wrap = $("#target-wrapper");
var $target = $("#target");

$(function () {

  var flick_flg = true;
  var spd = 400; // フリックスピード
  var distance = 0; // 移動距離を指定
  var index = 1;

  var slide = {

    // スライド（進む）
    next: function(index,spd,flick_flg){
      distance = distance + index;
      slide.scroll(distance, spd, flick_flg);
    },
    // スライド（戻る）
    prev: function(index,spd,flick_flg){
      distance = distance - index;
      slide.scroll(distance, spd, flick_flg);
    },
    // 上端での跳ね返り
    topNext: function(index,spd,flick_flg){
      distance = distance + index;
      slide.scroll(distance, spd, flick_flg);
    },
    // 下端での跳ね返り
    bottomPrev: function(index, spd, flick_flg){
      distance = distance - index;
      slide.scroll(distance, spd, flick_flg);
    },
    // 移動距離分スクロール
    scroll: function(d,spd,flick_flg){

      var move = -d;
      var env = "translate3d(0," + move +"px,0)";

      if(flick_flg){
        transit_property = "-webkit-transform " + spd + "ms cubic-bezier(0,0,0.25,1)";
      }else{
        transit_property = "none";
      }

      $target.css({
        "-webkit-transform": env,
        "-webkit-transition": transit_property
      }).on("webkitTransitionEnd",function(){
        // ここで移動後の終了イベントが取れる
      });

    } // scroll

  } // slide

  $(window).load(function(){

    var pageY; // リアルタイムのY座標
    var startPageY; // スタート時のY座標
    var startTime; // スタート時の時間
    var move_time = 0; // ドラッグしてた時間

    $target_wrap.on("touchstart",function(e){
      event.preventDefault(); // Aタグなどの反応を止める
      pageY = event.changedTouches[0].pageY;
      startPageY = pageY;
      startTime = +new Date();
    });

    $target_wrap.on("touchmove",function(e){

      var moveY = event.changedTouches[0].pageY;
      var absY = Math.abs(pageY - moveY); // 移動距離の絶対値

      myTop = $target.position().top;
      myTop_abs = Math.abs(myTop);
      target_height = $target.height();
      window_height = $(window).height();
      myScroll_abs = Math.abs(target_height - window_height);

      // スワイプ処理
      if(pageY > moveY && myTop_abs < myScroll_abs){
        slide.next(absY * 0.9);
      }
      else if (pageY < moveY && myTop < 0){
        slide.prev(absY * 0.9);
      }
      else if (pageY < moveY && myTop >= 0){
        slide.bottomPrev(absY * 0.33);
      }
      else if (pageY > moveY && myTop_abs > myScroll_abs){
        slide.topNext(absY * 0.5);
      }

      pageY = moveY;

    });

    $target_wrap.on("touchend",function(e){
      move_time = 0;
    });

  });




})