from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, UUID
from sqlalchemy.orm import relationship
import uuid
from .database import Base

# Admin model (Lives in 'public' schema)
class Admin(Base):
    __tablename__ = "admins"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    schema_name = Column(String, unique=True, index=True)
    access_code = Column(String, unique=True, index=True)
    is_active = Column(Boolean, default=True)

# Tenant Models (These will live in individual schemas)
class Album(Base):
    __tablename__ = "albums"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    event_name = Column(String, nullable=True)
    location = Column(String, nullable=True)
    description = Column(String, nullable=True)

class Media(Base):
    __tablename__ = "media"
    id = Column(Integer, primary_key=True, index=True)
    album_id = Column(Integer, ForeignKey("albums.id"))
    filename = Column(String)
    guest_name = Column(String)
    guest_session_id = Column(UUID(as_uuid=True), index=True)
    
    album = relationship("Album")

class Comment(Base):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True, index=True)
    media_id = Column(Integer, ForeignKey("media.id"))
    content = Column(String)
    guest_name = Column(String)
    guest_session_id = Column(UUID(as_uuid=True), index=True)
    
    media = relationship("Media")
