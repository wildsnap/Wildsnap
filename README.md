# WildSnap

This project is a full-stack AI web application for weight classification. It consists of:

- **Backend**: Django REST Framework with a pre-trained `MobileNetV2` model.
- **Frontend**: Next.js app that communicates with the API.
- **ML Model**: `MobileNetV2.h5` used to classify input data.



## Project Structure

```

project-root/
├── backend/               # Django REST API
│   ├── api/               # Main API app
│   ├── backend/           # Django core settings
│   └── models/
│       └── MobileNetV2.h5 # ML model file
├── frontend/              # Next.js frontend app
│   ├── app/
│   └── ...

````


## Prerequisites

- Python 3.9+
- Node.js 18+
- pip / virtualenv


## Backend Setup (Django REST API)

1. Navigate to the backend folder:

```bash
cd backend
````

2. Create and activate a virtual environment (optional but recommended):

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:

```bash
pip install -r requirements.txt
```

4. Environment Setting

backend/`.env`
```
CORS_ALLOWED_ORIGINS="http://localhost:3000"
```

5. Run migrations:

```bash
python manage.py migrate
```

6. Start the Django development server:

```bash
python manage.py runserver
```

API will be available at:
**[http://127.0.0.1:8000/](http://127.0.0.1:8000/)**




## Frontend Setup (Next.js)

1. Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the Next.js development server:

```bash
npm run dev
```

Frontend will be available at:
**[http://localhost:3000/](http://localhost:3000/)**



## ML Model Info

* The ML model `MobileNetV2.h5` is stored in `backend/models/`
* It is loaded in the Django `views.py` to perform predictions.
* Make sure this file is present before starting the backend server.


## Deployment Tips

* Use `.env` files for environment-specific configuration.
* Set `DEBUG=False` and use a production-ready server (e.g., Gunicorn, Nginx) for Django.

