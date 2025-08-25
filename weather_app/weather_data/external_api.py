import requests


def fetch_weather_data(city:str):
    url = f"http://api.weatherapi.com/v1/current.json?key=3c0af9b7e9b34b13a4c83819251808&q={city}&aqi=yes"
    # auth = HTTPBasicAuth('apikey','3c0af9b7e9b34b13a4c83819251808' )
    response = requests.get(url= url).json()
    return response