
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Editor from './components/Editor';

const App: React.FC = () => {
  const [showTool, setShowTool] = useState(false);

  return (
    <div className="min-h-screen">
      {showTool ? (
        <Editor />
      ) : (
        <LandingPage onStart={() => setShowTool(true)} />
      )}
    </div>
  );
};

export default App;
