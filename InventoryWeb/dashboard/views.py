from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return render(request, 'pages/dashboard.html')
def help(request):
    return render(request, 'pages/help.html')
def setting(request):
    return render(request, 'pages/setting.html')
