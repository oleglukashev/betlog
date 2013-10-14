from xml.dom.minidom import parseString

def findSport( sport_str ):
  sports = dictionary_sports.getElementsByTagName('sport')

  for sport in sports:
    for variant in sport.getElementsByTagName('variant'):
      if ( variant.getAttribute("value") == sport_str ):
        return sport.getAttribute("value")

def findChampionship( championship_str ):
  championships = dictionary_championships.getElementsByTagName('championship')

  for championship in championships:
    for variant in championship.getElementsByTagName('variant'):
      if ( variant.getAttribute("value") == championship_str ):
        return championship.getAttribute("value")

def findCountry( country_str ):
  countries = dictionary_countries.getElementsByTagName('country')

  for country in countries:
    for variant in country.getElementsByTagName('variant'):
      if ( variant.getAttribute("value") == country_str ):
        return country.getAttribute("value")

def findTeam( team_str ):
  teams = dictionary_teams.getElementsByTagName('team')

  for team in teams:
    for variant in team.getElementsByTagName('variant'):
      if ( variant.getAttribute("value") == team_str ):
        return team.getAttribute("value")

def parseDictionaryFile( dictionary_file ):
  file = open( dictionary_file, 'r' )
  file_read = file.read()
  file.close()
  return parseString( file_read )

dictionary_sports = parseDictionaryFile( 'Modules/Dictionary/sports.xml' )
dictionary_championships = parseDictionaryFile( 'Modules/Dictionary/championships.xml' )
dictionary_countries = parseDictionaryFile( 'Modules/Dictionary/countries.xml' )
dictionary_teams = parseDictionaryFile( 'Modules/Dictionary/teams.xml' )