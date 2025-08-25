import requests

url = "http://api.weatherapi.com/v1/current.json?key=3c0af9b7e9b34b13a4c83819251808&q=London&aqi=yes"
# auth = HTTPBasicAuth('apikey','3c0af9b7e9b34b13a4c83819251808' )
request = requests.get(url= url).json()

print(request['current']['temp_c'])
