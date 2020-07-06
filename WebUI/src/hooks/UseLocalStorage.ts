import { useState } from "react";

export function useLocalStorage<T>(localStorageKey: string, defaultValue: T): [T, (newValue: T) => void] {
  const savedValue = localStorage.getItem(localStorageKey);
  const [localState, setLocalState] = useState<T>(!!savedValue ? JSON.parse(savedValue) : defaultValue);

  const saveToLocalStorage = (newValue: T) => {
    setLocalState(newValue);
    localStorage.removeItem(localStorageKey);
    localStorage.setItem(localStorageKey, JSON.stringify(newValue));
  }

  return [localState, saveToLocalStorage];
}