import React, { useEffect, useRef, useState } from 'react'

const App = () => {
  const [data, setdata] = useState([])
  const [view, setview] = useState({})
  const [index, setindex] = useState()
  const fname = useRef()
  const lname = useRef()

  const arr = JSON.parse(localStorage.getItem("detail")) || []

  useEffect(() => {
    setdata([...arr])
  }, [])

  const submit_handler = () => {
    const input = {
      fname: fname.current.value,
      lname: lname.current.value,
    }
    arr.push(input)
    setdata([...arr])
    localStorage.setItem("detail", JSON.stringify(arr))
  }

  const delete_handler = (ind) => {
    arr.splice(ind, 1)
    localStorage.setItem("detail", JSON.stringify(arr))
    setdata([...arr])
  }

  const view_handler = (v, i) => {
    setindex(i)
    setview(v)
    console.log(view);
  }

  const update_input = (e) => {
    setview({ ...view, [e.target.name]: e.target.value })
  }

  const update_handler = () => {
    arr.splice(index, 1, view)
    localStorage.setItem("detail", JSON.stringify(arr))
    setdata([...arr])
  }

  return (
    <>
      <div>
        <input type="text" name='fname' ref={fname} />
        <input type="text" name='lname' ref={lname} />
        <button type='button' onClick={submit_handler}>Submit</button>
      </div>
      <div>
        <input type="text" value={view.fname} onChange={update_input} name='fname' />
        <input type="text" value={view.lname} onChange={update_input} name='lname' />
        <button type='button' onClick={update_handler}>Save</button>
      </div>
      {data?.map((v, i) => {
        return (
          <>
            <h1>{v.fname}</h1>
            <h2>{v.lname}</h2>
            <button type='button' onClick={() => { delete_handler(i) }}>Delete</button>
            <button type='button' onClick={() => { view_handler(v, i) }}>Update</button>
          </>
        )
      })}
    </>
  )
}

export default App