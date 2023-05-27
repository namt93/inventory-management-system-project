from rest_framework.serializers import ModelSerializer
from .models import Rack, RackGroup, User, Document, Borrowing

class RackGroupSerializer(ModelSerializer):
    class Meta:
        model = RackGroup
        fields = ["id", "location", "description", "user", "created_at"]


class RackSerializer(ModelSerializer):
    class Meta:
        model = Rack
        fields = ["id", "rack_name", "role", "rack_group", "user", "created_at"]

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "date_joined"]

        extra_kwargs = {
            "password": {"write_only": "true"}
        }

class DocumentSerializer(ModelSerializer):
    class Meta:
        model = Document
        fields = ["id", "manager", "author", "title", "published_at", "created_at"]

class BorrowingSerializer(ModelSerializer):
    class Meta:
        model = Borrowing
        fields = ["id", "borrower", "document", "date_borrowed", "date_returned", "active"]