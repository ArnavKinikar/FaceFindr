import sys
import os
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app.core.database import SessionLocal, engine, Base
from app.core.models import User, Tenant
from sqlalchemy import text

# Add the parent directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def seed():
    # 1. Create tables in 'public' schema
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # 2. Create the test user
        user_email = "testing@gmail.com"
        user_password = "Admin123"
        
        user = db.query(User).filter(User.email == user_email).first()
        if not user:
            user = User(
                email=user_email,
                hashed_password=get_password_hash(user_password),
                is_admin=True
            )
            db.add(user)
            db.commit()
            print(f"Created test user: {user_email}")
        else:
            print(f"Test user {user_email} already exists")
            
    except Exception as e:
        print(f"Error seeding: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed()
