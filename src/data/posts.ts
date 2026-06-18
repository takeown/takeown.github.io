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
    title: "Astro로 사이트 다시 잡기",
    date: "2026년 6월 18일",
    dateTime: "2026-06-18",
    tag: "개발 기록",
    summary:
      "클라이언트 라우팅으로 버티던 구조를 실제 정적 페이지가 생성되는 Astro 구조로 옮긴 기록.",
    body: [
      "이 사이트는 이제 Astro의 파일 기반 라우팅을 기준으로 움직인다. 홈, 블로그 목록, 글 상세 페이지가 빌드 시점에 정적 HTML로 생성된다.",
      "덕분에 GitHub Pages에서도 URL 구조가 단순해지고, 정적 호스팅에서 브라우저 라우터만 쓸 때 생기는 새로고침 문제를 피할 수 있다.",
      "React는 나중에 상호작용이 필요한 부분에만 붙이면 된다. 블로그 본문을 보여주는 일에는 굳이 클라이언트 자바스크립트가 필요하지 않다.",
    ],
  },
  {
    slug: "routing-the-blog",
    title: "블로그 상세 경로 만들기",
    date: "2026년 6월 18일",
    dateTime: "2026-06-18",
    tag: "Astro",
    summary:
      "블로그 목록에서 클라이언트 상태가 아니라 실제 생성된 상세 페이지로 이동하도록 바꿨다.",
    body: [
      "각 글은 고정된 slug를 가지고, /blog/[slug] 동적 라우트는 getStaticPaths로 빌드 시점에 페이지를 생성한다.",
      "그래서 /blog/routing-the-blog 같은 주소는 앱이 로드된 뒤에만 보이는 화면이 아니라, 산출물 안에 실제로 존재하는 문서가 된다.",
      "개인 사이트에서는 링크가 공유 가능하고, 새로고침해도 살아 있고, 검색엔진이 읽기 쉬운 구조가 더 자연스럽다.",
    ],
  },
  {
    slug: "shipping-on-pages",
    title: "GitHub Pages로 정적 사이트 배포하기",
    date: "2026년 6월 18일",
    dateTime: "2026-06-18",
    tag: "배포",
    summary:
      "각 경로가 실제 파일로 생성되기 때문에 GitHub Pages 배포 방식과 잘 맞는다.",
    body: [
      "Astro는 사이트를 dist 디렉터리에 정적 파일로 빌드한다. 이 결과물은 GitHub Pages에 그대로 올릴 수 있다.",
      "블로그 상세 페이지도 중첩된 index.html로 생성되기 때문에, 별도 서버 없이 직접 접근과 브라우저 새로고침이 동작한다.",
      "배포 모델은 단순할수록 좋다. 빌드하고, 디렉터리를 올리고, 호스팅 서비스가 파일을 서빙하게 두면 된다.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
