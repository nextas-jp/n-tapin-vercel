"use client";

import { PageHeader } from "@/components/PageHeader";
import { dutyStatusLabels } from "@/components/DutyStatusBadge";
import { useCurrentMinute } from "@/hooks/use-realtime";
import { useUser } from "../user-context";

function formatDate(date) {
  if (!date) {
    return "----年--月--日";
  }

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}年${month}月${day}日`;
}

function formatTime(date) {
  if (!date) {
    return "-- : --";
  }

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours} : ${minutes}`;
}

export default function Attendance() {
  const now = useCurrentMinute();
  const { user, clockIn, clockOut, addPost } = useUser();

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
          </div>
        </div>
      </section>
    </>
  );
}