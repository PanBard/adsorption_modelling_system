import { useState } from "react";
import Base from "./Base"
import { env } from "../env/env";
import '../css/ImageModal.css'


function ReverseEngineering() {

  const [X_data_list_mock, setX_data_list_mock] = useState(['0.005130397605814449', '0.010688328345446765', '0.02094912355707569', '0.0401881145788798', '0.06070970500213768', '0.0808037622915776', '0.10089781958101757', '0.15134672937152624', '0.20094057289439932', '0.25010688328345443', '0.3005557930739632', '0.4010260795211628', '0.5027789653698161', '0.6006840530141084', '0.7002992731936724', '0.8003420265070542', '0.9016673792218896', '0.9508336896109447']);
  const [Y_data_list_mock, setY_data_list_mock] = useState(['317.4257975708502', '330.4930688259108', '342.4714008097166', '353.36079352226716', '359.34995951417', '362.0723076923076', '364.7946558704453', '369.1504129554656', '371.32829149797567', '373.5061700404857', '375.1395789473684', '377.3174574898785', '378.4063967611335', '380.0398056680162', '381.12874493927126', '382.2176842105262', '384.3955627530364', '387.1179109311741']);


  const [imageSrc_isotherm, setimageSrc_isotherm] = useState('');
  const [imageSrcPie_raw_material_composition, setimageSrcPie_raw_material_composition] = useState('');
  const [imageSrcPie_industrial, setimageSrcPie_industrial] = useState('');
  const [imageSrcPie_biochemical, setimageSrcPie_biochemical] = useState('');

  const [Activation_time, setActivation_time] = useState('');
  const [Activation_temperature, setActivation_temperature] = useState('');
  const [Carbonization_temperature, setCarbonization_temperature] = useState('');
  const [Carbonization_time, setCarbonization_time] = useState('');
  const [Impregnation_ratio, setImpregnation_ratio] = useState('');
  const [Nitrogen_doped_ratio, setNitrogen_doped_ratio] = useState('');
  const [Nitrogen_content, setNitrogen_content] = useState('');
  const [Heating_rate, setHeating_rate] = useState('');

  const [Elemental_composition_Carbon, setElemental_composition_Carbon] = useState('');
  const [Elemental_composition_Hydrogen, setElemental_composition_Hydrogen] = useState('');
  const [Elemental_composition_Oxygen, setElemental_composition_Oxygen] = useState('');
  const [Elemental_composition_Nitrogen, setElemental_composition_Nitrogen] = useState('');

  const [Industrial_composition_moisture, setIndustrial_composition_moisture] = useState('');
  const [Industrial_composition_volatiles, setIndustrial_composition_volatiles] = useState('');
  const [Industrial_composition_ash, setIndustrial_composition_ash] = useState('');
  const [Industrial_composition_fixed_carbon, setIndustrial_composition_fixed_carbon] = useState('');
  const [Biochemical_composition_content_of_cellulose, setBiochemical_composition_content_of_cellulose] = useState('');
  const [Biochemical_composition_hemicellulose, setBiochemical_composition_hemicellulose] = useState('');
  const [Biochemical_composition_lignin, setBiochemical_composition_lignin] = useState('');

  const [articles_prediction, setarticles_prediction] = useState<any>(null);
  const [activation_agent, setactivation_agent] = useState('')

  const [material_predictions, setmaterial_predictions] = useState('');
  const [isotherm_type, setisotherm_type] = useState('');
  const [material_type,setmaterial_type] = useState('');

  const [show_table,setshow_table] = useState<boolean>(true)
  // --------------------
  
  const [betValue, setBetValue] = useState('');
  const [total_pore_value, setPoreVolumeValue] = useState('');
  const [micropore_value, setMicroporeValue] = useState('');

  const [X_data, setX_data] = useState('');
  const [Y_data, setY_data] = useState('');


  const [X_data_list, setX_data_list] = useState<any>(null);
  const [Y_data_list, setY_data_list] = useState<any>(null);

const [isOpen, setIsOpen] = useState<any>(false);

  const handleChange_x = (e: any) => {
    const values = e.target.value.split(",");
    setX_data(e.target.value);
    setX_data_list(values)
  };

  const handleChange_y = (e: any) => {
    const values = e.target.value.split(",");
    setY_data(e.target.value);
    setY_data_list(values)

  };


  const mock_data = () => {
    setY_data(Y_data_list_mock.toString())
    setY_data_list(Y_data_list_mock)

    setX_data(X_data_list_mock.toString())
    setX_data_list(X_data_list_mock)
  }

  // const handleChange_betValue = (e: any) => {
  //   setBetValue(e.target.value);
  // };
  // const handleChange_poreVolumeValue = (e: any) => {
  //   setPoreVolumeValue(e.target.value);
  // };
  // const handleChange_microporeValue = (e: any) => {
  //   setMicroporeValue(e.target.value);
  // };




    // POST request function
  const fetchData_with_image_post = async () => {
    try {

      if(Y_data_list == null || X_data_list == null )
      {
        alert("enter x and y data first!")
        return
      }

      if( Y_data_list.length !== X_data_list.length)
      {
        alert("X and y column dont match!")
        return
      }

       


      const data = {
        "x": X_data_list,
        "y": Y_data_list
      }

      console.log("sending:")
      console.log(data)
      const response = await fetch(env.apiUrl_reverse, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();  // Parse JSON
      // const result = await response.blob()  // Get the image as a Blob
      console.log("result:")
      console.log(result)

      // main useful adsorbent property
      setBetValue(result.isotherm_22_features[0][1])
      setPoreVolumeValue(result.isotherm_22_features[1][1])
      setMicroporeValue(result.isotherm_22_features[2][1])
      setisotherm_type(result.isotherm_type)

      // production conditions
      setActivation_time(result.isotherm_22_features[3][1])
      setActivation_temperature(result.isotherm_22_features[4][1])
      setCarbonization_temperature(result.isotherm_22_features[5][1])
      setCarbonization_time(result.isotherm_22_features[6][1])
      setHeating_rate(result.isotherm_22_features[10][1])
      setImpregnation_ratio(result.isotherm_22_features[7][1])
      setmaterial_predictions(result.material_predictions)
      setmaterial_type(result.material_type)  


      //other
      setNitrogen_doped_ratio(result.isotherm_22_features[8][1])
      setNitrogen_content(result.isotherm_22_features[9][1])


      //feedstock elemental composition 
      setElemental_composition_Carbon(result.isotherm_22_features[11][1])
      setElemental_composition_Hydrogen(result.isotherm_22_features[12][1])
      setElemental_composition_Oxygen(result.isotherm_22_features[13][1])
      setElemental_composition_Nitrogen(result.isotherm_22_features[14][1])

      //feedstock industrial composition 
      setIndustrial_composition_moisture(result.isotherm_22_features[15][1])
      setIndustrial_composition_volatiles(result.isotherm_22_features[16][1])
      setIndustrial_composition_ash(result.isotherm_22_features[17][1])
      setIndustrial_composition_fixed_carbon(result.isotherm_22_features[18][1])

      //feedstock biochemical composition 
      setBiochemical_composition_content_of_cellulose(result.isotherm_22_features[19][1])
      setBiochemical_composition_hemicellulose(result.isotherm_22_features[20][1])
      setBiochemical_composition_lignin(result.isotherm_22_features[21][1])

      setarticles_prediction(result.articles_prediction)
      setactivation_agent(result.activation_agent)

      setimageSrcPie_raw_material_composition(`data:image/png;base64,${result.pie_graph_raw_material}`);
      setimageSrc_isotherm(`data:image/png;base64,${result.image_base64}`);
      setimageSrcPie_industrial(`data:image/png;base64,${result.pie_graph_industrial_composition}`);
      setimageSrcPie_biochemical(`data:image/png;base64,${result.pie_graph_biochemical_composition}`)
      setshow_table(false)
    } catch (error: any) {
      console.error(error.message) // Handle errors
    } finally {
    }
  };


  const article_div = (index: any,prediction: any) => {
    return(
      <div>
       {index+1}. Sample <b>{prediction[0]}</b> with isotherm on graph <b>{prediction[1]}</b> in article: <b>{prediction[3]}</b>    DOI: <b><a href={prediction[2]}>{prediction[2]}</a></b>
      </div>
    )
  }





  const post_form = () => {
    return(
  <div>

        <div className="flex flex-row  ">
              <div className="m-2 rounded-xl p-2 border-2 border-gray-700 basis-2/3 ">
              <form className="max-w-sm mx-auto"> 
                        Enter isotherm data as x and y points:
                      <div className="flex flex-row">
                      <label className="flex items-center  mb-2 w-20 align-middle text-center font-medium text-gray-900 dark:text-white">x data </label>
                      <input value={X_data} onChange={handleChange_x} type="text" id="email" aria-describedby="helper-text-explanation" className="m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g.  0.142 , 0.213 , 0.314 , ... "/>
                      </div>
                      <div className="flex flex-row">
                      <label className=" flex items-center mb-2 w-20 align-middle font-medium text-gray-900 dark:text-white">y data </label>
                      <input value={Y_data}  onChange={handleChange_y} type="text" id="email" aria-describedby="helper-text-explanation" className="m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g.  142.2 , 213.1 , 314.20 , ... "/>
                      </div>
                    

                      <button onClick={fetchData_with_image_post} type="button" className="cursor-pointer m-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                      Make request
                      </button>

                    <button onClick={mock_data} type="button" className="cursor-pointer ">
                      Mock data
                      </button>
              </form>
              
              </div >

              {show_table && (X_data || Y_data) ? <table>
                  <tr>
                      <th>No</th>
                      <th>X</th>
                      <th>Y</th>
                  </tr>

                  {X_data_list.map((row: any, i: any) => (
                        <tr  key={i}>
                          <td className="p-1 border-1 border-gray-700">{i+1}</td>
                          <td className="p-1 border-1 border-gray-700">{row}</td>
                          <td className="p-1 border-1 border-gray-700">{Y_data_list ? Y_data_list[i] : null}</td>
                        </tr>
                      )) }
              </table> : <p></p>}
              

              {imageSrc_isotherm ? (<div className="flex flex-col justify-center  m-2 rounded-xl p-2 border-2 border-gray-700 basis-2/3">
                <div className="flex justify-center basis-0.5/10 mb-2  m-1 rounded-xl p-1 border-2 border-gray-700"> <b>Isotherm graph</b></div>
              <img onClick={() => setIsOpen(imageSrc_isotherm)} className="cursor-pointer w-150 border-2 rounded-xl " src={imageSrc_isotherm} alt="Model Performance Plot" />
              </div>) : (<div className="flex flex-col  m-2 rounded-xl p-2   basis-2/3"> </div>)}

              {imageSrc_isotherm ? (<div className="flex flex-col justify-center  m-2 rounded-xl p-2 border-2 border-gray-700 basis-2/3">
              <div className="flex justify-center basis-0.5/10 mb-2 m-1 rounded-xl p-1 border-2 border-gray-700"> <b>Elemental composition graph</b></div>
              <img onClick={() => setIsOpen(imageSrcPie_raw_material_composition)} className="cursor-pointer w-150 border-2 rounded-xl " src={imageSrcPie_raw_material_composition} alt="Model Performance Plot" />
              </div>) : (<div className="flex flex-col  m-2 rounded-xl p-2   basis-2/3"> </div>)}

              {imageSrc_isotherm ? (<div className="flex flex-col justify-center  m-2 rounded-xl p-2 border-2 border-gray-700 basis-2/3">
              <div className="flex justify-center basis-0.5/10 mb-2 m-1 rounded-xl p-1 border-2 border-gray-700"> <b>Industrial composition graph</b></div>
              <img onClick={() => setIsOpen(imageSrcPie_industrial)} className="cursor-pointer w-150 border-2 rounded-xl " src={imageSrcPie_industrial} alt="Model Performance Plot" />
              </div>) : (<div className="flex flex-col  m-2 rounded-xl p-2   basis-2/3"> </div>)}

              {imageSrc_isotherm ? (<div className="flex flex-col justify-center  m-2 rounded-xl p-2 border-2 border-gray-700 basis-2/3">
              <div className="flex justify-center basis-0.5/10 mb-2 m-1 rounded-xl p-1 border-2 border-gray-700"> <b>Biochemical composition graph</b></div>
              <img onClick={() => setIsOpen(imageSrcPie_biochemical)} className="cursor-pointer w-150 border-2 rounded-xl " src={imageSrcPie_biochemical} alt="Model Performance Plot" />
              </div>) : (<div className="flex flex-col  m-2 rounded-xl p-2   basis-2/3"> </div>)}

        </div>

      { Activation_temperature ? (<div className="flex flex-row  ">

                <div className="m-2 rounded-xl p-2 border-2 border-gray-700 basis-1/3 ">
                  <div className="flex justify-center basis-0.5/10  m-1 rounded-xl p-1 border-2 border-gray-700"> <b>Main adsorbent property</b></div>
                  <p>Total surface area: <b>{betValue}</b> m2/g</p>
                  <p>Total pore volume: <b>{total_pore_value}</b> cm3/g</p>
                  <p>Micropore volume: <b>{micropore_value}</b> cm3/g</p>
                  <p>Isotherm type: <b>{isotherm_type}</b></p>
                  <p>Material type: <b>{material_type}</b></p>
                  <p>Material predictions: <b> <br />1. {material_predictions[0]} <br /> 2. {material_predictions[1]} <br /> 3. {material_predictions[2]} <br /> 4. {material_predictions[3]} <br /> 5. {material_predictions[4]} </b></p>
                </div >


            <div className="m-2 rounded-xl p-2 border-2 border-gray-700 basis-1/3 ">
            <div className="flex justify-center basis-0.5/10  m-1 rounded-xl p-1 border-2 border-gray-700"> <b>Production conditions</b></div>   
                  <p>Carbonization temperature: <b>{Carbonization_temperature}</b> stC</p>
                  <p>Carbonization time: <b>{Carbonization_time}</b> h</p>
                  <p>Activation agent: <b>{activation_agent}</b> </p>
                  <p>Activation temperature: <b>{Activation_temperature}</b> stC</p>
                  <p>Activation time: <b>{Activation_time}</b> h</p>
                  <p>Heating rate: <b>{Heating_rate}</b> stC/min</p>
                  <p>Impregnation ratio: <b>{Impregnation_ratio}</b> agent/char</p>

            </div>

            <div className="m-2 rounded-xl p-2 border-2 border-gray-700 basis-1/3 ">
            <div className="flex justify-center basis-0.5/10  m-1 rounded-xl p-1 border-2 border-gray-700"> <b>Feedstock elemental composition</b></div>
              <p>Oxygen: <b>{Elemental_composition_Oxygen}</b> %</p>
              <p>Carbon: <b>{Elemental_composition_Carbon}</b> %</p>
              <p>Hydrogen: <b>{Elemental_composition_Hydrogen}</b> %</p>
              <p>Nitrogen: <b>{Elemental_composition_Nitrogen}</b> %</p>
            </div>

            <div className="m-2 rounded-xl p-2 border-2 border-gray-700 basis-1/3 ">
            <div className="flex justify-center basis-0.5/10  m-1 rounded-xl p-1 border-2 border-gray-700"> <b>Feedstock industrial composition </b></div>
              <p>Volatiles: <b>{Industrial_composition_volatiles}</b> %</p>
              <p>Fixed_carbon: <b>{Industrial_composition_fixed_carbon}</b> %</p>
              <p>Moisture: <b>{Industrial_composition_moisture}</b> %</p>
              <p>Ash: <b>{Industrial_composition_ash}</b> %</p>
            </div>

            <div className="m-2 rounded-xl p-2 border-2 border-gray-700 basis-1/3 ">
            <div className="flex justify-center basis-0.5/10  m-1 rounded-xl p-1 border-2 border-gray-700"> <b>Feedstock biochemical composition </b></div>
            <p>Lignin: <b>{Biochemical_composition_lignin}</b> %</p>            
            <p>Content_of_cellulose: <b>{Biochemical_composition_content_of_cellulose}</b> %</p>
            <p>Hemicellulose: <b>{Biochemical_composition_hemicellulose}</b> %</p>

              
              
              
            </div>
        </div>) : (<p></p>)

        
  }


  {articles_prediction ?  <div className="m-2 rounded-xl p-2 border-2 border-gray-700 basis-1/3 ">
        <div className="flex justify-center basis-0.5/10  m-1 rounded-xl p-1 border-2 border-gray-700"> <b>Samples and articles matching</b></div>
        {articles_prediction.map( (row:any, index:any) => (
          article_div(index,row)
        )

        )}
      {/* {article_div(1,articles_prediction[0])} */}
  
  
  
  
  
  
  </div>  : <p></p>}


      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <img src={isOpen} className="modal-image" />
        </div>
      )}





  </div>

      


        
    )
  }

return (
    <Base>
      <div>

        {post_form()}

        

        {/* <h1>Adsorbent tool - Home</h1>
        {data}
        <button onClick={fetchData} className=" cursor-pointer  block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
          get data
        </button> */}
      </div>
    </Base>
)
  }
  
  export default ReverseEngineering