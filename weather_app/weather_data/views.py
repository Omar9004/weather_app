from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Data
from .serializer import DataSerializer
from .external_api import fetch_weather_data

@api_view(['GET'])
def weather_data(request):
    cityName = request.GET.get('city', 'Stockholm')
    data = fetch_weather_data(cityName)
    weather_current = data['current']
    return Response(DataSerializer({'temp':weather_current['temp_c'], 'weatherCon': weather_current['condition']['text'],
                                     'location':data['location']['name'], 'lastUpdate': weather_current['last_updated'] }).data)
# Create your views here.
