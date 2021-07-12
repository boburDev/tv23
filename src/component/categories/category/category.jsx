import st from "./category.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import MovieItem from "../../movie/movieItem/movieItem";
import SliderCounterAdvanced from "../../sliderCounter/SliderCounterAdvanced";
import SliderCounterBasic from "../../sliderCounter/sliderCounterBasic";
import NoFoundVideos from "../../notFound/videoNotFound/notFount";
import { useTheme } from "../../../context/theme";

export default function Category({
  title,
  pagination,
  link,
  loading,
  movies = [],
  visibled = 6,
  showAllLink = true,
  showAllLinkText = true,
}) {
  const [dark] = useTheme();
  const counts = Math.ceil(
    movies.length / visibled > 5 ? 5 : movies.length / visibled
  );
  const [current, setCurrent] = useState(0);
  const categoryId = link && link.category_name;
  return (
    <div className={st.container}>
      <div className={st.category_wrapper}>
        {showAllLink && (
          <div className={st.titleBox}>
            <h1
              style={{ color: dark ? "#fff" : "#000" }}
              className={st.titleText}
            >
              {title}
            </h1>
            {showAllLinkText && (
              <Link to={link} className={st.title}>
                Все
              </Link>
            )}
          </div>
        )}
        <div className={st.items}>
          {movies && movies.length === 0 ? (
            loading ? ( //if Loaded finished and no found videos
              <>
                <MovieItem />
                <MovieItem />
                <MovieItem />
                <MovieItem />
                <MovieItem />
                <MovieItem />
              </>
            ) : (
              <NoFoundVideos />
            )
          ) : (
            movies.map(
              (item, key) =>
                current * visibled <= key &&
                (current + 1) * visibled > key && (
                  <MovieItem caregoryId={categoryId} key={key} movie={item} />
                )
            )
          )}
        </div>
        <div className={st.bottom}>
          {movies.length > visibled ? (
            <div
              className={st.pagination}
              style={{
                justifyContent:
                  pagination === "basic" ? "center" : "space-between",
              }}
            >
              {pagination === "basic" ? (
                <SliderCounterBasic
                  max={counts > 6 ? 5 : counts}
                  current={current}
                  setCurrent={setCurrent}
                  mode={dark}
                />
              ) : (
                <SliderCounterAdvanced
                  max={counts > 6 ? 5 : counts}
                  current={current}
                  setCurrent={setCurrent}
                  mode={dark}
                />
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
