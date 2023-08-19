FROM python:3.8.10

# Install system dependencies
RUN apt-get update && \
    apt-get install -y libgl1-mesa-glx

WORKDIR /waterinsight_flaskserver 

COPY req.txt .

RUN pip install -r req.txt

COPY . .

EXPOSE 5000

CMD ["python", "main.py"]