import React, { useState, createContext, useEffect} from "react";
// import fakeAuth from "../fakeAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContextInterface, AuthToken } from "../types/interfaces";
// import { getUsers } from "../api/supabase-db";
// import { supabase } from "../supabaseClient";

export const AuthContext = createContext<AuthContextInterface | null>(null);

const AuthContextProvider:React.FC<React.PropsWithChildren> = (props) => {
  const [token, setToken] = useState<AuthToken|null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // NOTE: The below is unused. Had implemented a means of 
  // const [users, setUsers] = useState<User[]>([]);

  // // Function that queries the DB for users and assigns them to 'users'
  // const loadUsers = async  () => {
  //  await getUsers().then(x => {
  //     let tempArray: User[] = [];
  //     x.forEach(x => {
  //         let temp: User = {firstName: "", email: "", password: ""};
  //         temp.firstName = x.firstName;
  //         temp.lastName = x.lastName;
  //         temp.email = x.email;
  //         temp.password = x.password;
  //         tempArray.push(temp);
  //       });
  //     console.log(`tempArray: ${tempArray}`);
  //     setUsers(tempArray);
  //   })
  // }

  // // loads initial users (once only)
  // useEffect(() => { loadUsers(); }, []);

  // // subscribes to the users db channel and re-loads users if there's any db change
  // supabase.channel('table_db_changes').on('postgres_changes',
  //   { event: '*', schema: 'public', table: 'users' },
  //   () => { loadUsers(); }).subscribe();

  const authenticate = async (token: AuthToken) => {
    // const token = await fakeAuth(username, password);
    setToken(token);
    const origin = location.state?.intent?.pathname || "/";
    navigate(origin);
  };
  
  const signout = () => {
    setToken(null);
    navigate('/')
  };

  // console.log(`users: ${users}`);

  return (
    <AuthContext.Provider
      value={{
        token,
        authenticate,
        signout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
