import React from 'react'
import ReactDOM from 'react-dom'
import '@/style/index.css'
import '@/style/box1.less'
import '@/style/box2.sass'

function App() {
  return (
    <>
      <div className='box'>hello webpack5!</div>
      <div className='box1'></div>
      <div className='box2'></div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
