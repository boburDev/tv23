import Category from './category/category'
import Header from './categoryHeader/header'
import Navbar from './categoryNavbar/navbar'
import { useTheme } from '../../context/theme'
export default function Categories(props) {
    const [dark] = useTheme()    
    return (
        <>
        <Header allCategory={props.allCategory} />
        <Navbar data={props.data} />
        <div className="" style={{background: dark ? '#0C0C0D' : '#F8F9FC'}}>
            {
                props.data && props.data.map((val, key) => <Category key={key}
                type='advanced'
                loading= {props.loading}
                movies = {val.movies}
                title={val.category_name}
                link={`/categories/${val.category_name}`}
                />)
            }
        </div>
        </>
    )
}
