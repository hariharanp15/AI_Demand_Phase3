from app.database import engine, Base

# IMPORT ALL MODELS
from app.models.user import User

Base.metadata.create_all(bind=engine)

print("Tables created successfully")