import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
  const { activeChallenge, resetActiveChallenge, completeChallenge } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext);

  function handlerChallengeSucceded() {
    completeChallenge();
    resetCountdown();
  }

  function handlerChallengeFaild() {
    resetActiveChallenge();
    resetCountdown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeBoxActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`}/>
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeBoxFailedButton}
              onClick={handlerChallengeFaild}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeBoxSuccededButton}
              onClick={handlerChallengeSucceded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeBoxNotActive}>
          <strong>
            Finalize um ciclo para receber um desafio!
          </strong>
          <p>
            <img src="icons/level-up.svg" alt="User level up" />
            Avance de level, completando desafios.
          </p>
        </div>
      )}
    </div>
  )}
