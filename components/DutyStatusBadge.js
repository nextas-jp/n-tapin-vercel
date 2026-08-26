export const dutyStatusLabels = {
  offDuty: "未出勤",
  onDuty: "勤務中",
};

const statusClassNames = {
  offDuty: "offduty-state",
  onDuty: "onduty-state"
}

export default function({ status }) {
  return (
    <span
      className={`rounded-[25px] px-[16px] py-[2px] text-[14px] leading-[19px] font-medium text-white ${statusClassNames[status]}`}
    >{dutyStatusLabels[status]}</span>
  );
}
