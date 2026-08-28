"use client";

import { createContext, useCallback, useContext, useState, useEffect } from "react";
// import { useObjectUrl } from "@/hooks/use-object-url";
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
  const [authLoading, setAuthLoading] = useState(true);

  const [avatarUrl, setAvatarFile] = useState("");
  const [name, setUsername] = useState("");
  const [notificationsAllRead, setNotificationsAllRead] = useState(fakeUser.notifications.allRead);
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState(fakeUser.status);
  const [clockedInAt, setClockedInAt] = useState(null);
  const [clockedOutAt, setClockedOutAt] = useState(null);
  const [currentAttendanceId, setCurrentAttendanceId] = useState(null);


  // MEMO: keep the session/user in React state, reads from that state once instead of hitting the network each time
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setAuthUser(session?.user ?? null);

      if (session?.user?.id) {
        // 1. プロフィール情報（名前・アバター画像）の取得
        const response = await supabase
          .from("users")
          .select("username, avatar_url")
          .eq("id", session.user.id);

        if (response.data && response.data.length > 0) {
          setUsername(response.data[0].username);
          
          if (response.data[0].avatar_url) {
            setAvatarFile(response.data[0].avatar_url);
          }
        }

        // 2. 投稿画像（posts）の取得（新しい順に並べる）
        const { data: postsData } = await supabase
          .from("posts")
          .select("image_url")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });

        if (postsData && postsData.length > 0) {
          // [{ image_url: "https..." }, ...] という形から ["https...", ...] という配列に変換
          const imageUrls = postsData.map(post => post.image_url);
          setPosts(imageUrls);
        } else {
          setPosts([]); // 投稿がない場合は空にする
        }

        // 3. 最新の勤怠状況を取得（退勤していない記録があるか探す）
        const { data: attendanceData } = await supabase
          .from("attendances")
          .select("id, clock_in_at, clock_out_at")
          .eq("user_id", session.user.id)
          .order("clock_in_at", { ascending: false })
          .limit(1);

        if (attendanceData && attendanceData.length > 0) {
          const latest = attendanceData[0];
          // clock_out_at が NULL なら「勤務中」
          if (!latest.clock_out_at) {
            setStatus("onDuty");
            setClockedInAt(new Date(latest.clock_in_at));
            setCurrentAttendanceId(latest.id);
          } else {
            // 退勤済みなら「未出勤」
            setStatus("offDuty");
            setClockedOutAt(new Date(latest.clock_out_at));
          }
        }
      }

      // 4. データの確認・取得が終わったらローディング状態を解除する
      setAuthLoading(false);
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



  const clockIn = useCallback(async (time) => {
    if (!authUser) return;
    
    // DBに出勤記録を新しく作る
    const { data, error } = await supabase
      .from("attendances")
      .insert({
        user_id: authUser.id,
        clock_in_at: time.toISOString(), // データベース用の時刻フォーマット
      })
      .select("id")
      .single(); // 作成した行のIDを返してもらう

    if (!error && data) {
      setCurrentAttendanceId(data.id); // IDを記憶しておく
      setStatus("onDuty");
      setClockedInAt(time);
      setClockedOutAt(null);
    } else {
      alert("出勤の打刻に失敗しました。");
    }
  }, [authUser]);

  const clockOut = useCallback(async (time) => {
    if (!authUser || !currentAttendanceId) return;

    // 出勤時に作った行の clock_out_at を更新する
    const { error } = await supabase
      .from("attendances")
      .update({
        clock_out_at: time.toISOString(),
      })
      .eq("id", currentAttendanceId);

    if (!error) {
      setStatus("offDuty");
      setClockedOutAt(time);
      setCurrentAttendanceId(null); // IDをリセット
    } else {
      alert("退勤の打刻に失敗しました。");
    }
  }, [authUser, currentAttendanceId]);

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
          notificationsAllRead,
          avatarUrl,
          posts,
          status,
          clockedInAt,
          clockedOutAt,
        },
        setAvatarFile,
        setNotificationsAllRead,
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
