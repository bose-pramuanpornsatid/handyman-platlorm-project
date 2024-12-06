import React, { memo } from 'react'

import styles from './index.module.css'
import QuizCard from './QuizCard'

const Quiz: React.FC = memo(() => (
  <div className={styles.container}>
    <QuizCard/>
  </div>
))
Quiz.displayName = 'Quiz'

export default Quiz
