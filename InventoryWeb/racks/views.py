from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, generics, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import RackGroupSerializer, RackSerializer, UserSerializer, DocumentSerializer, BorrowingSerializer
from .models import RackGroup, Rack, User, Document, Borrowing

def index(request):
    return HttpResponse("Racks app")

class RackGroupViewSet(viewsets.ModelViewSet):
    queryset = RackGroup.objects.all()
    serializer_class = RackGroupSerializer

class RackViewSet(viewsets.ModelViewSet):
    queryset = Rack.objects.all()
    serializer_class = RackSerializer

    @action(methods=['post'], detail=True, url_path="hide-rack", url_name="hide-rack")
    def hide_rack(self, request, pk):
        try:
            rack = Rack.objects.get(pk=pk)
            rack.active = False
            rack.save()
        except Rack.DoesNotExist:
            return Response(status=status.HTTP_404_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)

class UserViewSet(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView, generics.RetrieveAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == 'retrieve':
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

class BorrowingViewSet(viewsets.ModelViewSet):
    queryset = Borrowing.objects.all()
    serializer_class = BorrowingSerializer