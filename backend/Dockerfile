FROM python:3.12

RUN pip install poetry==1.8.2

WORKDIR /flask_backend

COPY . .

RUN poetry install 

ENTRYPOINT ["poetry", "run", "python", "app.py"]
