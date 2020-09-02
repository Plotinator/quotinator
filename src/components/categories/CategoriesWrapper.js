import { useState, useEffect } from 'react'
import { selectedCategory } from '../../recoil/atoms'
import { useRecoilState } from 'recoil'
import { Column } from '../spectre/Grid'
import cx from 'classnames'
import Spinner from '../spectre/Spinner'
import { useSortedWorkTypes } from '../../hooks/workTypes'
import { filterMap } from '../../utils/filter_mapping'
import { mainTabs, secondaryTabs } from '../../utils/tabs'

export default function CategoriesWrapper (props) {
  const [currentTab, changeTab] = useState(1)
  const [category, setCategory] = useRecoilState(selectedCategory)

  const { data, sortedWorkTypes, error, isValidating, loading } = useSortedWorkTypes()

  useEffect(() => {
    setCategory(mainTabs[currentTab].func)
  }, [currentTab])

  const renderSecondRowTabs = () => {
    let tabs = [...secondaryTabs]
    if (data && sortedWorkTypes) {
      tabs = [secondaryTabs[0], ...sortedWorkTypes, secondaryTabs[1]]
    }
    return tabs.map(t => {
      return <div key={t.id} className='category'>{t.name}</div>
    })
  }

  const renderFirstRowTabs = () => {
    return mainTabs.map((t, idx) => <div key={idx} className={cx('category', {selected: currentTab == idx})} onClick={() => changeTab(idx)}>{t.label}</div>)
  }

  return <Column size={10}>
    <div className='categoriesWrapper'>
      { renderFirstRowTabs() }
      <div className='input-group input-inline searchInput'>
        <input className='form-input' type='text' placeholder='Search'/>
        <button className='btn btn-primary input-group-btn'>Search</button>
      </div>
    </div>
    <div className='categoriesWrapper secondRow'>
      { renderSecondRowTabs() }
    </div>
  </Column>
}