import { useState } from "react";
import Base from "./Base"

function PostMan() {
  const [response_get, setResponse_get] = useState('');
  const [response_post, setResponse_post] = useState('');
  const [text, settext] = useState('');

  const [input_url_get, setInput_url_get] = useState('');
  const [input_url_post, setInput_url_post] = useState('');

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

  const fetchData_get = async () => {
    try {
      const response = await fetch(input_url_get); // Example API
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json(); // Parse JSON response
      console.log(result)
      setResponse_get(result)
    } catch (error:any) {
      console.log(error.message); // Handle errors
    } finally {
      console.log(false); // Set loading state to false after fetching data
    }
  }

  const get_form = () => {
    return(
        <div className="flex flex-row  mb-10">
            <div className="m-2 rounded-xl p-2 border-2 border-gray-700 basis-1/3 ">
                <form className="max-w-sm mx-auto"> 
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter url to make GET request</label>
                <input onChange={handleChange_get} type="text" id="email" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="type url"/>
                    <button onClick={fetchData_get} type="button" className="cursor-pointer m-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        Make request
                    </button>
                </form>
            </div >

            <div className="flex flex-col  m-2 rounded-xl p-2 border-2 border-gray-700 basis-2/3">

                <div className="basis-1/4  m-1 rounded-xl p-1 border-2 border-gray-700">
                 Adress: <i>{input_url_get}</i>
                </div>

                <div className="basis-3/4  m-1 rounded-xl p-2 border-2 border-gray-700">
                { JSON.stringify(response_get)}
                </div>


            </div>

        </div>
    )
  }



  // POST request function
  const fetchData_post = async () => {
    try {
        const requestData = JSON.parse(text);
      const response = await fetch(input_url_post, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json(); // Parse JSON response
      console.log(result);

      setResponse_post(result); // Set the response to state
    } catch (error: any) {
      console.log(error.message); // Handle errors
    } finally {
      console.log(false); // Set loading to false after the request
    }
  };


 


  const post_form = () => {
    return(
        <div className="flex flex-row  ">
            <div className="m-2 rounded-xl p-2 border-2 border-gray-700 basis-1/3 ">
                <form className="max-w-sm mx-auto"> 
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter url to make POST request ['application/json']</label>
                <input onChange={handleChange_post} type="text" id="email" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="type url"/>
                {/* <input onChange={handleChange} type="text" id="email" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="type url"/> */}

                <textarea onChange={handleChange_text} className="block mt-3 h-100 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='{ "key" : "data" }'></textarea>

                    <button onClick={fetchData_post} type="button" className="cursor-pointer m-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        Make request
                    </button>
                </form>
            </div >

            <div className="flex flex-col  m-2 rounded-xl p-2 border-2 border-gray-700 basis-2/3">

                <div className="basis-0.5/10  m-1 rounded-xl p-1 border-2 border-gray-700">
                 Adress: <i>{input_url_post}</i>
                </div>

                <div className="basis-3/10  m-1 rounded-xl p-2 border-2 border-gray-700">
                { text}
                </div>

                <div className="basis-6/10  m-1 rounded-xl p-2 border-2 border-gray-700">
                { JSON.stringify(response_post)}
                </div>


            </div>

        </div>
    )
  }

return (
    <Base>
      <div>
        {get_form()}

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
  
  export default PostMan