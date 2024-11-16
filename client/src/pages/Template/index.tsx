import React, { memo } from 'react'

import styles from './index.module.css'

const Template: React.FC = memo(() => (
  <div className={styles.container}>
  </div>
))
Template.displayName = 'Template'

export default Template
