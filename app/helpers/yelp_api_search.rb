
def yelp_api_search(coordinates)
  client = Yelp::Client.new({ consumer_key: 'QjNqmq3H47XNGZ-GLNiBdA',
    consumer_secret: 'JhYS6DOzYqVI_1jHroYt1SPWs5U',
    token: 'ybOVC3u0utMV4HnIGaMHAoPHl40RY6lT',
    token_secret: 'Lkgly8N3HfFz5rilbufkRLQ2k8I'
    })
  params = { term: 'restaurant', limit: 5, sort: 2, radius_filter: 1800 }

  client.search_by_coordinates(coordinates, params)
end