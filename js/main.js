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