# TravelCRM

A Customer Relationship Management (CRM) system designed for travel agencies to manage clients, bookings, inquiries, and itineraries efficiently.

---

## 🚀 Features
- **Client Management**: Add, update, and view client details.
- **Booking Management**: Track and manage travel bookings.
- **Lead & Inquiry Tracking**: Monitor inquiries and convert them into bookings.
- **Package Management**: Create and manage travel packages.
- **Dashboard & Analytics**: View insights on sales, leads, and revenue.

---

## 🛠 Tech Stack
- **Frontend**: React / Next.js / Tailwind CSS
- **Backend**: Node.js (Express) / Django / Flask *(based on your implementation)*
- **Database**: MongoDB / PostgreSQL
- **Authentication**: JWT-based secure login system
- **Deployment**: Docker / Vercel / Render *(optional)*

---

## ⚙️ Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/travelcrm.git
cd travelcrm
```

### 2️⃣ Install Dependencies
For **backend**:
```bash
cd backend
npm install   # or pip install -r requirements.txt if using Python
```

For **frontend**:
```bash
cd frontend
npm install
```

### 3️⃣ Set Environment Variables
Create a `.env` file in your **backend** folder and add:
```
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the Application
**Backend**:
```bash
npm run dev   # or python manage.py runserver
```
**Frontend**:
```bash
npm start
```

---

## 📡 API Endpoints
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login and get JWT token
- `GET /api/clients` – Fetch all clients
- `POST /api/bookings` – Add a booking

*(Add more endpoints as per your implementation)*

---

## 📷 Screenshots
*(Add screenshots of dashboard, booking page, etc.)*

---

## 🔮 Future Enhancements
- AI-powered lead scoring
- Integration with payment gateways
- Automated itinerary generation

---

## 📜 License
This project is licensed under the **MIT License**.

