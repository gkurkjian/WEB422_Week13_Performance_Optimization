# 📈 Next.js Performance Optimization Practice

This project demonstrates various real-world techniques for improving and optimizing performance in a Next.js application. The final Lighthouse performance score reaches **100%** after implementing all best practices.

---

## ✅ Overview of Optimizations (In Order)

### 1. 🖼 Optimizing Images with `<Image />`
We replaced raw HTML `<img>` tags with the optimized Next.js `<Image />` component. This improves:
- Core Web Vitals
- LCP (Largest Contentful Paint)
- Lazy loading and responsive image delivery

```tsx
<Image
  src="/theatre-bkrd.jpg"
  alt="theatre background"
  className={styles.headerImage}
  width={800}
  height={232}
  sizes="100vw"
  priority
/>
```

---

### 2. 📦 Dynamically Importing Libraries
Lodash was initially imported globally. We dynamically imported it instead **inside the search handler**, so it only loads **when needed**.

```tsx
async function filterResults(data, searchText) {
  const _ = (await import('lodash')).default;
  setFilteredResults(
    _.filter(data, movie =>
      movie.title.toLowerCase().includes(searchText.toLowerCase())
    )
  );
}
```

✅ This reduces the main JavaScript bundle size and improves load performance.

---

### 3. 🧱 Dynamically Importing Components
We dynamically imported the `StarRating` component only when an accordion section is expanded, preventing unnecessary component loading.

```tsx
import dynamic from 'next/dynamic';

const StarRating = dynamic(() => import('@/components/StarRating'), {
  loading: () => <>Loading...</>,
});
```

In JSX:

```tsx
{accordionOpened && <StarRating rating={movie.rating} />}
```

---

### 4. ⚡ Static Data Fetching with `getStaticProps()`
We replaced client-side fetching (SWR and API route) with `getStaticProps()` to pre-generate movie data at build time.

```tsx
import getMovieData from '@/lib/movieData';

export function getStaticProps() {
  const data = getMovieData();
  return { props: { staticMovies: data } };
}
```

✅ This removes runtime fetch delays and improves TTFB.

---

### 5. 🚀 Lighthouse Test & Final Optimization

After implementing all the above practices:

```bash
npm run build
npm start
```

Then run Lighthouse audit. You should see:
- ⚡ 100% Performance
- ✅ Optimized JavaScript
- ✅ No layout shift
- ✅ Fast TTI and FCP

---

## 🧠 Summary

| Practice | Benefit |
|---------|---------|
| `<Image />` | Optimized image delivery |
| Dynamic `lodash` | Smaller JS bundle |
| Dynamic `StarRating` | Avoids unnecessary component load |
| `getStaticProps()` | Faster rendering with prebuilt data |
| Production Lighthouse run | Validates real-world performance |

---

## 📎 Reference

Optimization documentation:  
[https://webprogrammingforappsandservices.sdds.ca/Performance-Optimizations/improving-optimizing-performance](https://webprogrammingforappsandservices.sdds.ca/Performance-Optimizations/improving-optimizing-performance)

---
