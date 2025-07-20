import clock, { type TickEvent } from 'clock';
import document from 'document';
import { preferences } from 'user-settings';
import type { ElementStyle, Image } from '../utils/IMAGES';
import { MONTH_SHORT_NAMES } from '../utils/MONTH_SHORT_NAMES';
import { zeroPad } from '../utils/zeroPad';

export class ClockInitializer {
  DateElement: TextElement;
  TimeElement: TextElement;

  constructor() {
    this.DateElement = document.getElementById('myDate') as TextElement;
    this.TimeElement = document.getElementById('myTime') as TextElement;

    // FIXME: これガチで必要か？？？
    this.initialize = this.initialize.bind(this);
    this.onTicked = this.onTicked.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.applyStyle = this.applyStyle.bind(this);
    this.applyStyleInternal = this.applyStyleInternal.bind(this);
  }

  initialize() {
    clock.granularity = 'minutes';

    clock.addEventListener('tick', this.onTicked);
  }

  onTicked(event: TickEvent) {
    const current = event.date;
    this.changeDate(current);
    this.changeTime(current);
  }

  private changeDate(current: Date) {
    const month = MONTH_SHORT_NAMES[current.getMonth()];
    const day = current.getDate();
    this.DateElement.text = `${month} ${day}`;
  }

  private changeTime(current: Date) {
    let hours: number | string = current.getHours();
    if (preferences.clockDisplay === '12h') {
      hours = hours % 12 || 12;
    } else {
      hours = zeroPad(hours);
    }
    const mins = zeroPad(current.getMinutes());
    this.TimeElement.text = `${hours}:${mins}`;
  }

  applyStyle(selectedImage: Image) {
    this.applyStyleInternal(this.DateElement, selectedImage.date);
    this.applyStyleInternal(this.TimeElement, selectedImage.time);
  }

  private applyStyleInternal(elem: TextElement, style: ElementStyle) {
    const SENSE2_DISPLAY_SIZE = 336;
    elem.style.fontSize = style.fontSize;
    elem.textAnchor = style.textAnchor;
    elem.x = style.x * SENSE2_DISPLAY_SIZE;
    elem.y = style.y * SENSE2_DISPLAY_SIZE;
  }
}
