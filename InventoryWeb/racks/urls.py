from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('rack-groups', views.RackGroupViewSet)
router.register('racks', views.RackViewSet)
router.register('users', views.UserViewSet)
router.register('documents', views.DocumentViewSet)
router.register('borrowings', views.BorrowingViewSet)


urlpatterns = [
    path('', include(router.urls))
]
