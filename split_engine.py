def calculate_split(amount, roles):
    split = {r: round(amount / len(roles), 2) for r in roles}
    return split
