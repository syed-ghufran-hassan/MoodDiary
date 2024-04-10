"use client";
import { useState } from 'react';
import styles from '../styles/moodForm.module.css';



interface MoodFormProps {
    onSubmit: (mood: string) => void
  }
  
  const MoodForm: React.FC<MoodFormProps> = ({ onSubmit }) => {
    const [mood, setMood] = useState<string>('')
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      onSubmit(mood)
      setMood('')
    }
  
    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          How are you feeling today?
          <input 
            type="text" 
            value={mood} 
            onChange={(e) => setMood(e.target.value)} 
            required 
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    )
  }
  
  export default MoodForm