from fastapi import APIRouter, UploadFile, File
import os
import shutil

router = APIRouter(
    prefix="/dataset",
    tags=["Dataset"]
)


UPLOAD_FOLDER = "datasets"

# Create folder if not exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# -----------------------------
# Upload Dataset API
# -----------------------------

@router.post("/upload")
async def upload_dataset(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(file.file, buffer)

    return {
        "message": "Dataset Uploaded Successfully",
        "filename": file.filename,
        "path": file_path
    }


# -----------------------------
# Test Route
# -----------------------------

@router.get("/")
def dataset_home():

    return {
        "message": "Dataset Route Working"
    }