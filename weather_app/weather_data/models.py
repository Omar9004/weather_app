from django.db import models

# Create your models here.
class Data(models.Model):
    temp = models.FloatField()
    weatherCon = models.CharField()
    location = models.CharField()
    lastUpdate = models.DateField()


    
    def __str__(self):
        return f'{self.location}, the current Temperature {self.temp}'