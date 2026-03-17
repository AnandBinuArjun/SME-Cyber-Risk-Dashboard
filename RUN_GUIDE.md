# 🛠️ Running the SME Cyber Risk Dashboard

Follow these steps to get both the backend API and the frontend dashboard running on your local machine.

---

## 1. Backend Setup (FastAPI)

### Prerequisites
- Python 3.10+
- PostgreSQL (ensure it's running and you've created a database named `cyber_risk_db`)

### Steps
1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Create a Virtual Environment**:
   ```bash
   python -m venv venv
   ```

3. **Activate the Virtual Environment**:
   - **Windows**: `venv\Scripts\activate`
   - **Mac/Linux**: `source venv/bin/activate`

4. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure Environment Variables**:
   - Copy `.env.example` to `.env`.
   - Update the database credentials in `.env` to match your local PostgreSQL setup.

6. **Seed the Demo Data**:
   This will create the "BrightPath Consulting Ltd" demo company and users.
   ```bash
   python seed_demo.py
   ```

7. **Run the API Server**:
   ```bash
   uvicorn app.main:app --reload
   ```
   *The API will be available at `http://localhost:8000/api/v1`*

---

## 2. Frontend Setup (Next.js)

### Prerequisites
- Node.js 18+
- npm or yarn

### Steps
1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   *The dashboard will be available at `http://localhost:3000`*

---

## 🔑 Demo Credentials
Once the system is running, use these accounts to log in and test role-based views:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Super Admin** | `admin@platform.com` | `password123` |
| **Org Owner** | `sarah@brightpath.com` | `password123` |
| **Security Analyst** | `alex@brightpath.com` | `password123` |
| **Viewer** | `tom@external.com` | `password123` |

---

## 🎬 How to Demo
For a step-by-step presentation script including "talking points," please refer to the `DEMO_WALKTHROUGH.md` I've provided in your project documentation artifacts.
