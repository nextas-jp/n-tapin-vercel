"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { dutyStatusLabels } from "@/components/DutyStatusBadge";
import { useCurrentMinute } from "@/hooks/use-realtime";
import { formatDate, formatTime } from "@/utils/misc/format";
import { useUser } from "../user-context";
import ClockActions from "@/components/ClockActions";

export default function Attendance() {
  const router = useRouter();
  const now = useCurrentMinute();
  const { user, clockIn, clockOut, addPost } = useUser();
  const [justClockedIn, setJustClockedIn] = useState(false);
  const [justClockedOut, setJustClockedOut] = useState(false);

  const onDuty = user.status === "onDuty";

  function handleGoHome(event) {
    event.preventDefault();
    
    router.push('/dashboard');
  }

  function handleSkip() {

  }

  function handleClockIn() {
    clockIn(new Date());
    setJustClockedIn(true);
  }

  function handleClockOut() {
    clockOut(new Date());
    setJustClockedOut(true);
  }

  return (
    <>
      <PageHeader
        backLinkUrl="/dashboard"
        title="出勤打刻"
      />

      <section className="relative">
        <div className="card-element flex flex-col gap-[32px]">
          <div className="flex flex-col items-center gap-[8px]">
            <div className="flex flex-col items-center">
              <p className="text-[18px] leading-[24px]">{formatDate(now)}</p>
              <p className="text-[56px] leading-[77px] font-bold">{formatTime(now)}</p>
            </div>
            <p className="text-[20px] leading-[27px] font-semibold">
              {dutyStatusLabels[user.status]}
            </p>


            <div className="relative flex flex-col gap-[10px] w-full">
              <ClockActions
                onDuty={onDuty}
                justClockedIn={justClockedIn}
                justClockedOut={justClockedOut}
                clockedInAt={user.clockedInAt}
                clockedOutAt={user.clockedOutAt}
                onClockIn={handleClockIn}
                onClockOut={handleClockOut}
                onSkip={handleSkip}
                onGoHome={handleGoHome}
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
