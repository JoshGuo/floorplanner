import SVGCanvas from './components/SVGCanvas';

const styles = {
  appContainer: {
    width: '100vw',
    height: '100vh',
    overflowY: 'hidden'
  }
}

function App() {
  return (
    <div style={styles.appContainer}>
      <SVGCanvas />
    </div>
  );
}

export default App;
