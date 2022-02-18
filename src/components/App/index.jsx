import { useState, useEffect } from 'react'

import Header from '../Header';
import InputField from '../InputField/index';
import TasksArea from '../TasksArea/index';
import EmptyTasks from '../EmptyTasks/index';

import { TasksProvider } from '../../context/tasksContext';

import {
  getFromLocalStorage,
  saveTheme,
  getTheme
} from '../../utils/localStorage'

import './style.css'

function App() {
  const [theme, setTheme] = useState(getTheme())
  const [todos, setTodos] = useState(getFromLocalStorage('todos'))

  const transformKey = key => '--' + key.replace(/([A-Z])/, '-$1').toLowerCase()

  const handleImageClick = () => {
    switch (theme) {
      case 'dark':
        setTheme('light')
        break;
    
      case 'light':
        setTheme('dark')
        break

      default:
        setTheme('light')
    }
  }

  useEffect(() => {
    const darkTheme = {
      bgColor: '#464646',
      textColor: '#FFF'
    }
  
    const lightTheme = {
      bgColor: '#F8F8F9',
      textColor: '#000'
    }
    
    const toggleTheme = themeObject => {
      const root = document.querySelector(':root')
  
      Object.keys(themeObject).forEach(key => {
        root.style.setProperty(transformKey(key), themeObject[key])
      })
    }

    saveTheme(theme)
    
    theme === 'light'
      ? toggleTheme(lightTheme)
      : toggleTheme(darkTheme)
  }, [theme])

  return (
    <>
      <Header
        handleImageClick={handleImageClick}
        theme={theme}
      />

      <InputField
        todos={todos}
        setTodos={setTodos}
      />

      {
        todos.length === 0
          ? <EmptyTasks />
          : <TasksProvider value={{ todos, setTodos }}>
              <TasksArea />
            </TasksProvider>
      }
    </>
  )
}

export default App