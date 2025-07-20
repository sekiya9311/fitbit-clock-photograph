import clock from 'clock';
import document from 'document';
import { preferences } from 'user-settings';
import { ElementStyle, IMAGES } from '../utils/IMAGES';
import { MONTH_SHORT_NAMES } from '../utils/MONTH_SHORT_NAMES';
import { zeroPad } from '../utils/zeroPad';

clock.granularity = 'minutes';

const img = document.getElementById('img') as ImageElement;
const myDate = document.getElementById('myDate') as TextElement;
const myTime = document.getElementById('myTime') as TextElement;

{
  let oldDate: Date | null = null;
  clock.addEventListener('tick', (ev) => {
    const current = ev.date;
    if (current !== oldDate) {
      oldDate = current;
      changeImage();
    }
    changeDate(current);
    changeTime(current);
  });
}

img.addEventListener('click', () => {
  changeImage();
});

function changeTime(current: Date) {
  let hours: number | string = current.getHours();
  if (preferences.clockDisplay === '12h') {
    hours = hours % 12 || 12;
  } else {
    hours = zeroPad(hours);
  }
  const mins = zeroPad(current.getMinutes());
  if (myTime) {
    myTime.text = `${hours}:${mins}`;
  }
}

function changeDate(current: Date) {
  const month = MONTH_SHORT_NAMES[current.getMonth()];
  const day = current.getDate();
  if (myDate) {
    myDate.text = `${month} ${day}`;
  }
}

let prevSelectedIndex: number | null = null;
function changeImage() {
  let curImgIdx: number = -1;
  if (prevSelectedIndex === null) {
    curImgIdx = Math.floor(IMAGES.length * Math.random());
  } else {
    curImgIdx = (prevSelectedIndex + 1) % IMAGES.length;
  }
  prevSelectedIndex = curImgIdx;
  const cur = IMAGES[curImgIdx];
  img.href = cur.href;

  applyStyle(myDate, cur.date);
  applyStyle(myTime, cur.time);
}

function applyStyle(elem: TextElement, style: ElementStyle) {
  const SENSE2_DISPLAY_SIZE = 336;
  elem.style.fontSize = style.fontSize;
  elem.textAnchor = style.textAnchor;
  elem.x = style.x * SENSE2_DISPLAY_SIZE;
  elem.y = style.y * SENSE2_DISPLAY_SIZE;
}
