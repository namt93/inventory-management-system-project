from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages

# Create your views here.
def index(request):
    # Check if logging in
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        # Authenticate
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, 'You have been logged in!!!')
            return redirect('racks')
        else:
            messages.success(request, 'There was an error logged in. Please try again!!!')
            return redirect('racks')
    else:
        return render(request, 'pages/racks.html')
def login_user(request):
    pass
def logout_user(request):
    logout(request)
    messages.success(request, 'Logout!!!')
    return redirect('racks')
def help(request):
    return render(request, 'pages/help.html')
def setting(request):
    return render(request, 'pages/setting.html')
