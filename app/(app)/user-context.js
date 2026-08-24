"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { useObjectUrl } from "@/hooks/use-object-url";
import { default as fakeUser } from "@/utils/dummydata/user";

const UserContext = createContext(null);

// MEMO:
// Holds the signed-in user for the whole app (after being logged): 
// プロフィール編集 changes the name
// and photo that ホーム shows, 新規投稿 adds to its photo grid, and 出勤打刻 / 退勤打刻 set the work status. It all resets on reload until there is an API.
export function UserProvider({ children }) {
  const [name, setName] = useState(fakeUser.name);
  const [avatarUrl, setAvatarFile] = useObjectUrl(fakeUser.avatarUrl);
  const [posts, setPosts] = useState(fakeUser.posts);
  const [status, setStatus] = useState(fakeUser.status);
  const [clockedInAt, setClockedInAt] = useState(null);
  const [clockedOutAt, setClockedOutAt] = useState(null);

  const clockIn = useCallback((time) => {
    setStatus("onDuty");
    setClockedInAt(time);
    setClockedOutAt(null);
  }, []);

  const clockOut = useCallback((time) => {
    setStatus("offDuty");
    setClockedOutAt(time);
  }, []);

  const addPost = useCallback((postPhotoUrl) => {
    setPosts((current) => [
      { id: String(Date.now()), photoUrl: postPhotoUrl },
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
        setName,
        setAvatarFile,
        addPost,
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
