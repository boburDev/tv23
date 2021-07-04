import st from './dropDownItem.module.css'
export default function DropDownItem({ children, onClick }) {
    
    return (
        <div onClick={onClick} className={st.dropdownItems}>{children}</div>
    )
}
