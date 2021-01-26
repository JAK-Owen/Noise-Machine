let noiseBox;
let playButton, stopButton, chooseNoise, setVolume, toggleOnOff;
let fft;

function setup() {
  createCanvas(400, 200);
  noiseBox = new p5.Noise();
  noiseBox.amp(0);

  fft = new p5.FFT();

  toggleOnOff = createButton('play');
  toggleOnOff.position(10, 10).style('font-family', 'courier');
  toggleOnOff.mousePressed(function() {
    if (noiseBox.started) {
      noiseBox.stop();
      toggleOnOff.html('play');
    } else {
      noiseBox.start();
      toggleOnOff.html('stop');
    }
  });

  chooseNoise = createSelect();
  chooseNoise.position(60, 10).style('font-family', 'courier');
  chooseNoise.option('white');
  chooseNoise.option('pink');
  chooseNoise.option('brown');
  chooseNoise.changed(function() {
    noiseBox.setType(chooseNoise.value());
    fill(chooseNoise.value());
  });

  setVolume = createSlider(-60, 0, -60, 1);
  setVolume.position(130, 10);
  setVolume.input(function() {
    if (setVolume.value() > -56) {
    //amplitude = 10^(decibels/20)
    //pow(base, exponent);
    //pow(10, setVolume.value()/20);
    noiseBox.amp(pow(10, setVolume.value()/20), 0.01);
    } else {
      noiseBox.amp(map(setVolume.value(), -60, -56, 0, 0.0016), 0.1);
}
  });

  fill('white');
  noStroke();
}

function draw() {
  background(80);
  let spectrum = fft.analyze();
  beginShape();
  vertex(0, height);
  for (let i = 0; i < spectrum.length; i++) {
    vertex(map(log(i), 0, log(spectrum.length), 0, width), map(spectrum[i], 0, 255, height, 0))
  }
  vertex(width, height);
  endShape(); 

}

function touchStarted() {
  if (getAudioContext().state !== 'running') {
getAudioContext().resume();
}
}