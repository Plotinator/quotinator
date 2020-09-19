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

  const { data, sortedWorkTypes, error, isValidating, loading } = useSortedWorkTypes()

  const renderSecondRowTabs = () => {
    let tabs = [...secondaryTabs]
    if (data && sortedWorkTypes) {
      tabs = [secondaryTabs[0], secondaryTabs[1], ...sortedWorkTypes, secondaryTabs[2]]
    }
    return tabs.map(t => <div key={t.id} className={cx('category', {selected: secondaryTab == t.id})} onClick={() => setSecondaryTab(t.id)}>{t.name}</div> )
  }

  const renderFirstRowTabs = () => {
    return mainTabs.map(t => <div key={t.id} className={cx('category', {selected: category == t.id})} onClick={() => setCategory(t.id)}>{t.label}</div>)
  }

  return <Column size={10}>
    <div className='categories-wrapper'>
      { renderSecondRowTabs() }
      <div className='input-group input-inline searchInput'>
        <input className='form-input' type='text' placeholder='Search'/>
        <button className='btn btn-primary input-group-btn'>Search</button>
      </div>
    </div>
    <div className='categories-segment-wrapper'>
      <div className='categories-segment'>
        { renderFirstRowTabs() }
      </div>
    </div>
  </Column>
}