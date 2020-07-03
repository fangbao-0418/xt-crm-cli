import React from 'react'
import { render } from 'react-dom'
import styles from './style/style.module'
const styles2 = require('./style/style.module')
const styles3 = require('@/style/app.m')
// console.log(styles, 'styles')
console.log(styles, styles2, styles3, 'css')
function Main () {
  return (
    <div
      // className={app.box}
      style={{ color: 'red' }}
    >
      <div style={{ width: '200px' }}>
        <img
          src={require('./assets/nezha.jpg')}
          width={ 200 }
        />
        <div style={{ textAlign: 'center' }}><span>我命由我不由天</span></div>
      </div>
    </div>
  )
}
render(
  <Main />,
  document.getElementById('app')
)
