import './Base.css'
import Header from "../components/Header"

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