from flask import Blueprint, request, jsonify
from ..models.data import add_payment, get_loan_by_id

payments_bp = Blueprint('payments', __name__)

@payments_bp.route('/api/payments', methods=['POST'])
def create_payment():
    try:
        data = request.get_json()
        
        if not data or 'loanId' not in data or 'paymentAmount' not in data:
            return jsonify({"error": "Missing required fields"}), 400
        
        loan_id = int(data['loanId'])
        payment_amount = float(data['paymentAmount'])
        
        # Check if loan exists
        if not get_loan_by_id(loan_id):
            return jsonify({"error": f"Loan with ID {loan_id} not found"}), 404
        
        # Create new payment
        new_payment = add_payment(loan_id, payment_amount)
        
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
