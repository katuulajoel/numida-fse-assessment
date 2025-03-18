import datetime
from flask import Flask, request, jsonify
from flask_graphql import GraphQLView
from flask_cors import CORS
import graphene

app = Flask(__name__)
CORS(app)

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


class LoanPayment(graphene.ObjectType):
    id = graphene.Int()
    loan_id = graphene.Int()
    payment_date = graphene.Date()


class ExistingLoans(graphene.ObjectType):
    id = graphene.Int()
    name = graphene.String()
    interest_rate = graphene.Float()
    principal = graphene.Int()
    due_date = graphene.Date()
    payments = graphene.List(LoanPayment)
    
    def resolve_payments(self, info):
        matching_payments = [payment for payment in loan_payments if payment["loan_id"] == self.id]
        return [LoanPayment(
            id=payment["id"],
            loan_id=payment["loan_id"],
            payment_date=payment["payment_date"]
        ) for payment in matching_payments]


class Query(graphene.ObjectType):
    loans = graphene.List(ExistingLoans)
    loan_payments = graphene.List(LoanPayment)

    def resolve_loans(self, info):
        return [
            ExistingLoans(
                id=loan["id"],
                name=loan["name"],
                interest_rate=loan["interest_rate"],
                principal=loan["principal"],
                due_date=loan["due_date"]
            )
            for loan in loans
        ]
    
    def resolve_loan_payments(self, info):
        return loan_payments


schema = graphene.Schema(query=Query)


app.add_url_rule(
    "/graphql", view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True)
)


@app.route("/")
def home():
    return "Welcome to the Loan Application API"


# REST endpoint to add a new payment
@app.route("/api/payments", methods=["POST"])
def add_payment():
    try:
        data = request.get_json()
        
        if not data or 'loanId' not in data or 'paymentAmount' not in data:
            return jsonify({"error": "Missing required fields"}), 400
        
        loan_id = int(data['loanId'])
        payment_amount = float(data['paymentAmount'])
        
        # Validate loan exists
        loan_exists = any(loan["id"] == loan_id for loan in loans)
        if not loan_exists:
            return jsonify({"error": f"Loan with ID {loan_id} not found"}), 404
        
        # Create new payment
        new_payment_id = max(payment["id"] for payment in loan_payments) + 1
        new_payment = {
            "id": new_payment_id,
            "loan_id": loan_id,
            "payment_date": datetime.date.today(),
            "amount": payment_amount
        }
        
        loan_payments.append(new_payment)
        
        return jsonify({
            "success": True,
            "payment": {
                "id": new_payment["id"],
                "loanId": new_payment["loan_id"],
                "paymentDate": new_payment["payment_date"].isoformat(),
                "amount": new_payment["amount"]
            }
        }), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
