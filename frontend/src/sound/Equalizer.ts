import { Howl, Howler } from 'howler';

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

// function map(
//   number: number,
//   inMin: number,
//   inMax: number,
//   outMin: number,
//   outMax: number
// ) {
//   return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
// }

class Equalizer {
  private song?: Howl;
  private analyser?: AnalyserNode;
  private bufferLength?: number;
  private dataArray?: Uint8Array;

  private barCount = 256;

  public init() {
    console.log('eq init');
    canvas = document.querySelector('canvas.equalizer') as HTMLCanvasElement;
    context = canvas.getContext('2d') as CanvasRenderingContext2D;

    console.log(canvas);

    context.fillStyle = 'rgb(0,0,0)';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  public start(song: Howl) {
    console.log('eq start');
    this.song = song;
    this.analyser = Howler.ctx.createAnalyser();
    Howler.masterGain.connect(this.analyser);
    this.analyser?.connect(Howler.ctx.destination);

    this.analyser.fftSize = this.barCount;
    // this.analyser.smoothingTimeConstant = 1;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    this.draw();
  }

  public draw = () => {
    const drawVisual = requestAnimationFrame(this.draw);
    // console.log('draw');
    context.fillStyle = 'rgb(0,0,0)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (this.dataArray) {
      this.analyser?.getByteFrequencyData(this.dataArray);
      // console.log(this.dataArray.length);

      // const canvasWidth = canvas.width;

      const y = 10;
      console.log(this.dataArray);

      for (let i = 0; i < this.dataArray.length; i++) {
        // const amplitude = this.dataArray[i];
        const magnitude = this.dataArray[i];
        context.fillStyle = 'white';
        context.fillRect(
          i * 1.5,
          canvas.height - this.dataArray[i],
          1,
          canvas.height
        );
        // context.fillRect(i * 1.5, y, 10, amplitude);
      }
    }
  };
}

export default new Equalizer();
