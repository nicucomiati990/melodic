let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

class Equalizer {
  public init() {
    console.log('init');
    canvas = document.querySelector('canvas.equalizer') as HTMLCanvasElement;
    context = canvas.getContext('2D') as CanvasRenderingContext2D;

    console.log(canvas);

    context.fillStyle = 'rgb(0,0,0)';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  public draw() {
    console.log('draw');
  }
}

export default new Equalizer();
