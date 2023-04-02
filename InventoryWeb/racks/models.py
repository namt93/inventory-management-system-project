from django.db import models

# Create your models here.
class Rack(models.Model):
    rack_name = models.CharField(max_length=20)
    location = models.TextField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
