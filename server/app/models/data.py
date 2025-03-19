import datetime

# NOTE: In a real application, this would be replaced with a database
loans = [
    {
        "id": 1,
        "name": "Tom's Loan",
        "interest_rate": 5.0,
        "principal": 10000,
        "due_date": datetime.date(2025, 3, 1),
    },
    {
        "id": 2,
        "name": "Chris Wailaka",
        "interest_rate": 3.5,
        "principal": 500000,
        "due_date": datetime.date(2025, 3, 1),
    },
    {
        "id": 3,
        "name": "NP Mobile Money",
        "interest_rate": 4.5,
        "principal": 30000,
        "due_date": datetime.date(2025, 3, 1),
    },
    {
        "id": 4,
        "name": "Esther's Autoparts",
        "interest_rate": 1.5,
        "principal": 40000,
        "due_date": datetime.date(2025, 3, 1),
    },
]

loan_payments = [
    {"id": 1, "loan_id": 1, "payment_date": datetime.date(2024, 3, 4)},
    {"id": 2, "loan_id": 2, "payment_date": datetime.date(2024, 3, 15)},
    {"id": 3, "loan_id": 3, "payment_date": datetime.date(2024, 4, 5)},
]

def get_loans():
    return loans

def get_loan_by_id(loan_id):
    for loan in loans:
        if loan["id"] == loan_id:
            return loan
    return None

def get_payments():
    return loan_payments

def get_payments_by_loan_id(loan_id):
    return [payment for payment in loan_payments if payment["loan_id"] == loan_id]

def add_payment(loan_id, amount):
    loan = get_loan_by_id(loan_id)
    if not loan:
        return None
    
    new_payment_id = max(payment["id"] for payment in loan_payments) + 1
    new_payment = {
        "id": new_payment_id,
        "loan_id": loan_id,
        "payment_date": datetime.date.today(),
        "amount": amount
    }
    
    loan_payments.append(new_payment)
    return new_payment
