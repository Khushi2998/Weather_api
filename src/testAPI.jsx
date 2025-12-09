export default function TestAPI() {
  console.log("API Key:", import.meta.env.VITE_WEATHER_API_KEY);
  return <p>Check console for API key</p>;
}
