import { Howler } from 'howler';

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
let width: number;
let height: number;

function map(
  number: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

class Equalizer {
  private analyser?: AnalyserNode;
  private bufferLength?: number;
  private dataArray?: Uint8Array;

  private barCount = 128;

  public init() {
    console.log('eq init');
    canvas = document.querySelector('canvas.equalizer') as HTMLCanvasElement;
    context = canvas.getContext('2d') as CanvasRenderingContext2D;

    height = canvas.height;
    width = canvas.width;

    context.fillStyle = 'rgb(0,0,0)';
    context.fillRect(0, 0, width, height);
  }

  public start() {
    console.log('eq start');
    this.analyser = Howler.ctx.createAnalyser();
    Howler.masterGain.connect(this.analyser);
    this.analyser?.connect(Howler.ctx.destination);

    this.analyser.fftSize = this.barCount;
    this.analyser.smoothingTimeConstant = 0.9;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    this.draw();
  }

  public draw = () => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    if (this.dataArray) {
      this.analyser?.getByteFrequencyData(this.dataArray);

      const dataLength = this.dataArray.length - 20;

      const barSize = Math.round(width / dataLength);

      for (let i = 0; i < dataLength; i++) {
        const amplitude = map(this.dataArray[i], 0, 256, 0, height);

        context.fillStyle = '#ff2134';
        context.fillRect(i * barSize, height - amplitude, barSize, 200);
      }
    }
    requestAnimationFrame(this.draw);
  };
}

export default new Equalizer();
