// Types
export type CardItem = {
  title: string;
  img: string;
  metaData: string[];
};

// Utils
export const isLikelyRedirectUrl = (url: string) => /google\.com\/url\?|yahoo|bing/.test(url);

export const placeholderFor = (title: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='#0ea5e9'/>
          <stop offset='100%' stop-color='#22d3ee'/>
        </linearGradient>
      </defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
            font-family='system-ui, -apple-system, Segoe UI, Roboto'
            font-size='48' fill='white' opacity='0.9'>${title.replace(/'/g, "\\'")}</text>
    </svg>
  `)}`;

export const safeImg = (src: string, title: string) =>
  isLikelyRedirectUrl(src) ? placeholderFor(title) : src;

// Small helper for classnames (optional)
export const cx = (...xs: Array<string | false | undefined>) => xs.filter(Boolean).join(" ");
