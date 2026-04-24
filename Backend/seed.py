import sys
import os
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app.core.database import SessionLocal, engine, Base
from app.core.models import Admin
from sqlalchemy import text

# Add the Backend directory to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def seed():
    # 1. Create tables in 'public' schema
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # 2. Create the test admin
        admin_email = "testing@gmail.com"
        admin_password = "Admin123"
        
        admin = db.query(Admin).filter(Admin.email == admin_email).first()
        if not admin:
            admin = Admin(
                email=admin_email,
                hashed_password=get_password_hash(admin_password),
                schema_name="default_schema",
                access_code="ABCDEF",
                is_active=True
            )
            db.add(admin)
            db.commit()
            print(f"Created test admin: {admin_email}")
        else:
            print(f"Test admin {admin_email} already exists")
            
    except Exception as e:
        print(f"Error seeding: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed()
