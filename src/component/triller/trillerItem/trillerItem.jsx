import st from "./trillerItem.module.css";
import Button from "../../elements/button/button";
import TrailarPlayer from "../trillerPlayer/player";

export default function TrailerItem({ isActive, data, api }) {
  return (
    <>
      {
        <div className={st.container}>
          <img
            className={st.bg_image}
            src={`${api}/${data.movie_screen}`}
            alt="triller_img"
          />
          <div className={st.box}>
            <div className={st.info}>
              <h1 className={st.name}>{data.triller_name}</h1>
              <h6 className={st.counter}>Страна:{data.country_name}</h6>
              <h6 className={st.description}>{data.movie_body}</h6>
              <div className={st.genre}>
                {data &&
                  data.movie_genre.split(",").map((x, key) => {
                    return (
                      <div className={st.genreItem} key={key}>
                        {x}
                      </div>
                    );
                  })}
              </div>
              <div className={st.rating}>
                <h6 className={st.title}>Рейтинг:</h6>
              </div>
              <div className={st.button}>
                <Button>Смотреть по подписке</Button>
              </div>
            </div>
            <div className={st.player}>
              <TrailarPlayer
                isActive={isActive}
                src={data && data.triller_path}
                api={api}
              />
            </div>
          </div>
        </div>
      }
    </>
  );
}
