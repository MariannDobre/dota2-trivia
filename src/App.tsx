import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import LevelSelection from './pages/levelSelection';
import Levels from './pages/levels/levels';
import FinishScreen from './pages/finishScreen';
import PageNotFound from './pages/404';

function App(): React.ReactElement {
  const [startTheLevel, setStartTheLevel] = useState<boolean>(false);
  const [userPoints, setUserPoints] = useState<number>(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<Home />}
        />

        <Route
          path='*'
          element={<PageNotFound />}
        />

        <Route
          path='/select-level'
          element={
            <LevelSelection
              startTheLevel={startTheLevel}
              setStartTheLevel={setStartTheLevel}
            />
          }
        >
          <Route
            path='/select-level/:levelName'
            element={
              <Levels
                startTheLevel={startTheLevel}
                setStartTheLevel={setStartTheLevel}
                userPoints={userPoints}
                setUserPoints={setUserPoints}
              />
            }
          />

          <Route
            path='/select-level/:levelName/results'
            element={
              <FinishScreen
                userPoints={userPoints}
                setUserPoints={setUserPoints}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
