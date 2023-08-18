import Multiple from "./Multiple";
import AuthProvider from './AuthProvider.js'; // Import your AuthProvider

function App() {
  return (
    <>
      <AuthProvider>
        <Multiple />
      </AuthProvider>
    </>

  );
}

export default App;
