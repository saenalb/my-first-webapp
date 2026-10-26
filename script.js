const quoteButton = document.getElementById("quote-button");
const quote = document.getElementById("quote");
const calendarTitle = document.getElementById("calendar-title");
const calendarGrid = document.getElementById("calendar-grid");
const scheduleList = document.getElementById("schedule-list");

const quotes = [
  "작은 한 걸음도 오늘을 충분히 의미 있게 만듭니다.",
  "완벽하지 않아도 괜찮아요. 시작한 것만으로도 잘하고 있어요.",
  "서두르지 않아도 됩니다. 오늘 할 수 있는 일만 하면 돼요.",
  "계획이 조금 틀어져도, 남은 시간은 다시 설계할 수 있어요.",
  "중요한 일 하나만 끝내도 오늘은 성공한 하루입니다.",
  "잠깐 쉬어 가도 좋아요. 흐름은 다시 이어집니다.",
  "오늘의 나를 위해, 가벼운 마음으로 시작해 봐요."
];

const schedules = [
  { date: "2026-10-24", time: "11:00", title: "빨래" },
  { date: "2026-10-26", time: "09:00", title: "스페인어 학습" },
  { date: "2026-10-26", time: "10:00", title: "프로젝트 실습" },
  { date: "2026-10-26", time: "17:00", title: "하루 정리" },
  { date: "2026-10-27", time: "18:00", title: "장보기" },
  { date: "2026-10-28", time: "14:00", title: "Kubernetes 실습" },
  { date: "2026-10-30", time: "16:00", title: "주간 점검" }
];

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

let index = -1;

quoteButton.addEventListener("click", function () {
  index = (index + 1) % quotes.length;
  quote.textContent = quotes[index];
});

function dateKey(year, monthIndex, day) {
  const month = String(monthIndex + 1).padStart(2, "0");
  const date = String(day).padStart(2, "0");
  return year + "-" + month + "-" + date;
}

function formatWhen(schedule) {
  const parts = schedule.date.split("-").map(Number);
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  return parts[1] + "월 " + parts[2] + "일 (" + weekdays[date.getDay()] + ") " + schedule.time;
}

function renderCalendar(year, monthIndex) {
  calendarTitle.textContent = year + "년 " + (monthIndex + 1) + "월";
  calendarGrid.replaceChildren();

  weekdays.forEach(function (name) {
    const label = document.createElement("div");
    label.className = "weekday";
    label.textContent = name;
    calendarGrid.appendChild(label);
  });

  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const today = new Date();

  for (let blank = 0; blank < firstWeekday; blank += 1) {
    const empty = document.createElement("div");
    empty.className = "day empty";
    calendarGrid.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const cell = document.createElement("div");
    cell.className = "day";

    const isToday = today.getFullYear() === year
      && today.getMonth() === monthIndex
      && today.getDate() === day;

    if (isToday) {
      cell.classList.add("today");
    }

    const number = document.createElement("div");
    number.className = "day-number";
    number.textContent = String(day);
    cell.appendChild(number);

    const key = dateKey(year, monthIndex, day);
    schedules.filter(function (schedule) {
      return schedule.date === key;
    }).forEach(function (schedule) {
      const item = document.createElement("p");
      item.className = "event";
      item.textContent = schedule.time + " " + schedule.title;
      cell.appendChild(item);
    });

    calendarGrid.appendChild(cell);
  }
}

function renderScheduleList() {
  scheduleList.replaceChildren();

  schedules.forEach(function (schedule) {
    const item = document.createElement("li");

    const when = document.createElement("span");
    when.className = "schedule-when";
    when.textContent = formatWhen(schedule);

    const title = document.createElement("span");
    title.className = "schedule-title";
    title.textContent = schedule.title;

    item.append(when, title);
    scheduleList.appendChild(item);
  });
}

const today = new Date();
renderCalendar(today.getFullYear(), today.getMonth());
renderScheduleList();
