from fastapi import APIRouter
import psutil

router = APIRouter(prefix="/monitor", tags=["Monitoring"])

@router.get("/system")
def system_metrics():

    return {
        "cpu": psutil.cpu_percent(),
        "memory": psutil.virtual_memory().percent,
        "disk": psutil.disk_usage('/').percent
    }