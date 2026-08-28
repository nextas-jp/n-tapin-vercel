"use client";

import { useRef } from "react";

import { SecondaryButton } from "@/components/Buttons";
import { formatTime } from "@/utils/misc/format";

export default function ClockActions({
  onDuty,
  justClockedIn,
  justClockedOut,
  clockedInAt,
  clockedOutAt,
  onClockIn,
  onClockOut,
  onSkip, // for the take photo step (currently canceled)
  onGoHome,
}) {

  const inputRef = useRef(null);

  //TODO: camera test (if still needed?)
  const handleCameraClick = () => {
    inputRef.current?.click();

    console.log("Camera button clicked");
    
  };

  //TODO: camera test (if still needed?)
  const handlePhotoSelected = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    console.log(file);
  };

  //TODO: camera test (if still needed?)
  <input
    ref={inputRef}
    type="file"
    accept="image/*"
    capture="environment"
    // capture="user"
    className="hidden"
    onChange={handlePhotoSelected}
  />

  if (justClockedOut) {
    return (
      <>
        <p className="flex h-[86px] w-full items-center justify-center rounded-[15px] border-offduty py-6 px-0 text-[28px] leading-[38px] font-bold">
          <span className="bg-clip-text text-transparent text-offduty">{formatTime(clockedOutAt)} 退勤</span>
        </p>
        <SecondaryButton
          type="button"
          onClick={ e => onGoHome(e) }
        >ホームへ戻る</SecondaryButton>
        <SecondaryButton
          type="button"
          onClick={handleCameraClick} //TODO: camera test (if still needed?)
        >写真を撮る</SecondaryButton>
      </>
    );
  }

  if (justClockedIn) {
    return (
      <>
        <p className="flex h-[86px] w-full items-center justify-center rounded-[15px] border-onduty py-6 px-0 text-[28px] leading-[38px] font-bold">
          <span className="bg-clip-text text-transparent text-onduty">{formatTime(clockedInAt)} 出勤</span>
        </p>
        <SecondaryButton
          type="button"
          onClick={ e => onGoHome(e) }
        >ホームへ戻る</SecondaryButton>
      </>
    );
  }

  // 退勤（退勤ボタン）
  if (onDuty) {
    return (
      <button
        type="button"
        onClick={onClockOut}
        className="flex h-[86px] w-full items-center justify-center rounded-[15px] off-duty-gradient shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] text-white text-[28px] leading-[38px] font-bold"
      >退勤する</button>
    );
  }

  // 出勤（出勤ボタン）
  return (
    <button
      type="button"
      onClick={onClockIn}
      className="flex h-[86px] w-full items-center justify-center rounded-[15px] on-duty-gradient shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] text-[28px] leading-[38px] font-bold"
    >出勤する</button>
  );
}