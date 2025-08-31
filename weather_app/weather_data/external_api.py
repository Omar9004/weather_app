import requests


def fetch_weather_data(city:str):
    # auth = HTTPBasicAuth('apikey','3c0af9b7e9b34b13a4c83819251808' )
    key = '3c0af9b7e9b34b13a4c83819251808' 
    url = f"http://api.weatherapi.com/v1/current.json?key={key}&q={city}&aqi=yes"
    response = requests.get(url= url).json()
    return response