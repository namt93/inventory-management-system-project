from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.hashers import make_password, check_password
from rest_framework import viewsets, generics, permissions, status
from rest_framework.views import APIView
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from .serializers import RackGroupSerializer, RackSerializer, UserSerializer, DocumentSerializer, BorrowingSerializer, EnvironmentStatusSerializer, OperationStatusSerializer, OperationSerializer, BreakdownStatusSerializer
from .models import RackGroup, Rack, User, Document, Borrowing, EnvironmentStatus, OperationStatus, BreakdownStatus, Operation
import serial
from client import *

def index(request):
    return HttpResponse("Racks app")

class RackGroupViewSet(viewsets.ModelViewSet, generics.CreateAPIView):
    queryset = RackGroup.objects.all()
    serializer_class = RackGroupSerializer

class RackViewSet(viewsets.ModelViewSet, generics.CreateAPIView):
    queryset = Rack.objects.filter(active=True)
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

class UserViewSet(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer

    # def get_permissions(self):
    #     if self.action == 'retrieve':
    #         return [permissions.IsAuthenticated()]

    #     return [permissions.AllowAny()]

class DocumentViewSet(viewsets.ModelViewSet, generics.CreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

class BorrowingViewSet(viewsets.ModelViewSet, generics.CreateAPIView):
    queryset = Borrowing.objects.all()
    serializer_class = BorrowingSerializer


#@action(methods=["get"], detail=True, 
#        url_path="5-last", url_name="5-last")
@api_view(('GET',))
def get_5_last_env_status(request, rack_id):
    try:
        last_5_env_status = EnvironmentStatus.objects.filter(rack_id=rack_id).order_by('-id')[:5]
        last_5_env_status_ascending_order = reversed(last_5_env_status)
        serializer = EnvironmentStatusSerializer(last_5_env_status_ascending_order, many=True)
    except EnvironmentStatus.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data, status=status.HTTP_200_OK)


class EnvironmentStatusAPIView(APIView):

    # Get EnvironmentStatus by rack_id
    def get(self, request, rack_id):
        env_status = EnvironmentStatus.objects.filter(rack_id=rack_id)
        serializer = EnvironmentStatusSerializer(env_status, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


    # Post EnvironmentStatus
    def post(self, request, rack_id):
        rack = Rack.objects.get(pk=rack_id)

        if not rack:
            error_message = "Invalid rack credential"
        else:
            raw_password = request.data.get('password')
            if not check_password(raw_password, rack.password):
                error_message = "Invalid rack credential"
            else:
                env_status = EnvironmentStatus.objects.create(rack_id=rack_id, temperature=request.data.get('temperature'), humidity=request.data.get('humidity'), weight=request.data.get('weight'), smoke=request.data.get('smoke'))
                return Response(EnvironmentStatusSerializer(env_status).data, status=status.HTTP_201_CREATED)
        
        return Response(error_message, status=status.HTTP_400_BAD_REQUEST)


# Get latest operation status of rack
@api_view(('GET',))
def get_latest_operation_status(request, rack_id):
    try:
        latest_operation_status = OperationStatus.objects.filter(rack_id=rack_id).order_by('-id')[:1][0]
        serializer = OperationStatusSerializer(latest_operation_status)
    except OperationStatus.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data, status=status.HTTP_200_OK)

class OperationStatusAPIView(APIView):

    # Get OperationStatus by rack_id
    def get(self, request, rack_id):
        opr_status = OperationStatus.objects.filter(rack_id=rack_id)
        serializer = OperationStatusSerializer(opr_status, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    # Post OperationStatus
    def post(self, request, rack_id):
        rack = Rack.objects.get(pk=rack_id)

        if not rack:
            error_message = "Invalid rack credential"
        else:
            raw_password = request.data.get('password')
            if not check_password(raw_password, rack.password):
                error_message = "Invalid rack credential"
            else:
                opr_status = OperationStatus.objects.create(rack_id=rack_id, movement_speed=request.data.get('movement_speed'), displacement=request.data.get('displacement'), number_users=request.data.get('number_users'), is_hard_locked=request.data.get('is_hard_locked'), is_endpoint=request.data.get('is_endpoint'))
                return Response(OperationStatusSerializer(opr_status).data, status=status.HTTP_201_CREATED)
        
        return Response(error_message, status=status.HTTP_400_BAD_REQUEST)


# Send operation message to IPC
@api_view(('POST',))
def post_guide_light_operation_message(request, rack_id):
    rack = Rack.objects.get(pk=rack_id)
    if not rack:
        error_message = "Invalid rack credential"
    else:
        operation = Operation.objects.create(rack_id=rack_id, guide_light=True)
        message = 'O|' + str(rack_id) + '|0'
        my_client = Client()
        my_client.send_message(message)
        return Response(OperationSerializer(operation).data, status=status.HTTP_201_CREATED)
    return Response(error_message, status=status.HTTP_400_BAD_REQUEST)

@api_view(('POST',))
def post_open_specific_rack_operation_message(request, rack_id):
    rack = Rack.objects.get(pk=rack_id)
    if not rack:
        error_message = "Invalid rack credential"
    else:
        operation = Operation.objects.create(rack_id=rack_id, open_specific_rack=True)
        message = 'O|' + str(rack_id) + '|1'
        my_client = Client()
        my_client.send_message(message)
        return Response(OperationSerializer(operation).data, status=status.HTTP_201_CREATED)
    return Response(error_message, status=status.HTTP_400_BAD_REQUEST)

@api_view(('POST',))
def post_close_specific_rack_operation_message(request, rack_id):
    rack = Rack.objects.get(pk=rack_id)
    if not rack:
        error_message = "Invalid rack credential"
    else:
        operation = Operation.objects.create(rack_id=rack_id, close_specific_rack=True)
        message = 'O|' + str(rack_id) + '|2'
        my_client = Client()
        my_client.send_message(message)
        return Response(OperationSerializer(operation).data, status=status.HTTP_201_CREATED)
    return Response(error_message, status=status.HTTP_400_BAD_REQUEST)

@api_view(('POST',))
def post_ventilate_operation_message(request, rack_id):
    rack = Rack.objects.get(pk=rack_id)
    if not rack:
        error_message = "Invalid rack credential"
    else:
        operation = Operation.objects.create(rack_id=rack_id, ventilate=True)
        message = 'O|' + str(rack_id) + '|3'
        my_client = Client()
        my_client.send_message(message)
        return Response(OperationSerializer(operation).data, status=status.HTTP_201_CREATED)
    return Response(error_message, status=status.HTTP_400_BAD_REQUEST)

class BreakdownStatusAPIView(APIView):

    # Get BreakdownStatus by rack_id
    def get(self, request, rack_id):
        brkdown_status = BreakdownStatus.objects.filter(rack_id=rack_id)
        serializer = BreakdownStatusSerializer(brkdown_status, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    # Post BreakdownStatus
    def post(self, request, rack_id):
        rack = Rack.objects.get(pk=rack_id)

        if not rack:
            error_message = "Invalid rack credential"
        else:
            raw_password = request.data.get('password')
            if not check_password(raw_password, rack.password):
                error_message = "Invalid rack credential"
            else:
                brkdown_status = BreakdownStatus.objects.create(rack_id=rack_id, is_obstructed=request.data.get('is_obstructed'), is_skewed=request.data.get('is_skewed'), is_overload_motor=request.data.get('is_overload_motor'))
                return Response(BreakdownStatusSerializer(brkdown_status).data, status=status.HTTP_201_CREATED)
        
        return Response(error_message, status=status.HTTP_400_BAD_REQUEST)
