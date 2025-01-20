import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8);
  const [numallowed, setnumallowed] = useState(false);
  const [character, setchar] = useState(false);
  const [password, setpassword] = useState ("");



  const passwordgen = useCallback(() => {
    let pass = "";

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numallowed) str += "0123456789";

    if (character) str += "!@#$%^&*(){}_+-"

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }
    setpassword(pass);

  }, [length, numallowed, character])




// useRef() hook

const passwordRef=useRef(null);

  const copypasswordtoclipboard = useCallback(()=>{
    
   
    passwordRef.current?.select(); 

    window.navigator.clipboard.writeText(password);

  },[password])




  useEffect(()=>{passwordgen()},[length,numallowed,character,passwordgen])
                                

  return (
    <>

      <div className='w-full h-32 max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-500 text-orange-500'>

      <h1 className='text-white text-lg text-center my-3'>Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
           value={password}
           className='outline-none w-full  px-3' 
           placeholder='password' 
           readOnly
           ref={passwordRef} // it is used to make connection btw this input feild and useRef() hook .
           />

           <button onClick={copypasswordtoclipboard} className='bg-blue-600 text-white rounded'>Copy</button>

        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
            min={8}
            max={100}
            value={length} 
            className='cursor-pointer'
            onChange={(e)=>{setlength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-2'>
            <input type="checkbox" 
                  defaultChecked={numallowed}
                  id="numberInput"
                  onChange={()=>{
                    setnumallowed((prev)=> !prev )
                  }}
                  />
                  <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className='flex items-center gap-x-2'>
            <input type="checkbox" 
                  defaultChecked={character}
                  id="characterInput"
                  onChange={()=>{
                    setchar((prev)=> !prev )
                  }}
                  />
                  <label htmlFor="characterInput">Character</label>
          </div>

        </div>
      </div>

    </>
  )
}

export default App
