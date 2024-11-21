(() => {
    console.log("IIFE Fired");
  
    //variables
    const hotspots = document.querySelectorAll(".Hotspot")
    console.log(hotspots);
    //console.log(hotspots);
  
    //functions
  
    function showInfo(e){
      console.log(e.currentTarget.slot);
      let selected = document.querySelector(`button[slot="${e.currentTarget.slot}"] > div`);
      //button[slot="hotspot-4" > div]
      gsap.to(selected, 1 , {autoAlpha: 1}) ;
  
      let name = "Joy"
      //old string syntax
      console.log("Hello my name is" + name);
  
      //es6 template literals
      console.log(`Hello my name is ${name}`)
    }
  
    function hideInfo(e){
      console.log("hideInfo called");
      let selected = document.querySelector(`button[slot="${e.currentTarget.slot}"] > div`);
      //button[slot="hotspot-4" > div]
      gsap.to(selected, 1 , {autoAlpha: 0}) ;
  
    }
  
   
    //event listeners
  
    hotspots.forEach(hotspot => {
      hotspot.addEventListener("mouseover", showInfo);
      hotspot.addEventListener("mouseout", hideInfo);
  
    });
  
  })();

  // Scrolling

  (() => {
    const canvas = document.querySelector("#hero-anima");
    const context = canvas.getContext("2d");
    canvas.width = 1920;
    canvas.height = 1080;

    const frameCount = 200;
    const images = [];
    const buds = { frame: 0 };
    let loadedImages = 0;

    // 預載入所有影像
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = `images/Qiaoyi_Earbuds${(i + 1).toString().padStart(4, '0')}.jpg`;
        images.push(img);

        img.onload = () => {
            loadedImages++;
            if (loadedImages === frameCount) {
                render(); // 所有影像載入完成後開始繪圖
            }
        };
    }

    // 使用 GSAP 控制滾動動畫
    gsap.to(buds, {
        frame: frameCount - 1,
        snap: "frame",
        scrollTrigger: {
            trigger: "#hero-anima",
            pin: true,
            scrub: 1,
            start: "top top",
            end: "bottom top",
            markers: false
        },
        onUpdate: render
    });

    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[buds.frame], 0, 0);
    }
})();

// Color
function changeEarbudColor(color) {
  const earbudImage = document.getElementById('hero-earbud-img');
  if (color === 'Ivory') {
    earbudImage.src = 'images/earbud_ivory.jpg';
    earbudImage.alt = 'Ivory Earbuds';
  } else if (color === 'Black') {
    earbudImage.src = 'images/earbud_black.jpg';
    earbudImage.alt = 'Black Earbuds';
  }
}

// 選取所有顏色按鈕
const colorButtons = document.querySelectorAll('.color-btn');

colorButtons.forEach(button => {
  button.addEventListener('click', () => {
    // 移除其他按鈕的選中狀態
    colorButtons.forEach(btn => btn.classList.remove('selected'));

    // 為當前按鈕添加選中狀態
    button.classList.add('selected');
  });
});

//X-RAY view

(() => {
  let imageCon = document.querySelector('#imageCon'),
      drag = document.querySelector('.image-drag'),
      left = document.querySelector('.image-left'),
      dragging = false,
      min = 0,
      max = imageCon.offsetWidth;


      function onDown(){
          dragging = true;
          console.log("set to true")
      }


      function onUp(){
          dragging = false;
          console.log("set to flase")
      }


      function onMove(event) {
         
          if(dragging===true){
                 
                  let x = event.clientX - imageCon.getBoundingClientRect().left;

                  if(x < min){
                      x = min;
                  }
                  else if(x >  max){
                      x = max-15;
                  }

                  drag.style.left = x + "px";
                  left.style.width = x + "px";
          }

      }

      drag.addEventListener('mousedown',onDown);
      document.body.addEventListener('mouseup',onUp);
      document.body.addEventListener('mousemove',onMove);
})();

//Menu

// 選取元素
const menuIcon = document.getElementById("menu");
const sidebar = document.getElementById("sidebar-menu");

menuIcon.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  
  // 切換 Menu Icon 旋轉效果
  const menuImage = menuIcon.querySelector("img");
  menuImage.classList.toggle("rotate");
});





