from fastapi import APIRouter

router = APIRouter()

@router.get("/drops")
def list_drops():
    return [
        {"name": "Prime Drop Pack", "price": 950},
        {"name": "Legend Skin Pack", "price": 2000},
        {"name": "Neuro Booster Kit", "price": 1200},
        {"name": "VaultKey Mystery Crate", "price": "VaultKey"}
    ]
