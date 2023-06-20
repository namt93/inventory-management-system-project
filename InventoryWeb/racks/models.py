from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    def __str__(self):
        return self.username + ' | ' + str(self.email)


class RackGroup(models.Model):
    class Meta:
        unique_together = ('description', 'location')

    location = models.CharField(max_length=100, blank=True)
    description = models.CharField(max_length=100, blank=True)
    user = models.ForeignKey(User, related_name="rack_groups", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.location + ' | ' + self.description 

class Rack(models.Model):
    class Meta:
        unique_together = ('rack_name', 'rack_group')
        ordering = ["id", "created_at"]

    rack_name = models.CharField(max_length=20)
    password = models.CharField(max_length=100, null=True, blank=True)
    role = models.CharField(max_length=10)
    rack_group = models.ForeignKey(RackGroup, related_name="racks", on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    
    def __str__(self):
        return self.rack_name

class EnvironmentStatus(models.Model):
    rack = models.ForeignKey(Rack, on_delete=models.CASCADE)
    temperature = models.FloatField()
    humidity = models.FloatField()
    weight = models.FloatField()
    smoke =  models.FloatField()
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
   
    def __str__(self):
        return str(self.temperature) + ' | ' + str(self.humidity)

class OperationStatus(models.Model):
    rack = models.ForeignKey(Rack, on_delete=models.CASCADE)
    movement_speed = models.FloatField()
    displacement = models.FloatField()
    number_users = models.IntegerField()
    is_hard_locked = models.BooleanField()
    is_endpoint = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)

class BreakdownStatus(models.Model):
    rack = models.ForeignKey(Rack, on_delete=models.CASCADE)
    is_obstructed = models.BooleanField(null=True)
    is_skewed = models.BooleanField(null=True)
    is_overload_motor = models.BooleanField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

class Operation(models.Model):
    rack = models.ForeignKey(Rack, related_name="operations", on_delete=models.CASCADE)
    guide_light = models.BooleanField(null=True)
    open_specific_rack = models.BooleanField(null=True)
    ventilate = models.BooleanField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)
    
class Document(models.Model):
    rack = models.ForeignKey(Rack, related_name="documents", on_delete=models.CASCADE)
    manager = models.ForeignKey(User, on_delete=models.CASCADE)
    author = models.CharField(max_length=50, null=True, blank=True)
    title = models.CharField(max_length=100, blank=True)
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.title + ' | ' + self.author


class Borrowing(models.Model):
    borrower = models.ForeignKey(User, related_name="borrowings",on_delete=models.CASCADE)
    document = models.ManyToManyField(Document)
    date_borrowed = models.DateTimeField(auto_now_add=True)
    date_returned = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return str(self.borrower) + ' | ' + str(self.date_borrowed)