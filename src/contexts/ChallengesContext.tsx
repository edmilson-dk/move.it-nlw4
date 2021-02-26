import { 
  createContext, 
  ReactNode, 
  useEffect, 
  useState 
} from 'react';
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';

interface ChallengesContextProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

interface Challenge {
  type: 'body' | 'eye',
  description: string;
  amount: number;
}

interface ChallengesContextProviderData {
  level: number;
  levelUp: () => void;
  currentExperience: number;
  challengesCompleted: number;
  startNewChallenge: () => void;
  activeChallenge: Challenge;
  resetActiveChallenge: () => void;
  experienceToNextLevel: number;
  completeChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextProviderData);

export function ChallengesContextProvider({ children, ...rest }: ChallengesContextProviderProps) {
  const [ level, setLevel ] = useState(rest.level ?? 1);
  const [ currentExperience, setCurrentExperience ] = useState(rest.currentExperience ?? 0);
  const [ challengesCompleted, setChallengesCompleted ] = useState(rest.challengesCompleted ?? 0);
  const [ activeChallenge, setActiveChallenge ] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
     if("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            Notification.requestPermission();
          }
        );
      });
    }
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('challengesCompleted', String(challengesCompleted));
    Cookies.set('currentExperience', String(currentExperience));
  }, [level, currentExperience, challengesCompleted]);

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready
        .then(registration => {
          registration.showNotification('Novo desafio!', {
            body: `Valendo ${challenge.amount}xp`,
          });
        });  
    }
  }

  function levelUp() {
    setLevel(level + 1);
  }

  function resetActiveChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) return;

    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider 
      value={{ 
        level, 
        levelUp,
        currentExperience, 
        challengesCompleted,
        startNewChallenge,
        activeChallenge,
        resetActiveChallenge,
        experienceToNextLevel,
        completeChallenge,
      }}
      >
        { children }
    </ChallengesContext.Provider>
  )
}
