import React, { memo } from 'react'

import styles from './index.module.css'

const Quiz: React.FC = memo(() => (
  <div className={styles.container}>
    <h1 class="text-indigo-500 text-center mt-10">What jobs you are looking for?</h1>
    <div class="mt-10">
      <button class="bg-indigo-500 text-center rounded-lg">Internship</button>
    </div>
  </div>
))
Quiz.displayName = 'Quiz'

export default Quiz
