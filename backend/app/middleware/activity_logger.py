import time
import logging

logging.basicConfig(
    filename="app/logs/api_logs.log",
    level=logging.INFO
)

async def log_requests(request, call_next):

    start_time = time.time()

    response = await call_next(request)

    process_time = time.time() - start_time

    logging.info(
        f"{request.method} {request.url} - {process_time} sec"
    )

    return response