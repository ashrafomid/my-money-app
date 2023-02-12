import React, { useState } from 'react'

export default function TransactionList({transactions}) {
  const [data, setData] = useState('')
  return (
    <div>
      <form >
        <label >
          <span className=''>name</span>

        </label>
        <label >
          <input type="text"
          onChange={(e)=>setData(e.target.value)}
          />
        </label>
      </form>
    </div>
  )
}
