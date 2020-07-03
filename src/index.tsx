import React from 'react'
import { render } from 'react-dom'
import styles from './style/style.module.styl'
import DashBoard from '@/containers/DashBoard'
const url = require('@/assets/nezha.jpg')

function Main () {
  return (
    <div
      className={styles.box}
      style={{ color: 'red' }}
    >
      <div style={{ width: '200px' }} >
        <img src={ url } width={ 200 } />
        <div style={{ textAlign: 'center' }}><span>我命由我不由天</span></div>
      </div>
    </div>
  )
}
render(
  <Main />,
  document.getElementById('app')
)
