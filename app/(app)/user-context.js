"use client";

import { createContext, useCallback, useContext, useState, useEffect } from "react";
import { useObjectUrl } from "@/hooks/use-object-url";
import { default as fakeUser } from "@/utils/dummydata/user";
import { createBrowserClient } from "@/utils/supabase/client";

const UserContext = createContext(null);
const supabase = createBrowserClient(); //MEMO: init Supabase

// MEMO:
// Holds the signed-in user for the whole app (after being logged): 
// プロフィール編集 changes the name
// and photo that ホーム shows, 新規投稿 adds to its photo grid, and 出勤打刻 / 退勤打刻 set the work status. It all resets on reload until there is an API.
export function UserProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  // const [authLoading, setAuthLoading] = useState(true); // MEMO: Redo login implementation whith this??

  const [name, setUsername] = useState(fakeUser.name);
  const [avatarUrl, setAvatarFile] = useObjectUrl(fakeUser.avatarUrl);
  const [posts, setPosts] = useState(fakeUser.posts);
  const [status, setStatus] = useState(fakeUser.status);
  const [clockedInAt, setClockedInAt] = useState(null);
  const [clockedOutAt, setClockedOutAt] = useState(null);


  // MEMO: keep the session/user in React state, reads from that state once instead of hitting the network each time
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setAuthUser(session?.user ?? null);
      // setAuthLoading(false);
      // console.log(session?.user); // DEBUG

      //FIXME SET CORRECT username from Supabase but VERY EXPIREMTAL
      const response = await readUserDataFromDB("username", session?.user.id);
      if (response.data) setUsername(response.data[0].username);
    });


    

    return () => subscription.unsubscribe();
  }, []);


  const readUserDataFromDB = useCallback(async (key, id) => {
    // if (!authUser) {
    //   console.log("No authenticated user — please sign in again");
    //   // supabase.auth.signOut(); // Force a Supabase signout
    //   // window.location = '/'; // Full redirect/reload to safely logout
    //   // return;
    // }
    
    const value = await supabase
      .from("users")
      .select(key)
      .eq("id", id);

    return value;
  }, [authUser]);

  
  const saveUserDataToDB = useCallback(async (key, value) => {
     if (!authUser) {
      console.log("No authenticated user — please sign in again");
      supabase.auth.signOut(); // Force a Supabase signout
      window.location = '/'; // Full redirect/reload to safely logout
      return;
    }

    const { error } = await supabase
      .from("users")
      .update({ [key]: value })
      .eq("id", authUser.id);

    if (error) {
      console.log(error);
    } else {
      // setUsername(d.name); //MEMO: if desync do the state changes like this?
    }
  }, [authUser]);



  const clockIn = useCallback(time => {
    setStatus("onDuty");
    setClockedInAt(time);
    setClockedOutAt(null);
  }, []);

  const clockOut = useCallback(time => {
    setStatus("offDuty");
    setClockedOutAt(time);
  }, []);

  const addPost = useCallback(postPhotoUrl => {
    // setPosts((current) => [
    //   { id: String(Date.now()), photoUrl: postPhotoUrl },
    //   ...current,
    // ]); //MEMO if an key is needed later
    setPosts((current) => [
      postPhotoUrl,
      ...current,
    ]);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: {
          ...fakeUser,
          name,
          avatarUrl,
          posts,
          status,
          clockedInAt,
          clockedOutAt,
        },
        setAvatarFile,
        setUsername,
        addPost,
        saveUserDataToDB,
        readUserDataFromDB,
        clockIn,
        clockOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
