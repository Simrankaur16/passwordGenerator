import { useState, useCallback , useEffect, useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numAllowled, setNumAllow] = useState(false)
  const [charAllowed, setCharAllwo] = useState(false)

  const [password, setPassword] = useState("")

  //useref hook
  const passwordRef = useRef(null)


  const passwordGenerator  = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwzyz"
    if(numAllowled) str += "0123456789"
    if(charAllowed) str += "!@#$%%&*{[]}"


    for (let i = 1; i <= length; i++) {
      let char = Math.floor (Math.random()*str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  } , [length, numAllowled, charAllowed, setPassword])

   const copyPasswordToClip = useCallback(()=> {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,300);
    window.navigator.clipboard.writeText(password)

   }, [password])


useEffect(() => {
  passwordGenerator()
}, [length, numAllowled, charAllowed, passwordGenerator])
  return (
    <>
      <h1 className='text-4xl text-red-200 text-center m-10 '>Password generator</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-white  bg-slate-700  mt-3'>
        <div className='flex mt-3'>
        <input type="text" value={password} className='outline-none w-full py-1 px-3 m-3 text-black' placeholder='password' readOnly ref={passwordRef} />

        <button onClick={copyPasswordToClip} className='outline-none bg-blue-400 px-3 py-0.5 shrink-0 m-3'>
          Copy</button>
          </div>

        <div className='flex text-sm gap-x-5 mt-4 pb-3'>
          <div className='flex items-center gap-x-1'>
            <input type='range' min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}}  /> 
            <label>Length: {length}</label>

          </div>
          <div className='flex items-center gap-x-1 '>
            <input type="checkbox"
             defaultChecked = {numAllowled}
             id='numberInput'
             onChange={() =>{setNumAllow((prev)=> !prev)}} />
             <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1 '>
            <input type="checkbox"
             defaultChecked = {charAllowed}
             id='charInput'
             onChange={() =>{setCharAllwo((prev)=> !prev)}} />
              <label htmlFor="charInput">Characters</label>
          </div>
         
        </div>

      </div>
    </>
  )
}

export default App
