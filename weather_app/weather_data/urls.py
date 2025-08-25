from django.urls import path
from . import views

urlpatterns = [
    path('data/', views.weather_data, name='weather_data'),
]