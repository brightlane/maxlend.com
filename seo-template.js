(function () {
  const page = window.location.pathname;

  const seoMap = {
    "/maxlend.com/": {
      title: "Fast Cash Loans Online 2026 | Emergency Guide",
      desc: "Compare fast cash loan options including MaxLend. Learn approval steps and emergency funding options.",
      canonical: "https://brightlane.github.io/maxlend.com/"
    },

    "/maxlend.com/blog1.html": {
      title: "MaxLend Review 2026 | Fast Emergency Loans Guide",
      desc: "Full MaxLend review including approval process, bad credit options, and fast funding details.",
      canonical: "https://brightlane.github.io/maxlend.com/blog1.html"
    }
  };

  const data = seoMap[page] || seoMap["/maxlend.com/"];

  // TITLE
  document.title = data.title;

  // META DESCRIPTION
  const desc = document.createElement("meta");
  desc.name = "description";
  desc.content = data.desc;
  document.head.appendChild(desc);

  // CANONICAL
  const canonical = document.createElement("link");
  canonical.rel = "canonical";
  canonical.href = data.canonical;
  document.head.appendChild(canonical);

  // ROBOTS
  const robots = document.createElement("meta");
  robots.name = "robots";
  robots.content = "index, follow";
  document.head.appendChild(robots);

})();
