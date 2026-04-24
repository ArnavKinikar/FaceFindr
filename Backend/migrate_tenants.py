from sqlalchemy import text
from app.core.database import engine

def migrate_schemas():
    with engine.connect() as conn:
        # Get all schemas starting with 'tenant_'
        result = conn.execute(text("SELECT schema_name FROM information_schema.schemata WHERE schema_name LIKE 'tenant_%'"))
        schemas = [row[0] for row in result.all()]
        
        for schema in schemas:
            print(f"Migrating schema: {schema}")
            try:
                # Add event_name
                conn.execute(text(f"ALTER TABLE {schema}.albums ADD COLUMN IF NOT EXISTS event_name VARCHAR"))
                # Add location
                conn.execute(text(f"ALTER TABLE {schema}.albums ADD COLUMN IF NOT EXISTS location VARCHAR"))
                conn.commit()
                print(f"  Successfully migrated {schema}")
            except Exception as e:
                print(f"  Error migrating {schema}: {e}")
                conn.rollback()

if __name__ == "__main__":
    migrate_schemas()
