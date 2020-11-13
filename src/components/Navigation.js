import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { selectedCategory, selectedSecondaryTab } from '../recoil/atoms'
import { Column } from './spectre/Grid'
import cx from 'classnames'
import { useSortedWorkTypes } from '../hooks/workTypes'
import { mainTabs, secondaryTabs } from '../utils/tabs'

export default function Navigation (props) {
  const [category, setCategory] = useRecoilState(selectedCategory)
  const [secondaryTab, setSecondaryTab] = useRecoilState(selectedSecondaryTab)

  const renderCategoryChooser = () => {
    return secondaryTabs.map(t => <div key={t.id} className={cx('category', {selected: secondaryTab == t.id})} onClick={() => setSecondaryTab(t.id)}>{t.name}</div> )
  }

  const renderFilterChooser = () => {
    return mainTabs.map(t => <div key={t.id} className={cx('category', {selected: category == t.id})} onClick={() => setCategory(t.id)}><div>{t.label}</div></div>)
  }

  return <Column size={10}>
    <div className='categories-wrapper'>
      { renderCategoryChooser() }
      <div className='input-group input-inline searchInput'>
        <input className='form-input' type='text' placeholder='Search'/>
        <button className='btn btn-primary input-group-btn'>Search</button>
      </div>
    </div>
    <div className='categories-segment-wrapper'>
      <div className='categories-segment'>
        { renderFilterChooser() }
      </div>
    </div>
  </Column>
}