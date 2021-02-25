import { createContext, ReactNode, useState } from 'react';

import challenges from '../../challenges.json';

interface ChallengesContextProviderProps {
  children: ReactNode
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

export function ChallengesContextProvider({children}: ChallengesContextProviderProps) {
  const [ level, setLevel ] = useState(1);
  const [ currentExperience, setCurrentExperience ] = useState(0);
  const [ challengesCompleted, setChallengesCompleted ] = useState(0);
  const [ activeChallenge, setActiveChallenge ] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
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
