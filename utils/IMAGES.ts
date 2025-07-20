export type ElementStyle = {
  fontSize: number;
  textAnchor: 'start' | 'middle' | 'end';
  x: number;
  y: number;
};
export type Image = {
  href: string;
  date: ElementStyle;
  time: ElementStyle;
};

export const IMAGES: ReadonlyArray<Image> = [
  {
    href: `images/image01.png`,
    date: {
      fontSize: 336 * 30,
      textAnchor: 'start',
      x: 0.07,
      y: 0.88,
    },
    time: {
      fontSize: 80,
      textAnchor: 'start',
      x: 0.05,
      y: 0.8,
    },
  },
  {
    href: `images/image02.png`,
    date: {
      fontSize: 30,
      textAnchor: 'middle',
      x: 0.5,
      y: 0.48,
    },
    time: {
      fontSize: 80,
      textAnchor: 'middle',
      x: 0.5,
      y: 0.4,
    },
  },
];
