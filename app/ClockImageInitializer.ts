import document from 'document';
import { IMAGES, type Image } from '../utils/IMAGES';

export class ClockImageInitializer {
  ImageElement: ImageElement;
  private selectedIndex: number | null = null;
  onImageElementClick?: (selectedImage: Image) => void;

  constructor() {
    this.ImageElement = document.getElementById('img') as ImageElement;

    // FIXME: これガチで必要か？？？
    this.initialize = this.initialize.bind(this);
    this.imageElementOnClick = this.imageElementOnClick.bind(this);
  }

  initialize(onImageElementClick?: (selectedImage: Image) => void) {
    this.onImageElementClick = onImageElementClick;
    this.ImageElement.addEventListener('click', () =>
      this.imageElementOnClick(),
    );

    this.imageElementOnClick();
  }

  private imageElementOnClick(argSelectedIndex?: number) {
    if (argSelectedIndex === undefined) {
      if (this.selectedIndex === null) {
        this.selectedIndex = Math.floor(IMAGES.length * Math.random());
      } else {
        this.selectedIndex = (this.selectedIndex + 1) % IMAGES.length;
      }
    } else {
      if (argSelectedIndex < 0 || argSelectedIndex >= IMAGES.length) {
        throw new RangeError('argSelectedIndex');
      }
      this.selectedIndex = argSelectedIndex;
    }

    const cur = IMAGES[this.selectedIndex];
    this.ImageElement.href = cur.href;
    this.onImageElementClick?.(cur);
  }
}
