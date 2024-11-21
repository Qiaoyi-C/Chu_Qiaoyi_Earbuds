(() => {
  console.log("IIFE Fired");

  // === Hotspot Interaction ===
  const hotspots = document.querySelectorAll(".Hotspot");

  function showInfo(e) {
    const selected = document.querySelector(`button[slot="${e.currentTarget.slot}"] > div`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo(e) {
    const selected = document.querySelector(`button[slot="${e.currentTarget.slot}"] > div`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  hotspots.forEach(hotspot => {
    hotspot.addEventListener("mouseover", showInfo);
    hotspot.addEventListener("mouseout", hideInfo);
  });

  // === Scrolling Animation ===
  (() => {
    const canvas = document.querySelector("#hero-anima");
    const context = canvas.getContext("2d");
    const frameCount = 200;
    const images = [];
    const buds = { frame: 0 };
    let loadedImages = 0;

    canvas.width = 1920;
    canvas.height = 1080;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `images/Qiaoyi_Earbuds${(i + 1).toString().padStart(4, '0')}.jpg`;
      images.push(img);

      img.onload = () => {
        loadedImages++;
        if (loadedImages === frameCount) render();
      };
    }

    gsap.to(buds, {
      frame: frameCount - 1,
      snap: "frame",
      scrollTrigger: {
        trigger: "#hero-anima",
        pin: true,
        scrub: 1,
        start: "top top",
        end: "bottom top",
      },
      onUpdate: render,
    });

    function render() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(images[buds.frame], 0, 0);
    }
  })();

  // === Color Change Logic ===
  function changeEarbudColor(color) {
    const earbudImage = document.getElementById("hero-earbud-img");
    const colorMapping = {
      Ivory: "images/earbud_ivory.jpg",
      Black: "images/earbud_black.jpg",
    };

    earbudImage.src = colorMapping[color];
    earbudImage.alt = `${color} Earbuds`;
  }

  document.querySelectorAll(".color-btn").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".color-btn").forEach(btn => btn.classList.remove("selected"));
      button.classList.add("selected");
    });
  });

  // === X-RAY View Interaction ===
  (() => {
    const imageCon = document.querySelector("#imageCon");
    const drag = document.querySelector(".image-drag");
    const left = document.querySelector(".image-left");
    const min = 0;
    const max = imageCon.offsetWidth;
    let dragging = false;

    drag.addEventListener("mousedown", () => (dragging = true));
    document.body.addEventListener("mouseup", () => (dragging = false));

    document.body.addEventListener("mousemove", event => {
      if (dragging) {
        let x = event.clientX - imageCon.getBoundingClientRect().left;
        x = Math.max(min, Math.min(max - 15, x));
        drag.style.left = `${x}px`;
        left.style.width = `${x}px`;
      }
    });
  })();

  // === Sidebar Menu ===
  (() => {
    const menuIcon = document.getElementById("menu");
    const sidebar = document.getElementById("sidebar-menu");

    menuIcon.addEventListener("click", () => {
      sidebar.classList.toggle("active");
      menuIcon.querySelector("img").classList.toggle("rotate");
    });
  })();

  // === Card Animation ===
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll(".feature-card").forEach((card, index) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  // === Left & Right Card Slide-in ===
  const leftCard = document.querySelector(".image-box");
  const rightCard = document.querySelector(".text-box");

  gsap.fromTo(
    leftCard,
    { x: -100, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: leftCard,
        start: "top 80%",
      },
    }
  );

  gsap.fromTo(
    rightCard,
    { x: 100, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      delay: 0.7,
      scrollTrigger: {
        trigger: rightCard,
        start: "top 80%",
      },
    }
  );
})();
