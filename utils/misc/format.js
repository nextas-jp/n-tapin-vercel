/**
 * Format date
 * @param {*} date 
 * @returns 
 */
export function formatDate(date) {
  if (!date) {
    return "----年--月--日";
  }

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return (
    <>
      {date.getFullYear()}
      <span className="text-[16px]">年</span>
      {month}
      <span className="text-[16px]">月</span>
      {day}
      <span className="text-[16px]">日</span>
    </>
  );
}

/**
 * Format Time
 * @param {*} date 
 * @returns 
 */
export function formatTime(date) {
  if (!date) {
    return "-- : --";
  }

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours} : ${minutes}`;
}
