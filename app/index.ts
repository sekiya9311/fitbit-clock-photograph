import clock from 'clock';
import document from 'document';
import { preferences } from 'user-settings';

const MONTH_SHORT_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function zeroPad(i: number) {
  if (i < 10) {
    return `0${i}`;
  }
  return i;
}

clock.granularity = 'minutes';

const myDate = document.getElementById('myDate');
const myTime = document.getElementById('myTime');

let oldDate: Date | null = null;
clock.ontick = (ev) => {
  const current = ev.date;
  if (current !== oldDate) {
    oldDate = current;
    changeImage();
  }
  changeDate(current);
  changeTime(current);
};

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

const IMG_COUNT = 1;
function changeImage() {
  const img = document.getElementById('img') as ImageElement;
  const imgIdx = Math.floor(IMG_COUNT * Math.random() + 1);
  img.href = `images/image${zeroPad(imgIdx)}.png`;
}
