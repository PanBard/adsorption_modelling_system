import { useState } from "react";
import Base from "./Base"
import { env } from "../env/env";
import '../css/ImageModal.css'

function Ads() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [response_get, setResponse_get] = useState('');
  const [response_post, setResponse_post] = useState('');
  const [text, settext] = useState('');
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

  const [input_url_get, setInput_url_get] = useState('');
  const [input_url_post, setInput_url_post] = useState('');

  // --------------------
  
  const [betValue, setBetValue] = useState('');
  const [total_pore_value, setPoreVolumeValue] = useState('');
  const [micropore_value, setMicroporeValue] = useState('');

  const [isOpen, setIsOpen] = useState<any>(false);


  const handleChange_betValue = (e: any) => {
    setBetValue(e.target.value);
  };
  const handleChange_poreVolumeValue = (e: any) => {
    setPoreVolumeValue(e.target.value);
  };
  const handleChange_microporeValue = (e: any) => {
    setMicroporeValue(e.target.value);
  };



  //---------------------

  // Handle input change
  const handleChange_get = (e: any) => {
    setInput_url_get(e.target.value);
  };

  const handleChange_post = (e: any) => {
    setInput_url_post(e.target.value);
  };

  const handleChange_text = (e: any) => {
    settext(e.target.value);
  };


    // POST request function
  const fetchData_with_image_post = async () => {
    setLoading(true); // Set loading to true while waiting for response
    try {
      if(betValue == '' || total_pore_value == '' || micropore_value == '')
      {
        throw new Error("The condition was not met!");
      }
      const data = {
        "bet_value": betValue,
        "total_pore_value": total_pore_value,
        "micropore_value": micropore_value
      }
      console.log("sending:")
      console.log(data)
      const response = await fetch(env.apiUrl_prediction, {
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


      setActivation_time(result.isotherm_19_features[0][1])
      setActivation_temperature(result.isotherm_19_features[1][1])
      setCarbonization_temperature(result.isotherm_19_features[2][1])
      setCarbonization_time(result.isotherm_19_features[3][1])
      setImpregnation_ratio(result.isotherm_19_features[4][1])
      setNitrogen_doped_ratio(result.isotherm_19_features[5][1])
      setNitrogen_content(result.isotherm_19_features[6][1])
      setHeating_rate(result.isotherm_19_features[7][1])

      setElemental_composition_Carbon(result.isotherm_19_features[8][1])
      setElemental_composition_Hydrogen(result.isotherm_19_features[9][1])
      setElemental_composition_Oxygen(result.isotherm_19_features[10][1])
      setElemental_composition_Nitrogen(result.isotherm_19_features[11][1])

      setIndustrial_composition_moisture(result.isotherm_19_features[12][1])
      setIndustrial_composition_volatiles(result.isotherm_19_features[13][1])
      setIndustrial_composition_ash(result.isotherm_19_features[14][1])
      setIndustrial_composition_fixed_carbon(result.isotherm_19_features[15][1])

      setBiochemical_composition_content_of_cellulose(result.isotherm_19_features[16][1])
      setBiochemical_composition_hemicellulose(result.isotherm_19_features[17][1])
      setBiochemical_composition_lignin(result.isotherm_19_features[18][1])

      setarticles_prediction(result.articles_prediction)
      setactivation_agent(result.activation_agent)

      setisotherm_type(result.isotherm_type)
      setmaterial_predictions(result.material_predictions)
      setmaterial_type(result.material_type)

      const imageUrl = `data:image/png;base64,${result.image_base64}`;
      const imageUrlPie = `data:image/png;base64,${result.pie_graph_raw_material}`;

      setimageSrcPie_raw_material_composition(imageUrlPie);
      setimageSrc_isotherm(imageUrl);
      setimageSrcPie_industrial(`data:image/png;base64,${result.pie_graph_industrial_composition}`);
      setimageSrcPie_biochemical(`data:image/png;base64,${result.pie_graph_biochemical_composition}`)

    } catch (error: any) {
      setError(error.message); // Handle errors
    } finally {
      setLoading(false); // Set loading to false after the request
    }
  };

//   const todoItems = todos.map((todo, index) =>
//   // Only do this if items have no stable IDs
//   <li key={index}>
//     {todo.text}
//   </li>
// );

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
              <div className="flex flex-row">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total surface area ({'<'}3575) [m2g-1]</label>
              <input onChange={handleChange_betValue} type="text" id="email" aria-describedby="helper-text-explanation" className="m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Surface area [m2/g]"/>
              </div>
              <div className="flex flex-row">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total pore volume ({'<'}2.5) [cm3g-1]</label>
              <input onChange={handleChange_poreVolumeValue} type="text" id="email" aria-describedby="helper-text-explanation" className="m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pore volume [cm3/g]"/>
              </div>
              <div className="flex flex-row">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Micropore volume ({'<'}1.5) [cm3g-1]</label>
              <input onChange={handleChange_microporeValue} type="text" id="email" aria-describedby="helper-text-explanation" className="m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Micropore volume [cm3/g]"/>
              </div>

              <button onClick={fetchData_with_image_post} type="button" className="cursor-pointer m-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              Make request
              </button>

              </form>
              
              </div >

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
  
  export default Ads