
import { ChangeEvent, useState } from 'react';
import './App.css'
import { Main } from './components/Main/Main'
import { TopBar } from './components/TopBar/TopBar'


///https://api.github.com/search/repositories?q=tetris&sort=stars&order=desc&page=5&per_page=10
function App() {
  const [title, setTitle] = useState("");
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);


  return (
    <>
     <TopBar title={title} onTitleChange={onTitleChange}/>
     <Main title={title} />
    </>
  )
}

export default App
