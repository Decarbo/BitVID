# 🎥 BitVID — A Distraction-Free Learning Video Platform

> Built by a student, for students. No ads. No distractions. Just pure focus.


![image](https://github.com/user-attachments/assets/0fa37827-0326-47fa-bea2-04b6d20b50f0)
![image](https://github.com/user-attachments/assets/01585556-50af-4e00-929b-dd8079b43b72)

---

## 🚀 Why I Built BitVID

YouTube is full of great content — but also full of distractions.  
As a student, I was tired of:

- ❌ Ads breaking my concentration  
- ❌ Autoplay pulling me into rabbit holes  
- ❌ Irrelevant recommendations  
- ❌ Losing track of what I needed to learn

So I built **BitVID** — a clean, distraction-free video platform with built-in productivity tools like a **To-Do list**, made for focused learning and content consumption.

---

## 🧠 Features

✅ Distraction-free video experience  
✅ YouTube Data API integration  
✅ Infinite scrolling search results  
✅ Built-in To-Do list for study goals  
✅ Clean, responsive UI with TailwindCSS  
✅ Lazy loading, skeleton loaders, and performance optimizations  
✅ Server/client state management with Redux Toolkit + React Query

---

## 🔧 Tech Stack

| Frontend        | State Management       | Styling         | Data/API         |
|-----------------|------------------------|------------------|------------------|
| React 19        | Redux Toolkit (UI)     | Tailwind CSS     | YouTube Data API |
| React Query     | React Context (To-Do)  | Framer Motion    | REST             |

---

## 📚 Key Technical Highlights

### 🔁 Infinite Scrolling with React Query

```js
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['search', query],
  queryFn: fetchSearchResults,
  getNextPageParam: (lastPage) => lastPage.nextPageToken,
});
