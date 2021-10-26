import st from "./triller.module.css";
import { useEffect, useState } from "react";
import TrailerItem from "../trillerItem/trillerItem";
import SliderCounterBasic from "../../sliderCounter/sliderCounterBasic";
import SearchNotFound from "../../notFound/SearchNotFound/notFound";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import "swiper/components/pagination/pagination.min.css"
import SwiperCore, { Pagination } from 'swiper/core';
SwiperCore.use([Pagination])


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

  useEffect(() => {
    settingSize();
  }, []);

  console.log(props)

  return (
    <div className={st.container}>
      <div id="playerRef" style={{ height: "95vh" }} className={st.player}>
        <Swiper
          slidesPerView={1} spaceBetween={10}
          modules={Pagination}
          pagination={true}
          className="mySwiper"
        >

          {props.data && props.data.length > 0 ? (
            props.data.map((item, key) => {
              return (
                <SwiperSlide key={key} width="auto" >
                    <TrailerItem
                      listenIndex={current}
                      isActive={key === current}
                      data={item}
                      api={props.api} />
                </SwiperSlide>
              );
            })
          ) : (
            <div style={{ display: "flex", height: "100vh", width: "100%" }}>
              <SearchNotFound />
            </div>
          )}
        </Swiper>
        <div className={st.controls}>
          <SliderCounterBasic
            current={current}
            setCurrent={setCurrent}
            max={props.data && props.data.length}
          />
        </div>
        <div style={carouselWayStyle} id="carouselWay" className={st.carouselWay}>
          
        </div>
      </div>
    </div>
  );
}
