from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('api/rack-groups', views.RackGroupViewSet)
router.register('api/racks', views.RackViewSet)
router.register('api/users', views.UserViewSet)
router.register('api/documents', views.DocumentViewSet)
router.register('api/borrowings', views.BorrowingViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/racks/<int:rack_id>/env-status/5-last', views.get_5_last_env_status),
    path('api/racks/<int:rack_id>/env-status', views.EnvironmentStatusAPIView.as_view()),
    path('api/racks/<int:rack_id>/env-status', views.EnvironmentStatusAPIView.as_view()),
    path('api/racks/<int:rack_id>/opr-status/latest', views.get_latest_operation_status),
    path('api/racks/<int:rack_id>/opr-status', views.OperationStatusAPIView.as_view()),
    path('api/racks/<int:rack_id>/opr-status', views.OperationStatusAPIView.as_view()),
    path('api/racks/<int:rack_id>/opreration/guide-light', views.post_guide_light_operation_message),
    path('api/racks/<int:rack_id>/opreration/open-rack', views.post_open_specific_rack_operation_message),
    path('api/racks/<int:rack_id>/opreration/close-rack', views.post_close_specific_rack_operation_message),
    path('api/racks/<int:rack_id>/opreration/ventilate', views.post_ventilate_operation_message),
    path('api/racks/<int:rack_id>/brkdown-status', views.BreakdownStatusAPIView.as_view()),
    path('api/racks/<int:rack_id>/brkdown-status', views.BreakdownStatusAPIView.as_view()),
]
