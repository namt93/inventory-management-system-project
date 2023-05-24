from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='racks'),
    path('setting/', views.setting),
    path('help/', views.help),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
]