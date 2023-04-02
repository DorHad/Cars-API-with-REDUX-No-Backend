import { useEffect, useState } from "react";
import { userLogout } from "../../../redux/authState";
import { store } from "../../../redux/store";
import "./Header.css";

function Header(): JSX.Element {
  const [userTime, setTime] = useState(new Date().toLocaleTimeString());
  const [stam, setStam] = useState(false);
  const [user, setUser] = useState(store.getState().authState.userName);
  useEffect(() => {
    const timeRunner = setInterval(() => {
      const myTime = new Date().toLocaleTimeString();
      //console.log(myTime)
    }, 1000);
  }, []);


/* const makeLogout = () => {
  console.log("Logged out!");
  store.dispatch(userLogout()); //optional to transmit data
  setStam(true); 

}; */

//the store is where we have all the 
// REDUCERS concentrated in 1 place. 
//Subscribe to connect between the session items 
//Kill Leon and the central titles to be similar with it

  store.subscribe(() => {
    setUser(store.getState().authState.userName);
  });

  return (
    <div className="Header">
      <h1>My Car Locator System</h1>
      {/*<h1>{userTime}</h1>*/}
      <h1>Hello {store.getState().authState.userName} </h1>
    </div>
  );
}

export default Header;
