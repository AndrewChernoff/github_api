
import './App.css'
import { Main } from './components/Main/Main'
import { TopBar } from './components/TopBar/TopBar'


///https://api.github.com/search/repositories?q=tetris&sort=stars&order=desc&page=5&per_page=10
function App() {

  return (
    <>
     <TopBar />
     <Main />
    </>
  )
}

export default App
