export default function TestAPI() {
  console.log("API Key:", import.meta.env.VITE_WEATHER_API_KEY);
  console.log("News API:", import.meta.env.NEWS_API_KEY);
  return <p>Check console for API key</p>;
}
