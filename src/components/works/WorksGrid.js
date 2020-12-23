import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { selectedSecondaryTab } from '../../recoil/atoms'
import CardGrid from '../cards/CardGrid'
import Work from './Work'
import { useWorkIdsOfWorkType } from '../../hooks/works'
import WorkDetails from './WorkDetails'
import { useFilterAndGroupQuotes } from '../../hooks/common'

export default function WorksGrid (props) {
  const { quotes } = props
  const secondaryTab = useRecoilValue(selectedSecondaryTab)
  const works = useWorkIdsOfWorkType(secondaryTab)
  const [showDetailsId, setShowDetails] = useState(null)
  const groupedQuotes = useFilterAndGroupQuotes(quotes, 'workType')

  console.log('WorksGrid', secondaryTab, works, groupedQuotes)

  const showDetails = (id) => setShowDetails(id)

  if (showDetailsId) {
    return <WorkDetails workId={showDetailsId} quotes={groupedQuotes[showDetailsId]} goBack={() => setShowDetails(null)}/>
  } else {
    return <CardGrid items={works} renderItem={w => <Work key={w.id} work={w} showDetails={showDetails} />} />
  }
}
