from typing import Optional
from fastapi import Header, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from sqlalchemy import text
from .database import SessionLocal, engine
from .models import Admin
from .auth import SECRET_KEY, ALGORITHM

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def get_tenant_db(access_code: str = Header(...)):
    """
    FastAPI dependency that intercepts 'X-Access-Code' header,
    looks up the corresponding Admin's schema_name, 
    and sets the PostgreSQL search_path.
    """
    db = SessionLocal()
    try:
        # 1. Lookup the Admin by access_code
        admin = db.query(Admin).filter(Admin.access_code == access_code).first()
        if not admin:
            raise HTTPException(status_code=404, detail="Invalid access code")
        
        # 2. Set search_path for the current session
        # We include 'public' so that the Admin table is still accessible if needed
        db.execute(text(f"SET search_path TO {admin.schema_name}, public"))
        
        yield db
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

def get_admin_db(token: str = Depends(oauth2_scheme)):
    """
    Dependency for authenticated Admins.
    Verifies JWT token, retrieves Admin's schema_name, 
    and sets the PostgreSQL search_path.
    """
    db = SessionLocal()
    try:
        # 1. Decode JWT
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
        
    # 2. Lookup Admin
    admin = db.query(Admin).filter(Admin.email == email).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
        
    # 3. Set search_path
    db.execute(text(f"SET search_path TO {admin.schema_name}, public"))
    
    try:
        yield db
    finally:
        db.close()
