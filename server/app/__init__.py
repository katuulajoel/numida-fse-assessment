from flask import Flask
from flask_cors import CORS
from flask_graphql import GraphQLView

from .api.payments import payments_bp
from .graphql.schema import schema

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    # Register blueprints
    app.register_blueprint(payments_bp)
    
    # Register GraphQL endpoint
    app.add_url_rule(
        "/graphql", 
        view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True)
    )
    
    # Home route
    @app.route("/")
    def home():
        return "Welcome to the Loan Application API"
    
    return app
