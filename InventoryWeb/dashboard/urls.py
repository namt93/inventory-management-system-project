from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('setting/', views.setting),
path('help/', views.help)
]
