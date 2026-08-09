from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from pathlib import Path

# Import routers
from app.routes import (
    auth,
    conversation,
    i1_progression,
    practice,
    progress,
    settings,
    shadow_reading_steps,
)

# Create FastAPI app
app = FastAPI(
    title="Polyglot Voice Coach API",
    description="API for the Polyglot Voice Coach shadow reading application",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003", "http://localhost:3004", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files directory for uploads
uploads_dir = Path(__file__).parent.parent / "uploads"
uploads_dir.mkdir(exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(uploads_dir)), name="uploads")

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(conversation.router, prefix="/api/conversation", tags=["conversation"])
app.include_router(practice.router, prefix="/api/practice", tags=["practice"])
app.include_router(progress.router, prefix="/api/progress", tags=["progress"])
app.include_router(settings.router, prefix="/api/settings", tags=["settings"])
app.include_router(i1_progression.router, prefix="/api/i1", tags=["i1-progression"])
app.include_router(shadow_reading_steps.router, prefix="/api/shadow", tags=["shadow-reading"])

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Polyglot Voice Coach API",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
