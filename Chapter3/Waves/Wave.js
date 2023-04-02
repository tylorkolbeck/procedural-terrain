class Wave {
  amplitude = 0; // amount above and below the center
  period = 0; // amount of time for one cycle - or the width of the canvas
  phase = 0; // where in the wave phase 
  constructor(amplitude,period, phase) {
    this.amplitude = amplitude;
    this.period = period;
    this.phase = phase;
  }

  calculateY(x) {
    // y = sin(phase + TWO_PI * x / period) * amplitude
    // sine output is always between -1 and 1 so we need to multiply by the amplitude
    let y = sin(this.phase + TWO_PI * x / this.period) * this.amplitude;
    return y;
  }
}

