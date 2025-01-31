export const formatTimeDifference = (uploadedTime: number) => {
  const now = new Date().getTime();
  const uploadedDate = new Date(uploadedTime);
  const past = new Date(uploadedTime).getTime();

  const diffInMs = now - past;
  const diffInMinutes = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMs / 3600000);
  const diffInDays = Math.floor(diffInMs / 86400000);

  if (diffInMinutes < 1) {
    return "방금 전";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else {
    const year = uploadedDate.getFullYear();
    const month = String(uploadedDate.getMonth() + 1).padStart(2, "0");
    const day = String(uploadedDate.getDate()).padStart(2, "0");
    return `${year % 100}/${month}`;
  }
};
