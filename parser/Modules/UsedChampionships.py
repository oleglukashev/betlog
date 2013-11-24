from xml.dom.minidom import parseString


used_championships_file = open('parser/config/used_championships.xml', 'r')
used_championships_read = used_championships_file.read()
used_championships_file.close()
used_championships = parseString( used_championships_read )

def findSport( sport_str ):
  sports = used_championships.getElementsByTagName('sport')

  for sport in sports:
    if ( sport.getAttribute("value") == sport_str ):
      return sport.getAttribute("value")

def findChampionshipBySportAndCountry( championship_str, sport_str, country_str ):
  sports = used_championships.getElementsByTagName('sport')

  for sport in sports:
    if ( sport.getAttribute("value") == sport_str ):
      for country in sport.getElementsByTagName('country'):
        if ( country.getAttribute("value") == country_str ):
          for championship in country.getElementsByTagName('championship'):
            if ( championship.getAttribute("value") == championship_str ):
              return championship.getAttribute("value")

def findCountryBySport( country_str, sport_str ):
  sports = used_championships.getElementsByTagName('sport')

  for sport in sports:
    if ( sport.getAttribute("value") == sport_str ):
      for country in sport.getElementsByTagName('country'):
        if ( country.getAttribute("value") == country_str ):
          return country.getAttribute("value")
