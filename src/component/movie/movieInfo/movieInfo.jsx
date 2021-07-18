import st from "./movieInfo.module.css";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import rateStars from "../../../assets/image/rates.png";
import adsImg from "../../../assets/image/ads_banner.svg";
import { useTheme } from "../../../context/theme";
import Language from '../../../languages'
import { useLang } from '../../../context/lanuage'

export default function MovieInfo({ movie, api }) {
  const [ til ] = useLang()
  const params = useParams();
  const [dark] = useTheme();
  const [collapseDesc, setCollapseDesc] = useState(false);
  const descStyle = {
    height: !collapseDesc ? 48 + "px" : "auto",
  };
  const setCollapse = () => setCollapseDesc(!collapseDesc);
  return (
    <div
      className={st.movieWrapper}
      style={{ background: dark ? "#0C0C0D" : "#F8F9FC" }}
    >
      <div className={st.movieIntro}>
        <div className={st.filmBio}>
          <div className={st.moviePicture}>
            <div className={st.film_img}>
              <img
                src={`${api}/${movie && movie.movie_thumnail_path}`}
                alt="film_picture"
              />
              <div className={st.img_rate}>
                <p className={st.info_text}>{Language[til].movie.movieInfo.rating}:</p>
                <img src={rateStars} alt="rate" height="5" />
              </div>
            </div>
          </div>
          <div className={st.movieInfo}>
            <div className={st.moviData}>
              <p className={st.info_text}>{Language[til].movie.movieInfo.production}:</p>
              <span style={{ color: dark ? "" : "black" }}>
                {movie && movie.country_name}
              </span>
            </div>
            <div className={st.moviData}>
              <p className={st.info_text}>{Language[til].movie.movieInfo.releaseDate}:</p>
              <span style={{ color: dark ? "" : "black" }}>
                {movie && movie.movie_premeire_date} {Language[til].movie.movieInfo.year}.
              </span>
            </div>
            <div className={st.moviData}>
              <p className={st.info_text}>{Language[til].movie.movieInfo.duration}:</p>
              <span style={{ color: dark ? "" : "black" }}>134 {Language[til].movie.movieInfo.min}.</span>
            </div>
            <div className={`${st.moviData} ${st.rating_film}`}>
              <p className={st.info_text}>{Language[til].movie.movieInfo.rating}:</p>
              <div>
                <img src={rateStars} alt="rate" />
                <span style={{ color: dark ? "" : "black" }}>
                  {movie && movie.movie_rate}%
                </span>
              </div>
            </div>

            <div className={`${st.genre} ${!dark ? st.dark : ""}`}>
              {
                // <Link to="/">Фантези</Link>
                movie &&
                  movie.movie_genre &&
                  movie.movie_genre.split(",").map((i, key) => (
                    <Link to={`/${params.lang || "ru"}/genres/${i}`} key={key}>
                      {i}
                    </Link>
                  ))
              }
            </div>
          </div>
        </div>
        <div className={st.ads}>
          <img src={adsImg} alt="ads_picture" />
        </div>
      </div>
      <div style={descStyle} className={st.description}>
        <p style={{ color: dark ? "" : "black" }}>
          {movie && movie.movie_body}
        </p>
        <div onClick={setCollapse} style={{ color: dark ? "" : "black" }}>
          {Language[til].movie.movieInfo.open}
        </div>
      </div>
    </div>
  );
}
