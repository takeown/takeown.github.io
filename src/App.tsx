import { useEffect, useState, type MouseEvent } from "react";
import "./App.css";

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  tag: string;
  summary: string;
};

type AppRoute = "/" | "/blog" | "not-found";
type NavigableRoute = Exclude<AppRoute, "not-found">;
type Navigate = (
  event: MouseEvent<HTMLAnchorElement>,
  href: NavigableRoute,
) => void;

const posts: BlogPost[] = [
  {
    slug: "rebuild-notes",
    title: "Rebuilding the site with Vite",
    date: "Jun 17, 2026",
    tag: "Build Log",
    summary:
      "A short note on moving away from the old static stack and keeping the site small, fast, and easy to change.",
  },
  {
    slug: "routing-the-blog",
    title: "Adding a clean blog route",
    date: "Jun 17, 2026",
    tag: "React",
    summary:
      "The home page stays focused, while /blog becomes the place for posts, notes, and experiments.",
  },
  {
    slug: "shipping-on-pages",
    title: "Shipping Vite through GitHub Pages",
    date: "Jun 17, 2026",
    tag: "Deploy",
    summary:
      "GitHub Actions builds the app and publishes the Vite dist folder whenever main is pushed.",
  },
];

function getRoute(): AppRoute {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  return path === "/blog" ? "/blog" : path === "/" ? "/" : "not-found";
}

function App() {
  const [route, setRoute] = useState<AppRoute>(getRoute);

  useEffect(() => {
    const onPopState = () => setRoute(getRoute());

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    document.title =
      route === "/blog" ? "Blog | takeown.github.io" : "takeown.github.io";
  }, [route]);

  function navigate(
    event: MouseEvent<HTMLAnchorElement>,
    href: NavigableRoute,
  ) {
    event.preventDefault();
    window.history.pushState({}, "", href);
    setRoute(getRoute());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="/" onClick={(event) => navigate(event, "/")}>
          takeown
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a
            className={route === "/" ? "active" : ""}
            href="/"
            onClick={(event) => navigate(event, "/")}
          >
            Home
          </a>
          <a
            className={route === "/blog" ? "active" : ""}
            href="/blog"
            onClick={(event) => navigate(event, "/blog")}
          >
            Blog
          </a>
        </nav>
      </header>

      <main>
        {route === "/" && <HomePage navigate={navigate} />}
        {route === "/blog" && <BlogPage />}
        {route === "not-found" && <NotFound navigate={navigate} />}
      </main>
    </div>
  );
}

function HomePage({ navigate }: { navigate: Navigate }) {
  return (
    <section className="hero-panel" aria-labelledby="home-title">
      <p className="eyebrow">Personal site</p>
      <h1 id="home-title">Notes, builds, and small technical records.</h1>
      <p className="hero-copy">
        A compact home for experiments, writeups, and the work-in-progress
        pieces that are worth keeping around.
      </p>
      <a
        className="primary-link"
        href="/blog"
        onClick={(event) => navigate(event, "/blog")}
      >
        Go to blog
      </a>
    </section>
  );
}

function BlogPage() {
  return (
    <section className="blog-page" aria-labelledby="blog-title">
      <div className="blog-heading">
        <p className="eyebrow">Blog</p>
        <h1 id="blog-title">Field notes from the rebuild.</h1>
        <p>
          Posts will grow from here. For now, this page is wired as the
          dedicated blog route at <code>/blog</code>.
        </p>
      </div>

      <div className="post-list">
        {posts.map((post) => (
          <article className="post-item" key={post.slug}>
            <div className="post-meta">
              <span>{post.tag}</span>
              <time dateTime="2026-06-17">{post.date}</time>
            </div>
            <h2>{post.title}</h2>
            <p>{post.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function NotFound({ navigate }: { navigate: Navigate }) {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <p className="eyebrow">404</p>
      <h1 id="not-found-title">This page is not here yet.</h1>
      <a
        className="primary-link"
        href="/"
        onClick={(event) => navigate(event, "/")}
      >
        Back home
      </a>
    </section>
  );
}

export default App;
