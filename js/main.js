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

//Card
// 初始化 ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 選取所有卡片
const cards = document.querySelectorAll('.feature-card');

// 設置動畫
cards.forEach((card, index) => {
  gsap.fromTo(
    card,
    { opacity: 0, y: -50 }, // 起始狀態：透明且向上偏移
    { 
      opacity: 1, 
      y: 0, // 結束狀態：完全顯示並歸位
      duration: 0.8, // 每個動畫的持續時間
      delay: index * 0.2, // 每張卡片依次延遲
      ease: "power3.out", // 平滑的動畫效果
      scrollTrigger: {
        trigger: card, // 每張卡片作為觸發點
        start: "top 80%", // 滾動到卡片進入視口 80% 時觸發
        end: "top 30%", // 滾動到視口 30% 時結束
        toggleActions: "play none none none" // 當觸發時播放動畫
      }
    }
  );
});


const hotspots = document.querySelectorAll('.hotspot');
hotspots.forEach(hotspot => {
  hotspot.addEventListener('click', () => {
    hotspot.classList.add('active');
    setTimeout(() => {
      hotspot.classList.remove('active');
    },); // 0.5 秒後移除動畫
  });
});

// 確保 GSAP 和 ScrollTrigger 已加載
gsap.registerPlugin(ScrollTrigger);

const leftCard = document.querySelector('.image-box');
const rightCard = document.querySelector('.text-box');

// 左邊卡片從左滑入
gsap.fromTo(
  leftCard,
  { x: -100, opacity: 0 }, // 起始狀態：向左偏移 100px，透明
  {
    x: 0, // 回到原位
    opacity: 1, // 顯示
    duration: 1, // 持續時間
    ease: "power2.out", // 平滑效果
    scrollTrigger: {
      trigger: leftCard, // 觸發點
      start: "top 80%", // 當左邊卡片進入視口時觸發
    },
  }
);

// 右邊卡片從右滑入
gsap.fromTo(
  rightCard,
  { x: 100, opacity: 0 }, // 起始狀態：向右偏移 100px，透明
  {
    x: 0, // 回到原位
    opacity: 1, // 顯示
    duration: 1, // 持續時間
    ease: "power2.out", // 平滑效果
    delay: 0.7, // 延遲 
    scrollTrigger: {
      trigger: rightCard, // 觸發點
      start: "top 80%", // 當右邊卡片進入視口時觸發
    },
  }
);





