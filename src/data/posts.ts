export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  dateTime: string;
  tag: string;
  summary: string;
  body: string[];
};

export const posts: BlogPost[] = [
  {
    slug: "rebuild-notes",
    title: "Rebuilding the site with Astro",
    date: "Jun 18, 2026",
    dateTime: "2026-06-18",
    tag: "Build Log",
    summary:
      "A short note on moving the site from a client-rendered shell to static pages with real routes.",
    body: [
      "The site is now shaped around Astro's file-based routing. The home page, blog index, and each post detail page are emitted as static HTML during the build.",
      "That keeps the URL structure simple for GitHub Pages while avoiding the refresh problem that comes with a browser-only router on static hosting.",
      "React can still be added where a page needs client-side interaction, but the core blog does not need JavaScript to render.",
    ],
  },
  {
    slug: "routing-the-blog",
    title: "Adding real blog detail routes",
    date: "Jun 18, 2026",
    dateTime: "2026-06-18",
    tag: "Astro",
    summary:
      "The blog index links to generated detail pages instead of relying on client-side route state.",
    body: [
      "Each post has a stable slug, and the dynamic route at /blog/[slug] uses getStaticPaths to generate its page at build time.",
      "That means /blog/routing-the-blog is a real document in the output, not just a client-side view that only works after the app loads.",
      "This is the simpler foundation for a personal site where links should be shareable, reloadable, and easy to crawl.",
    ],
  },
  {
    slug: "shipping-on-pages",
    title: "Shipping static pages through GitHub Pages",
    date: "Jun 18, 2026",
    dateTime: "2026-06-18",
    tag: "Deploy",
    summary:
      "Static output lines up with GitHub Pages because each route maps to generated files.",
    body: [
      "Astro builds the site into static assets that can be published directly from the dist directory.",
      "The blog detail pages are generated as nested index files, so direct navigation and browser refreshes work without a custom server.",
      "That keeps the deployment model boring in the right way: build the site, publish the directory, and let the host serve files.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
