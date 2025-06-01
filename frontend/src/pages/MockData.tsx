import { useState } from "react";
import Base from "./Base"
import copy from "copy-to-clipboard";
import { toast, ToastContainer } from "react-toastify";



function MockData() {
  const [X_data_list, setX_data_list] = useState(['0.029630618413506865', ' 0.04645347084956167', ' 0.07370479374309305', ' 0.10096096821627418', ' 0.12879084198305688', ' 0.15430651225683364', ' 0.1809792842771136', ' 0.2053317883298251', ' 0.23258068543353141', ' 0.2569319765913304', ' 0.28244643397019464', ' 0.3062216000445672', ' 0.3323109696119456', ' 0.3566634736646572', ' 0.3827564819167728', ' 0.40942440235740274', ' 0.433776906410114', ' 0.45986991466223015', ' 0.48479975669328057', ' 0.5085737098727406', ' 0.5335059776936159', ' 0.5590167963877429', ' 0.5839478513137059', ' 0.6088776933447564', ' 0.6338123869554566', ' 0.6581636781132558', ' 0.684832811448798', ' 0.7074448113021052', ' 0.7335366066593085', ' 0.758471300270009', ' 0.7822416147647315', ' 0.8077536463537709', ' 0.8315263866383182', ' 0.8553003398177783', ' 0.8813909222800693', ' 0.9045863245862777', ' 0.9277829397873989', ' 0.9550403271554926', ' 0.9753441879903557', ' 0.9962593478611079']);
  const [Y_data_list, setY_data_list] = useState(['50.97234837124802', ' 56.700002016437566', ' 58.18494925778282', ' 62.51437764786942', ' 63.289538786433695', ' 66.90384433612326', ' 69.0985776802504', ' 70.57685399957722', ' 70.63956066655214', ' 71.4067166986938', ' 74.30990196119865', ' 77.20908467049253', ' 77.26912296865999', ' 78.74739928798681', ' 80.94079844771', ' 80.29105064309601', ' 81.76932696242284', ' 83.96272612214625', ' 84.02009605150647', ' 86.2081584736145', ' 87.68776897734529', ' 88.4575933782944', ' 89.22608359483979', ' 89.28345352419979', ' 92.1853046023009', ' 92.95246063444279', ' 93.01383311701375', ' 93.77698659594421', ' 95.25926546848245', ' 98.16111654658334', ' 98.21581810713587', ' 99.69676279527062', ' 101.17370493019348', ' 103.36176735230197', ' 104.13292593765459', ' 107.03077446254451', ' 110.6397432746196', ' 115.68029195189115', ' 122.83819127787376', ' 148.48655225507548']);



  const copyToClipboard = (value: any, name:string) => 
  {
    const text = value.toString()
    console.log(text)
    let isCopy = copy(text);    // Adding text value to clipboard using copy function
    console.log(isCopy)
    if(isCopy){
      toast.success(`copied ${name} to clipboard!`);
    }

  };




    const mock_data = () => {
    return(
        <div className="flex flex-row  mb-10">
             <ToastContainer position="top-right"
              autoClose={1000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              />   


            <div className="m-2 rounded-xl p-2 border-2 border-gray-700 basis-1/2 ">
                    <div className="flex items-center  m-2 rounded-xl p-2 border-2 border-gray-700  "> <h1 className="flex items-center  align-middle text-center"> <b>Isotherm data</b></h1></div> 
              <table>
                <button onClick={() => copyToClipboard(X_data_list, "x_data")} type="button" className="cursor-pointer m-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                copy x
</button>
<button onClick={() => copyToClipboard(Y_data_list, "y_data")} type="button" className="cursor-pointer m-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                copy y
</button>

                  <tr>
                      <th>No</th>
                      <th>X</th>
                      <th>Y</th>
                  </tr>

                  {X_data_list.map((row: any, i: any) => (
                        <tr  key={i}>
                          <td className="p- border-1 border-gray-700">{i+1}</td>
                          <td className="p- border-1 border-gray-700">{row}</td>
                          <td className="p- border-1 border-gray-700">{Y_data_list ? Y_data_list[i] : null}</td>
                        </tr>
                      )) }
              </table> 
                       
             
            </div >




            <div className="flex flex-col  m-2 rounded-xl p-2 border-2 border-gray-700 basis-1/2">
                    <div className=" m-2 rounded-xl p-2 border-2 border-gray-700  "> <h1 className="flex items-center  align-middle text-center"> <b>Adsorbent data</b></h1></div> 
              <table>
                  <tr>
                      <th className="p- border-1 border-gray-700 ">Total surface area </th>
                      <th className="p- border-1 border-gray-700">Total pore volume</th>
                      <th className="p- border-1 border-gray-700">Micropore volume</th>
                  </tr>

                  <tr>
                    <td className="p- border-1 border-gray-700 text-center">366</td>
                    <td className="p- border-1 border-gray-700 text-center">0.21</td>
                    <td className="p- border-1 border-gray-700 text-center">0.08</td>
                  </tr>

              </table> 
            </div>

        </div>
    )
  }


return (
    <Base>
      <div>

        {/* {post_form()} */}

        {mock_data()}

        {/* <h1>Adsorbent tool - Home</h1>
        {data}
        <button onClick={fetchData} className=" cursor-pointer  block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
          get data
        </button> */}
      </div>
    </Base>
)
  }
  
  export default MockData