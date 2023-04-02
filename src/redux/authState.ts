import jwt_decode from "jwt-decode";

//2. ActionType create our user types. The reserved word ENUM. Impossible to be changed.
//with such a list we can activate a switch. 
export enum userRole {
  "Admin",
  "Company",
  "Customer",
  "Guest",
}

//1. AppState: create our STATE (literal object in memory)
//Variables that we want to share with the entire app
export class authState {
  userName: string = "Kill Leon";
  //userPassword: string = "";
  userRole: userRole = userRole.Guest; //We limit it. 
  //We want to give a closed list (ENUM). A series of data that is impossible to be changed.
  userToken: string = "";
}

//3. ActionType
//which command the developer can use in this state
//Options that cannot be changed, 
//through which the correct function will be activated
//To run a Function  we need 2 things - action and payload
export enum authActionType {
  UserLogin = "UserLogin",
  UserLogout = "UserLogout",
  UpdateToken = "UpdateToken",
}

//4. (3rd in theory by order ) 
//Action: create our auth action (sending the Action to the system. Composed of type and 
//PayLoad. )
export interface authAction {
  type: authActionType;
  payload?: any; //PayLoad is Optional by the sign payload?. We do not send a payload when deleting. 
}

//5. (4th theory) function to handle the state changes (DISPATCH)
//export function userLogin(userData:authState):authAction {} //userData : = of type authState : = return an action
// :authAction (actionType and the Payload)
//gives an error but we use return. 
export function userLogin(token: string):authAction {
  return { type: authActionType.UserLogin, payload: token }; //authAction made 
  //type: the action that we want to execute
  //of type authActionType. UserLogin (limit only these actions, what we do on the payLoad), 
  //payload: userData (the data itself that we transmit) 
  //of UserLogin
}

//6. user logout
export function userLogout(): authAction {
  return { type: authActionType.UserLogout, payload: null };
}

//7. update token (security token) //jwt.io
export function updateToken(token: string): authAction { 
  return { type: authActionType.UpdateToken, payload: token };
}

//8. (5th in theory by order) REDUCER :)
//The REDUCER has a fixed signature:
//the REDUCER receives 2 things:
//The Current STATE and the ACTION that we want to execute, 
//AND gives out a New STATE. 
//The REDUCER signature is this: 
//export function authReducer(currentState: , action:):authState{}
//which we complete like this:

export function authReducer(
  currentState: authState = new authState(),
  action: authAction
): authState {
  const newState = { ...currentState }; //an exact copy of the State
                                        //by using the ... (spread operator)

  //We received a PAYLOAD and with it we have to do something different
//for each payload
//10. switch and its cases
  switch (action.type) { //Action is composed of PAYLOAD and TYPE so we
    //perform the switch on the type
    case authActionType.UserLogin:

    /* 14-15. We need a server-side for this. For now we do it manually:
    Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkRhdmlkIEhhZCIsInJvbGUiOiJBZG1pbiIsInN1YiI6IjEyMzQ1Njc4OSIsImlhdCI6MTUxNjIzOTAyMn0.YyYOmuHIZHpczsETZo_7Mj994lzW4R_Eiu-ejRxKM10
    */

      var myToken = action.payload.replace("Bearer ", ""); //when receiving a token banks use 
      //13. a Bearer , which we have to replace/delete the Bearer.
      //From action.payload.replace the bearer to nothing , "". Above.  
      //Below we open the token for  us, so that we can work 
      //with it. 
      var decoded = JSON.parse(JSON.stringify(jwt_decode(myToken)));
      newState.userName = decoded.userName;
      newState.userRole = decoded.role;
      newState.userToken = action.payload;
      break;

    case authActionType.UserLogout: //11. Start with case userLogout 
                                    //empty values =""; we reset it.
      newState.userName = "Guest";
      //newState.userPassword = "";
      newState.userRole = userRole.Guest;
      newState.userToken = "";
      break;

    case authActionType.UpdateToken: //12. We want to update token
    //The token is now in the newState. 
      newState.userToken = action.payload; //
      break;
  }
//9. We return to it what we have changed because it will give an 
//error at 8.
  return newState;
  //10. In the TERMINAL use: npm install jwt-decode
}

//The secret key is only stored inside the server.

//We want to concentrate all the REDUCERS we have
//in 1 place. 
//When we go there, we can run receive each of the REDUCER`s
//data in that moment.