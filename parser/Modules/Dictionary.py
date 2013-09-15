from xml.dom.minidom import parseString


dictionary_file = open('config/dictionary.xml', 'r')
dictionary_read = dictionary_file.read()
dictionary_file.close()
dictionary = parseString( dictionary_read )

def findSport( sport_str ):
  sports = dictionary.getElementsByTagName('sport')

  for sport in sports:
    for variant in sport.getElementsByTagName('variant'):
      if ( variant.getAttribute("value") == sport_str ):
        return sport.getAttribute("value")

def findChampionship( championship_str, country_str ):
  countries = dictionary.getElementsByTagName('country')

  for country in countries:
    if ( country.getAttribute("value") == country_str ):
      for championship in country.getElementsByTagName('championship'):
        for variant in championship.getElementsByTagName('variant'):
          if ( variant.getAttribute("value") == championship_str ):
            return championship.getAttribute("value")

def findCountry( country_str ):
  countries = dictionary.getElementsByTagName('country')

  for country in countries:
    if ( country.getAttribute("value") == country_str ):
      return country.getAttribute("value")