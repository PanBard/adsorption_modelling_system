import { Header } from '../components'
import './Base.css'


const Base = (props: { children: any }) => {

    return (
      <>
      <div>
      <Header/>
        {props.children}
      </div>

      </>
    )
  }
  
  export default Base