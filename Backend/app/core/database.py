from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/facefindr")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """Initializes the 'public' schema with the Admins table."""
    from .models import Admin
    with engine.connect() as conn:
        conn.execute(text("CREATE SCHEMA IF NOT EXISTS public"))
        conn.execute(text("SET search_path TO public"))
        conn.commit()
    Base.metadata.create_all(bind=engine, tables=[Admin.__table__])
    print("Public schema initialized (admins table).")

def create_tenant_schema(schema_name: str):
    """Dynamically creates a new schema and all tenant tables within it."""
    from .models import Album, Media, Comment
    
    with engine.connect() as conn:
        # 1. Create the schema
        conn.execute(text(f"CREATE SCHEMA IF NOT EXISTS {schema_name}"))
        conn.commit()
        
        # 2. Set search_path and create tables
        # Note: Base.metadata.create_all doesn't easily support dynamic schemas per-call
        # without temporarily modifying the Table objects. 
        # A simpler way for this requirement is to EXECUTE the DDL in the schema context.
        conn.execute(text(f"SET search_path TO {schema_name}"))
        
        # We can use the engine to create ALL tables associated with the tenant
        # by temporarily pointing the search_path for the connection.
        # But Base.metadata.create_all might still target 'public' if not specified.
        # However, if we don't specify schema in models, it follows search_path.
        
        # Since we want only a subset of tables in the tenant schema:
        tenant_tables = [Album.__table__, Media.__table__, Comment.__table__]
        
        for table in tenant_tables:
            # Manually trigger creation for this connection which has the search_path set
            table.create(bind=conn, checkfirst=True)
            
        conn.commit()
