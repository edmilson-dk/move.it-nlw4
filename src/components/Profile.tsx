import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengesContext);
  return (
    <div className={styles.profileContainer}>
      <img src="/profile.jpg" alt="User profile"/>
      <div>
        <strong>Edmilson Jesus</strong>
        <p>
          <img src="icons/level.svg" alt="User level"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}
