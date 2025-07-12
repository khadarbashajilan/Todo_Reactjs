import { useEffect, useRef, useState, type ReactEventHandler, type ReactHTMLElement } from 'react'
import './index.css'

function App() {

  const [tasks, setTasks] = useState<string[]>([])
  const [a,setA]= useState<string>("");
  const [linethrough, islinethrough]=useState<boolean[]>([]);

  const check = useRef<HTMLInputElement>(null)
  const para = useRef<HTMLInputElement>(null)
  const rem = useRef<HTMLButtonElement>(null)


  function line_through(idx:number){
    // islinethrough((e)=>[...e.idx,!e.b]);
    islinethrough(linethrough[idx] = true)
    console.log(para.current?.attributes)
  }

  function removeParent(){
    console.log(rem.current?.parentElement);
    rem.current?.parentElement?.remove();
  }

  function handlesubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setTasks((ele)=>[...ele, a]);
    setA("");
  }
  return (
    <>
    <div className='flex h-screen w-full items-center justify-center'>
     <div className='bg-red-200 gap-4 flex flex-col'>
      <h1 className='text-3xl font-medium'>Todo</h1>
      <form onSubmit={(e)=>handlesubmit(e)} className='flex flex-col'>
        <div>
        <input type="text" placeholder='Add tasks' onChange={(e)=>setA(e.target.value)}/>
        <button type="submit" className='border p-2'>Add</button>
        </div>
        {
          tasks.map((ele,idx)=>{
            return<div key={idx} className='flex gap-3'>
            <input ref={check} onChange={()=>line_through(idx)} type="checkbox" /><p ref={para} key={idx} style={{textDecoration:linethrough[idx]?"line-through":"none"}}> {ele}</p>
            <button ref={rem} onClick={()=>removeParent} type='button'>x</button>
            </div>
          })
        }
      </form>
    </div>
     </div>
    </>
  )
}

export default App
