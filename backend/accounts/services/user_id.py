import random

def GENERATE_USER_ID(role: str) -> str:
    role_prefix = {
        'admin': 'A',
        'seller': 'S',
        'buyer': 'B'
    }.get(role.lower())

    if not role_prefix:
        raise ValueError("Invalid role provided. Must be 'admin', 'seller', or 'buyer'.")

    random_number = random.randint(1000000, 9999999)
    return f"{role_prefix}-{random_number}"
