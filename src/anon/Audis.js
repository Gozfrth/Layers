import p5 from "p5";

const Audis = () => {
    var song;
    var sliderRate;
    var sliderPan;
    var fft;

    var w;

    var jumpButton;
    var playButton;

    const sketch = (p) => {
        p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight-100);
            p.colorMode(p.HSB);
            sliderRate = p.createSlider(0, 3, 1, 0.01);
            sliderPan = p.createSlider(-1, 1, 0, 0.01);

            fft = p5.FFT(0.9,64);
            w = p.width/64;
        }
        
        p.preload = () => {
            song = p.loadSound('weightm.mp3', p.loaded);
        }

        p.draw = () => {
            song.rate(sliderRate.value());
            song.pan(sliderPan.value());
            p.background(20);

            var spectrum = fft.analyze();

            p.noStroke();

            for (var i = 0; i < spectrum.length; i++) {
                var amp = spectrum[i];
                var y = p.map(amp, 0, 256, p.height, 0);
                p.fill(i*3, 255, 255);
                p.rect(i*w, y, w/2, p.height-y);
            }
        }

        p.jumpSong = () => {
            var len = song.duration();
            song.jump(p.random(len));
        }

        p.togglePlaying = () => {
            if(!song.isPlaying()) {
                song.play();
                song.setVolume(1);
                jumpButton.html('pause');
            } else {
                song.pause();
                jumpButton.html('play');
            }
        }

        p.loaded = () => {
            console.log('loaded');
            playButton = p.createButton('Play');
            playButton.mousePressed(p.togglePlaying);
            jumpButton = p.createButton('jump');
            jumpButton.mousePressed(p.jumpSong);
        }
    }

    new p5(sketch)
    return <div></div>
}


export default Audis;