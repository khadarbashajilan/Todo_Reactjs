import { useRef, useState, type ReactEventHandler, type ReactHTMLElement } from 'react'
import './index.css'

function App() {

  const [tasks, setTasks] = useState<string[]>([])
  const [a,setA]= useState<string>("");

  console.log(tasks);

  const check = useRef<HTMLInputElement>(null)

  if(check.current?.firstChild?.checked){
    
    console.log(check.current.value)
  }

  function handlesubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setTasks((ele)=>[...ele, a]);
    setA("");
    console.log(tasks)
    // setTasks((ele)=>ele.push(e.target.value));
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

        {tasks.map((ele,idx)=>{
          return<>
          <p ref={check} key={idx}><input    type="checkbox" /> {ele}</p>
          </>
        })}

        {/* <div>
          <p className='p-2 m-1'><input type="checkbox"/> hi <span>x</span> </p>
          <p className='p-2 m-1'><input type="checkbox" /> hi <span>x</span> </p>
        </div> */}
      </form>
    </div>
     </div>
    </>
  )
}

export default App
