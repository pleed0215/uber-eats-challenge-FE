export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const timeSince = (date: Date) => {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

export const secondsToTime = (seconds: number) => {
  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

const softBgColors = [
  "bg-yellow-200",
  "bg-red-500",
  "bg-green-100",
  "bg-blue-200",
  "bg-indigo-100",
  "bg-purple-50",
  "bg-pink-300",
];

export function getRandomSoftBgColor() {
  const length = softBgColors.length;
  const randomIndex = Math.floor(Math.random() * length);
  return softBgColors[randomIndex];
}

export function useBackgroundImageOrDefaultUrl(imageUrl?: string | null) {
  const object = {
    backgroundImage: `url(${imageUrl ? imageUrl : "/podcast.svg"})`,
  };
  return object;
}
