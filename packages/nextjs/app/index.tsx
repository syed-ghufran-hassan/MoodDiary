import React, { useState } from 'react'
import MoodForm from '../components/MoodForm'
import Format from '../components/Format'

const HomePage: React.FC = () => {
  const [moods, setMoods] = useState<string[]>([])

  const addMood = (mood: string) => {
    setMoods([...moods, mood])
  }

  return (
    <Format>
      <h2>Today's Mood</h2>
      <MoodForm onSubmit={addMood} />
    </Format>
  )
}

export default HomePage
