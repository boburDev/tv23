import st from "./triller.module.css";
import { useEffect, useState } from "react";
import TrailerItem from "../trillerItem/trillerItem";
import SliderCounterBasic from "../../sliderCounter/sliderCounterBasic";
import SearchNotFound from "../../notFound/SearchNotFound/notFound";

export default function Trailer(props) {
  const [current, setCurrent] = useState(0);
  const [itemWidth, setItemWidth] = useState();
  const carouselWayStyle = {
    transform: `translateX(-${current * itemWidth}px)`,
    transition: "transform 1s ease",
    minWidth: "100%",
    minHeight: "200px",
  };
  const settingSize = () => {
    var playerRefId = document.getElementById("playerRef");
    setItemWidth(playerRefId.clientWidth || playerRefId.offsetWidth);
  };

  useEffect(() => {
    settingSize();
    window.addEventListener("resize", settingSize);
    window.addEventListener("load", settingSize);
    return () => {
      window.removeEventListener("resize", settingSize);
      window.removeEventListener("load", settingSize);
    };
  }, []);

  console.log(itemWidth)
  useEffect(() => {
    settingSize();
  }, []);

  console.log(props.data)

  return (
    <div className={st.container}>
      <div id="playerRef" style={{ height: "95vh" }} className={st.player}>
        <div className={st.controls}>
          <SliderCounterBasic
            current={current}
            setCurrent={setCurrent}
            max={props.data && props.data.length}
          />
        </div>
        <div style={carouselWayStyle} id="carouselWay" className={st.carouselWay}>
          {props.data && props.data.length > 0 ? (
            props.data.map((item, key) => {
              return (
                <div
					className={st.carouselItem}
                	key={key}
                	style={{
                    width: itemWidth + "px",
                    transform: current !== key ? "scale(0.94, 0.8)" : "scale(1)",
                    transition: "transform 1s ease",
                    opacity:
                      current - 1 === key || current + 1 === key
                        ? 0.3
                        : current === key
                        ? 1
                        : 0,
                	}}>
                  <TrailerItem
                    listenIndex={current}
                    isActive={key === current}
                    data={item}
                    api={props.api} />
                </div>
              );
            })
          ) : (
            <div style={{ display: "flex", height: "100vh", width: "100%" }}>
              <SearchNotFound />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
