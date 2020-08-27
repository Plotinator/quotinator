import { useState } from 'react'
import { Column } from '../spectre/Grid'
import cx from 'classnames'
import { useCollection } from '@nandorojo/swr-firestore'
import Spinner from '../spectre/Spinner'
import hardCodedUserId from '../../store/hardCodedUserId'
import { sortedWorkTypesSelector } from '../../selectors/workTypes'
import { useSortedWorkTypes } from '../../hooks/workTypes'

const tabs = ['All', 'Favorites', 'Authors', 'Works', 'Characters', 'Uncategorized']

export default function CategoriesWrapper (props) {
  const [currentTab, changeTab] = useState(0)

  const { data, sortedWorkTypes, error, isValidating, loading } = useSortedWorkTypes()


  const renderSecondRowTabs = () => {
    if (currentTab != 3) return <div className='category'>[some recents]</div>

    if (data && sortedWorkTypes) {
      return sortedWorkTypes.map(t => {
        return <div key={t.id} className='category'>{t.name}</div>
      })
    } else if (isValidating || loading) {
      return <Spinner large/>
    } else if (error) {
      return <div>Error! {error}</div>
    }
  }

  const renderFirstRowTabs = () => {
    return tabs.map((t, idx) => <div key={idx} className={cx('category', {selected: currentTab == idx})} onClick={() => changeTab(idx)}>{t}</div>)
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