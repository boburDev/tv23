import Category from './category/category'
import Header from './categoryHeader/header'
import Navbar from './categoryNavbar/navbar'
import { useTheme } from '../../context/theme'
import { useParams } from 'react-router-dom'
export default function Categories(props) {
    const language = useParams()
    const [dark] = useTheme()
    // console.log(props)
    return (
        <>
            {
                props.what === 'category' ? <>
                    <Header allCategory={props.allCategory} />
                    {
                        props.type === 'genres' ? <Navbar type="genres" data={props.genres} /> : <Navbar data={props.data} />
                    }
                    <div className="" style={{background: dark ? '#0C0C0D' : '#F8F9FC'}}>
                        {
                            props.data && props.data.map((val, key) => <Category key={key}
                            loading= {props.loading}
                            movies = {val.movies}
                            title={val.category_name}
                            link={`/${language.lang || 'ru'}/categories/${val.category_name}`}
                            />)
                        }
                    </div>
                </> : 
                <>
                <Header allCategory={props.allCategory}
                text={props.data.category && props.data.category.category_name} />
                <Navbar data={props.categories} />
                <div className="" style={{background: dark ? '#0C0C0D' : '#F8F9FC'}}>
                    <Category
                    title={""}
                    movies={props.data && props.data.data}
                    showAllLink={false}
                    pagination="basic"
                    visibled="12"
                    loading={props.loading}>
                    </Category>
                </div>
                </>
            }
        </>
    )
}
