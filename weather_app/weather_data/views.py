from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import DataSerializer
from .external_api import fetch_weather_data
from functools import lru_cache, wraps
from datetime import datetime, timedelta, timezone

# timed_lru_cache caching the requests coming to the server with a limited timespan
def timed_lru_cache(seconds:int, maxsize: int=128):
    def wrapper_cache(func):
        func = lru_cache(maxsize=maxsize)(func)
        func.lifetime = timedelta(seconds=seconds)
        func.expiration = datetime.now(timezone.utc).replace(tzinfo=None) + func.lifetime
        

        @wraps(func)
        def wrapped_func(*arg, **kwargs):
            # now = datetime.now(timezone.utc).replace(tzinfo=None)
            # print(f"[DEBUG] Now: {now}, Expiration: {func.expiration}")
            if datetime.now(timezone.utc).replace(tzinfo=None) >= func.expiration:
                print("[DEBUG] Cache expired, clearing...")
                func.cache_clear()
                func.expiration = datetime.now(timezone.utc).replace(tzinfo=None) + func.lifetime
                # print(f"[DEBUG] New expiration set: {func.expiration}")

            return func(*arg, **kwargs)
        
        return wrapped_func
    
    return wrapper_cache

@api_view(['GET'])
def weather_data(request):
    cityName = request.GET.get('city', 'Stockholm')
    return _weather_data(cityName)

# the cache hashes a request to the server by the city name.
@timed_lru_cache(60)
def _weather_data(cityName:str):
    print(f"Fetching weather for {cityName} from server...")
    data = fetch_weather_data(cityName)
    weather_current = data['current']
    return Response(DataSerializer({'temp':weather_current['temp_c'], 'weatherCon': weather_current['condition']['text'],
                                     'location':data['location']['name'], 'lastUpdate': weather_current['last_updated'] }).data)
# Create your views here.
