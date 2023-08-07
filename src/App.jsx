
import { Routes, Route } from 'react-router-dom';
import { routes } from '~/routes';

function App() {
    return (
      
      <>
      <div id="App" className="vw-100 overflow-hidden">
            <Routes>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <route.layout>
                                <route.component />
                            </route.layout>
                        }
                    />
                ))}
            </Routes>
    </div>
      </>
    )
};

export default App;
