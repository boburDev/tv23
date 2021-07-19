import st from "./history.module.css";
import MovieItem from '../../movie/movieItem/movieItem'
import { useEffect, useState } from "react"
import axios from "axios"
import { useApi } from '../../../context/api'
import SliderCounterBasic from "../../sliderCounter/sliderCounterBasic"

export default function History({ visibled = 4 }) {
    const [state,setState] = useState()
    const [api] = useApi()
    const [current, setCurrent] = useState(0);
    async function GetHistory(api) {
        const res = await axios.get(api + '/history-movie', {
            headers: {
                Authorization: localStorage.getItem('Authorization')
            }
        })
        console.log(res.data.data)
        setState(res.data.data)
    }


    useEffect(()=>{
        if (api) {
            GetHistory(api)
        }
    },[api])

      function pagination(val) {
        return Math.ceil(val.length / visibled > 5 ? 5 : val.length / visibled)
      }

    return (
        <div className={st.container}>
        {
            state && <>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {
                    state.map(
                        (item, key) =>
                          current * visibled <= key &&
                          (current + 1) * visibled > key && (
                            <MovieItem
                              caregoryId={item.movie_id}
                              key={Math.random() * Math.random()}
                              movie={item}
                            />
                          )
                      )
                }
            </div>
            

            </>
        }
        <div className={st.pagination} style={{ justifyContent: "center" }}>
        <SliderCounterBasic
            max={state && pagination(state) > 6 ? 5 : state && pagination(state)}
            current={current}
            setCurrent={setCurrent}
        />
        </div>
        </div>
        );
    }
    