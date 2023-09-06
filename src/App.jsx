
import { Routes, Route } from 'react-router-dom';
import { routes } from '~/routes';
import MyUserReducer from "./components/Reducers/MyUserReducer";
import { createContext, useReducer } from "react";
import cookie from 'react-cookies'


export const MyUserContext = createContext();

function App() {

    const [user, dispatch] = useReducer(MyUserReducer, cookie.load("user") || null);
    return (
      
      <>
       <MyUserContext.Provider value={[user, dispatch]}> 
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
    </MyUserContext.Provider>
      </>
    )
};

export default App;
