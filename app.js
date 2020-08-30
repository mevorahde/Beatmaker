class Drumkit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.currentKick = "./sound/kick-classic.wav";
    this.currentSnare = "./sound/snare-acoustic01.wav";
    this.currentHihat = "./sound/hihat-acoustic01.wav";
    this.currentOpenhat = "./sounds/openhat-acoustic01.wav";
    this.currentClap = "./sounds/clap-808.wav";
    this.kickAduio = document.querySelector(".kick-sound");
    this.snareAduio = document.querySelector(".snare-sound");
    this.hihatAduio = document.querySelector(".hihat-sound");
    this.openhatAduio = document.querySelector(".openhat-sound");
    this.clapAduio = document.querySelector(".clap-sound");
    this.index = 0;
    this.bmp = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
  }

  activePad() {
    this.classList.toggle("active");
  }

  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    //Loop over the pads
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      //Check if pads are active
      if (bar.classList.contains("active")) {
        //Check each sound
        if (bar.classList.contains("kick-pad")) {
          this.kickAduio.currentTime = 0;
          this.kickAduio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAduio.currentTime = 0;
          this.snareAduio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAduio.currentTime = 0;
          this.hihatAduio.play();
        }
        if (bar.classList.contains("clap-pad")) {
          this.clapAduio.currentTime = 0;
          this.clapAduio.play();
        }
        if (bar.classList.contains("openhat-pad")) {
          this.openhatAduio.currentTime = 0;
          this.openhatAduio.play();
        }
      }
    });
    this.index++;
  }

  start() {
    console.log(this);
    const interval = (60 / this.bmp) * 1000;
    //Check if it's playing
    if (this.isPlaying) {
      //Clear the interval
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }
  updateBtn() {
    if (this.isPlaying) {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    } else {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    }
  }
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickAduio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAduio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAduio.src = selectionValue;
        break;
      case "openhat-select":
        this.openhatAduio.src = selectionValue;
        break;
      case "clap-select":
        this.clapAduio.src = selectionValue;
        break;
    }
  }
  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAduio.volume = 0;
          break;
        case "1":
          this.snareAduio.volume = 0;
          break;
        case "2":
          this.hihatAduio.volume = 0;
          break;
        case "3":
          this.openhatAduio.volume = 0;
          break;
        case "4":
          this.clapAduio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAduio.volume = 1;
          break;
        case "1":
          this.snareAduio.volume = 1;
          break;
        case "2":
          this.hihatAduio.volume = 1;
          break;
        case "3":
          this.openhatAduio.volume = 1;
          break;
        case "4":
          this.clapAduio.volume = 1;
          break;
      }
    }
  }
  changeTempo(e) {
    const tempoText = document.querySelector(".tempo-nr");
    this.bmp = e.target.value;
    tempoText.innerText = e.target.value;
  }
  updateTempo() {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
}

const drumKit = new Drumkit();

////////////////////////////////
//Event Listeners
///////////////////////////////

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", function () {
  drumKit.updateBtn();
  drumKit.start();
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});

drumKit.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumKit.mute(e);
  });
});

drumKit.tempoSlider.addEventListener("input", function (e) {
  drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener("change", function (e) {
  drumKit.updateTempo(e);
});
