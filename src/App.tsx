import './App.css';
import Events from './components/events';
import Header from './components/header';
import ModalEvent from './components/modalWindow/ModalEvent';

function App() {
  return (
    <>
      <Header />
      <Events />
      <ModalEvent />
    </>
  );
}

export default App;
