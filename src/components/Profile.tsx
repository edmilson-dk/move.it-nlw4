import styles from '../styles/components/Profile.module.css';

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="/profile.jpg" alt="User profile"/>
      <div>
        <strong>Edmilson Jesus</strong>
        <p>
          <img src="icons/level.svg" alt="User level"/>
          Level 1
        </p>
      </div>
    </div>
  )
}
