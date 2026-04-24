from app.core.database import SessionLocal
from app.core.models import Admin

def check_admins():
    db = SessionLocal()
    try:
        admins = db.query(Admin).all()
        print(f"Total admins: {len(admins)}")
        for admin in admins:
            print(f"Email: {admin.email}, Schema: {admin.schema_name}")
    except Exception as e:
        print(f"Error checking admins: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    check_admins()
