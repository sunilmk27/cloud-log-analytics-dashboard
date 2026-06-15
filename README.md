# Cloud Log Analytics Dashboard

A full-stack dashboard for analyzing cloud application logs using React and FastAPI.

## Features
- View logs in table format
- Filter logs by level (INFO / WARNING / ERROR)
- Search logs by service or message
- Bar chart visualization
- Pie chart visualization
- Dark mode support
- Click log row to view detailed information

## Tech Stack

### Frontend
- React
- Vite
- Recharts
- CSS

### Backend
- Python
- FastAPI

## Project Structure

```bash
cloud-log-analytics-dashboard/
│
├── frontend/
│   ├── src/
│   └── package.json
│
├── main.py
├── database.py
├── models.py
├── parser.py
└── alerts.py
```

## How to Run

### Backend
```bash
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Future Improvements
- Add PostgreSQL database
- Real-time log streaming
- Deploy online
- Alert notifications
