import graphene
from ..models.data import get_loans, get_payments_by_loan_id, get_payments

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
        matching_payments = get_payments_by_loan_id(self.id)
        return [LoanPayment(
            id=payment["id"],
            loan_id=payment["loan_id"],
            payment_date=payment["payment_date"]
        ) for payment in matching_payments]

class Query(graphene.ObjectType):
    loans = graphene.List(ExistingLoans)
    loan_payments = graphene.List(LoanPayment)

    def resolve_loans(self, info):
        loans_data = get_loans()
        return [
            ExistingLoans(
                id=loan["id"],
                name=loan["name"],
                interest_rate=loan["interest_rate"],
                principal=loan["principal"],
                due_date=loan["due_date"]
            )
            for loan in loans_data
        ]
    
    def resolve_loan_payments(self, info):
        return get_payments()

schema = graphene.Schema(query=Query)
