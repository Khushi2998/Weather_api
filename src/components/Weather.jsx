import Header from "./header";
import Tabs from "./Tabs";
import TodayCard from "./TodayCard";
import CurrentWeather from "./CurrentWeather";
import AheadCard from "./AheadCard";
import News from "./News";
export default function Weather({ apiKey }) {
  return (
    <>
      <Header />
      <Tabs />

      <div className="flex gap-10">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-10">
          <TodayCard apiKey={apiKey} />
          <CurrentWeather apiKey={apiKey}/>
          <AheadCard apiKey={apiKey}/>
        </div>

        {/* Right Column */}
        <div className="flex-1">
          <News apiKey={apiKey}/>
        </div>
      </div>

      {/* ☀️ 🌙   */}
    </>
  );
}
