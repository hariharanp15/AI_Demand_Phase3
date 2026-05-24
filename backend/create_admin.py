from app.database import SessionLocal
from app.models.user import User
from app.security import hash_password

db = SessionLocal()

existing = db.query(User).filter(
    User.email == "admin@gmail.com"
).first()

if existing:
    print("Admin already exists")

else:

    admin = User(
        username="admin",
        email="admin@gmail.com",
        password=hash_password("123"),
        role="Super Admin"
    )

    db.add(admin)
    db.commit()

    print("Admin created successfully")