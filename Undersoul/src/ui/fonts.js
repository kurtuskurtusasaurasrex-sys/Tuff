// Open-licence (OFL) pixel fonts, inlined by the bundler.
import pixelify from '../../assets/fonts/PixelifySans.woff2';
import pressStart from '../../assets/fonts/PressStart2P.woff2';
import comicNeue from '../../assets/fonts/ComicNeue-Bold.woff2';
import almendra from '../../assets/fonts/AlmendraSC.woff2';
import silkscreen from '../../assets/fonts/Silkscreen.woff2';

export const FONTS = {
  ui: 'UIFont',
  title: 'TitleFont',
  wick: 'WickFont',
  taper: 'TaperFont',
  small: 'SmallFont',
};

export async function loadFonts() {
  const list = [
    ['UIFont', pixelify, { weight: '400 700' }],
    ['TitleFont', pressStart, {}],
    ['WickFont', comicNeue, { weight: '700' }],
    ['TaperFont', almendra, {}],
    ['SmallFont', silkscreen, {}],
  ];
  await Promise.all(
    list.map(async ([name, url, desc]) => {
      try {
        const f = new FontFace(name, `url(${url})`, desc);
        await f.load();
        document.fonts.add(f);
      } catch (e) {
        console.warn('font failed', name, e);
      }
    })
  );
}

export function font(size, family = FONTS.ui, weight = '') {
  const fallback = family === FONTS.wick ? '"Comic Sans MS", cursive' : 'monospace';
  return `${weight ? weight + ' ' : ''}${size}px ${family}, ${fallback}`;
}
