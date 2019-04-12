function get_scroll_offsets(w){
  
  w = w || window;

  if (w.pageXOffset!==null) return {
    x:w.pageXOffset,
    y:w.pageYOffset,
  };

}

var dist = 0;

var moving = {
  prev: 0,
  velocity: 0
};


function carousel(e){

  var startDist = dist;
  var startTime = +new Date();
  
  var target = e.currentTarget;
  var parent = target.parentNode;

  // 現在ページがスクロールされているか
  // どのぐらいスクロールされているのか
  var scroll = get_scroll_offsets();

  var startX = e.clientX + scroll.x; // 画面の左端からのクリック位置を測定
  var origX = target.offsetLeft;
  var deltaX = startX - origX;

  console.log("ここからスタート",startDist);

  var origW = target.offsetWidth;
  var parentW = parent.offsetWidth;
  /**
   * 移動量の最低値
   */
  var deltaW = parentW - origW;


  document.addEventListener("mousemove",moveHandler,true);
  document.addEventListener("mouseup",upHandler,true);

  if(e.stopPropagation) e.stopPropagation();
  else e.returnValue = false;

  function moveHandler(e){
    
    var scroll = get_scroll_offsets();
    var x = dist + e.clientX + scroll.x -startX; // 画面左端からのマウス位置
    var taransform = "translate3D(" + x + "px,0,0)";


    target.style.transform = taransform;

    var prev = moving;
    var curr = x;

    var prev = moving.prev;
    var velocity = x - prev;


    moving.prev = x;
    moving.velocity = velocity;
 

    if(e.stopPropagation) e.stopPropagation();
    else e.returnValue=false;
  }

  function upHandler(e){
    if(!e) e=window.event;

    document.removeEventListener("mouseup",upHandler,true);
    document.removeEventListener("mousemove",moveHandler,true); 


    var scroll = get_scroll_offsets();
    dist = dist + e.clientX + scroll.x -startX; // 画面左端からのマウス位置
    console.log("最終的にこうなった",dist)

    console.log(moving);


    /**
     * deltaW <= dist <= 0
     */
    if(dist <= deltaW){
      var taransform = "translate3D(" + deltaW + "px,0,0)";
      target.style.transform = taransform;
      dist = deltaW;
    }else if(dist >= 0){
      var taransform = "translate3D(0,0,0)";
      target.style.transform = taransform;
      dist = 0;
    }

    /**
     * transition
     */
 
    // var plus = moving.velocity * 2;

    // if(startDist > dist){
   
    //   var transform = "translate3D(" + (dist - plus) + "px,0,0)";
      
    //   // target.style.transition = "transform 0.3s";
    //   target.style.transform = transform;
    
    //   dist = dist + plus;
    // }


    
    // このイベントをほかの場所で処理されないようにする
    if(e.stopPropagation) e.stopPropagation();
    else e.returnValue=false;
  }
  
}