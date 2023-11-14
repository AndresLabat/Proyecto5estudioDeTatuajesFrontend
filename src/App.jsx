import './App.css';
import { MantineProvider } from '@mantine/core';
import { Header } from './common/Header/Header';
import { Body } from './pages/Body/Body';

function App() {
  return (
    <>
    <MantineProvider>
        <Header />
        <Body />
    </MantineProvider>
      </>
  );
}

export default App;