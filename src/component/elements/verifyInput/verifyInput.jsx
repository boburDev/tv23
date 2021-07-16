import { useEffect } from 'react'
import { useTheme } from '../../../context/theme'
import st from './verifyInput.module.css'
export default function VerifyInput({ onkeyup }) {
    const [dark] = useTheme()

    useEffect(()=>{
        const inputElements = [...document.querySelectorAll('input.code_input')]
        
        inputElements.forEach((ele,index)=>{
            ele.addEventListener('keydown',(e)=>{
                
                if(e.keyCode === 8 && e.target.value==='') {
                    inputElements[Math.max(0,index-1)].focus()
                }
            })
            ele.addEventListener('input',(e)=>{
                
                const [first,...rest] = e.target.value
                e.target.value = first ?? ''
                if(index!==inputElements.length-1 && first!==undefined) {
                    inputElements[index+1].focus()
                    inputElements[index+1].value = rest.join('')
                    inputElements[index+1].dispatchEvent(new Event('input'))
                }
            })
        })
        
    }, [])
    
    
    const fields ={
        background:dark ? '' : ' rgba(119, 119, 119, 0.06)',
        color:dark ? ' ' : 'black'
    }
    
    const clearFunc=(e)=>{
        if(e.target.value==='_')e.target.value=""
    }
    
    const fillFunc=(e)=>{
        if(e.target.value==="") e.target.value="_"
    }

    



    return (
        <div id="containerRef" className={st.container}>

        <input type="text" style={fields}
        onFocusCapture={fillFunc} onFocus={clearFunc} name="code" defaultValue="_" className="code_input"   />

        <input type="text" style={fields}
        onFocusCapture={fillFunc} onFocus={clearFunc} name="code" defaultValue="_" className="code_input"   />

        <input type="text" style={fields}
        onFocusCapture={fillFunc} onFocus={clearFunc} name="code" defaultValue="_" className="code_input"  />

        <input type="text" style={fields}
        onFocusCapture={fillFunc} onFocus={clearFunc} name="code" defaultValue="_" className="code_input"   />

        <input type="text" style={fields}
        onFocusCapture={fillFunc} onFocus={clearFunc} name="code" defaultValue="_" className="code_input"   />

        <input type="text" style={fields}
        onFocusCapture={fillFunc} onFocus={clearFunc} name="code" defaultValue="_" className="code_input"   />

        </div>
        )
    }
    