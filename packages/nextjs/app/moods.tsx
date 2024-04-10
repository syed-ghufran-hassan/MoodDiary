import React, { useState } from 'react'
import Format from '../components/Format'

const MoodsPage: React.FC = () => {
  const [moods] = useState<string[]>([]) // Get moods from database or API

  return (
    <Format>
      <h2>Previous Moods</h2>
      <ul>
        {moods.map((mood, index) => (
          <li key={index}>{mood}</li>
        ))}
      </ul>
    </Format>
  )
}

export default MoodsPage
