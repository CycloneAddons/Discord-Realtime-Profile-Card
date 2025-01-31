class BaseEffect {
    constructor({ src, start, duration, loop, loopDelay, zIndex, position, width, height }) {
      this.src = src;
      this.originalStart = start;
      this.start = start + 100;
      this.duration = duration;
      this.loop = loop;
      this.loopDelay = loopDelay || 0;
      this.zIndex = zIndex;
      this.position = position;
      this.width = width;
      this.height = height;
      this.startTime = null;
      this.isVisible = false;
      this.offsetTime = 10000;

    }
  
    update(now) {
      if (this.startTime === null) {
        if (10000 >= this.originalStart + this.offsetTime) {
          this.start = this.originalStart;
        }
        
        if (now >= this.start) {
          this.startTime = now;
          this.isVisible = true;
        } else {
          this.isVisible = false;
        }
      }
    }
  }
  
  class LoopEffect extends BaseEffect {
    update(now) {
      super.update(now);
      if (this.startTime !== null) {
        const elapsed = now - this.startTime;
        const loopDuration = this.duration + this.loopDelay;
  
        if (elapsed >= loopDuration) {
          this.startTime = now; 
        }
  
        this.isVisible = elapsed <= this.duration;
      }
    }
  }
  
  class NormalEffect extends BaseEffect {
    update(now) {
      super.update(now);
      if (this.startTime !== null) {
        const elapsed = now - this.startTime;
        this.isVisible = elapsed <= this.duration;
      }
    }
  }
  
  export { BaseEffect, LoopEffect, NormalEffect };
  