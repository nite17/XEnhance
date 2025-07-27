from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from logic import process_image

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # In production, replace with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the uploads directory to serve files
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Endpoint to process the uploaded image and return the processed result
    """
    # Create uploads folder if it doesn't exist
    uploads_folder = "uploads"
    os.makedirs(uploads_folder, exist_ok=True)
    
    try:
        # Save the uploaded file
        file_path = os.path.join(uploads_folder, file.filename)
        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)
        
        # Process the image
        output_path = process_image(file_path)
        
        # Return the URL path to the processed image
        filename = os.path.basename(output_path)
        return {"image_url": f"/uploads/{filename}"}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))