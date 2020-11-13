import { useRecoilState } from 'recoil'
import cx from 'classnames'
import { selectedTopicIds } from '../../recoil/atoms'

export default function TopicsList (props) {
  const topics = props.sortedTopics
  const [selectedIds, setSelectedIds] = useRecoilState(selectedTopicIds)

  const toggleSelected = (id, selected) => {
    const ids = [...selectedIds]
    if (selected) {
      const idx = selectedIds.indexOf(id)
      ids.splice(idx, 1)
    } else {
      ids.push(id)
    }
    setSelectedIds(ids)
  }

  const renderTopics = () => {
    return topics.map(t => {
      const selected = selectedIds.includes(t.id)
      let style = {}
      if (t.color) style = {color: t.color}
      return <div key={t.id} className={cx('topic', { selected })} style={style} onClick={() => toggleSelected(t.id, selected)}>{t.name}</div>
    })
  }

  return <div className='topicsList'>
    { renderTopics() }
  </div>
}