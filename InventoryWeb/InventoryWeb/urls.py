"""InventoryWeb URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Smart Inventory API", 
        default_version='v1', 
        description="APIs for InventoryApp", 
        contact=openapi.Contact(email="namt7115633@gmail.com"),
        license=openapi.License(name="Tran Nhat Nam"),
        ),
        public=True,
        permission_classes=(permissions.AllowAny,)
        )

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('racks.urls')),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$',schema_view.without_ui(cache_timeout=0),name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redocs/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc')
]
