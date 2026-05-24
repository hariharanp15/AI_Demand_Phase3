from pydantic import BaseModel


class DatasetResponse(BaseModel):
    id: int
    filename: str

    class Config:
        from_attributes = True