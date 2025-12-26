import { useEffect, useState } from "react";




function News() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const YOUR_REAL_API_KEY = "0626576b689f42ce9ace347f72a25f7d";

        const res = await fetch(
          `https://newsapi.org/v2/everything?q=technology&apiKey=${YOUR_REAL_API_KEY}`
        );

        const data = await res.json();

        if (data.status !== "ok") {
          throw new Error(data.message);
        }

        setNews(data.articles || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchNews();
  }, []);

  if (error) {
    return <h3>Error: {error}</h3>;
  }

  return (
    <aside className="card news">
      {news.length === 0 && <p>Loading news...</p>}

      {news.slice(0,7).map((article, index) => (
        <div key={index}>
          <h3>{article.title}</h3>
          <p className="story">{article.description}</p>
        </div>
      ))}
    </aside>
  );
}

export default News;
