from django.db import models

# Create your models here.
class User(models.Model):
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=20)
    username = models.CharField(max_length=20)
    role = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

class RackGroup(models.Model):
    location = models.CharField(max_length=100, blank=True)
    description = models.CharField(max_length=100, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Rack(models.Model):
    rack_name = models.CharField(max_length=20)
    role = models.CharField(max_length=10)
    rack_group = models.ForeignKey(RackGroup, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.rack_name

class EnvironmentStatus(models.Model):
    rack = models.ForeignKey(Rack, on_delete=models.CASCADE)
    temperature = models.FloatField()
    humidity = models.FloatField()
   
    def __str__(self):
        return str(self.temperature) + '|' + str(self.humidity)

class OperationStatus(models.Model):
    rack = models.ForeignKey(Rack, on_delete=models.CASCADE)
    movement_speed = models.FloatField()
    weight = models.FloatField()
    displacement = models.FloatField()
    number_users = models.IntegerField()
    is_hard_locked = models.BooleanField()
    is_endpoint = models.BooleanField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class BreakdownStatus(models.Model):
    rack = models.ForeignKey(Rack, on_delete=models.CASCADE)
    is_obstructed = models.BooleanField(null=True)
    is_skewed = models.BooleanField(null=True)
    is_overload_motor = models.BooleanField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Operation(models.Model):
    rack = models.ForeignKey(Rack, on_delete=models.CASCADE)
    guide_light = models.BooleanField(null=True)
    open_specific_rack = models.BooleanField(null=True)
    ventilate = models.BooleanField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
class Document(models.Model):
    rack = models.ForeignKey(Rack, on_delete=models.CASCADE)
    manager = models.ForeignKey(User, on_delete=models.CASCADE)
    author = models.CharField(max_length=50, null=True, blank=True)
    published_at = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Borrowing(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    borrower = models.ForeignKey(User, on_delete=models.CASCADE)
    date_borrowed = models.DateTimeField(auto_now_add=True)
    date_returned = models.DateTimeField(null=True)