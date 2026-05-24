import os
from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.dataset import Dataset
from app.dependencies import get_current_user
from app.services.preprocess_service import PreprocessService

router = APIRouter(prefix="/dataset", tags=["Dataset"])

UPLOAD_DIR = "app/uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
def upload_dataset(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    filepath = os.path.join(UPLOAD_DIR, file.filename)

    with open(filepath, "wb") as buffer:
        buffer.write(file.file.read())

    df = PreprocessService.clean_data(filepath)

    cleaned_path = os.path.join(UPLOAD_DIR, f"cleaned_{file.filename}")

    df.to_csv(cleaned_path, index=False)

    dataset = Dataset(
        filename=file.filename,
        filepath=cleaned_path
    )

    db.add(dataset)
    db.commit()
    db.refresh(dataset)

    return {
        "message": "Dataset uploaded and cleaned successfully",
        "dataset_id": dataset.id
    }