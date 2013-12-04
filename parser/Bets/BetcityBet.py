#!/usr/local/bin/python3.3
# -*- coding: utf-8 -*-
import logger
import datetime
import time
import yaml
from datetime import date
import random

import sqlalchemy
from sqlalchemy import *
from sqlalchemy.orm import *
from sqlalchemy.ext.declarative import declarative_base
#from Bets import Bet
import urllib3
import lxml.html
import lxml.cssselect
from xml.dom.minidom import parseString
from Modules.Dictionary import Dictionary


class BetcityBet():
  
  def __init__( self ):
    self.bookmaker = "Betcity"
    self.teams_not_found = {}
    self.current_sport = ""
    self.current_country = ""
    self.current_championship = ""
    self.result = {}

  def getChampionshipsDataFromConfig( self ):
    file = open( 'parser/Bets/config/links.xml', 'r' )
    file_read = file.read()
    file.close()
    data = parseString( file_read )
    return data.getElementsByTagName('championship')



  def getContentByUrl( self, url ):
    http = urllib3.PoolManager()
    page = http.request( 'POST', url, { 'line_id[]': url[47:] } )

    result = False
    if ( page.status == 200 ):
      return lxml.html.document_fromstring(page.data)
    else:
      print("-- error: url " + url + " not access")


  def parse( self ):
    i = 0
    championships = self.getChampionshipsDataFromConfig()
    
    for championship in championships:
      for bookmaker in championship.getElementsByTagName('bookmaker'):
        if bookmaker.getAttribute("value") == self.bookmaker:
          for link in bookmaker.getElementsByTagName("link"):

            championship_content = None
            
            if ( len( link.getAttribute("value") ) > 0 ):
              time.sleep( random.randint(3, 6) )
              championship_content = self.getContentByUrl( link.getAttribute("value") )
            else:
              print("-- warning: no url for championship: " + championship.getAttribute("value") )

            if ( championship_content is not None ):
              if ( len( championship_content.cssselect("tbody#line") ) ):
                self.current_sport = championship.parentNode.parentNode.parentNode.getAttribute("value")
                self.current_country = championship.parentNode.getAttribute("value")
                self.current_championship = championship.getAttribute("value")
                
                event_hash = {
                  "bookmaker": self.bookmaker,
                  "sport": self.current_sport,
                  "country": self.current_country,
                  "championship": self.current_championship,
                  "events_data": self.getTeamsAndCoefficientsFromEventDom( championship_content )
                }

                self.result[i] = event_hash
                i += 1
              else:
                print("-- data on this page not founded --")

    return self.result


  def getTeamsAndCoefficientsFromEventDom( self, championship_content ):
    result = {}
    i = 0
    date_event = ""
    date = ""
    head_tbody = None

    for tbody in championship_content.cssselect('tbody'):
      event_hash = {}

      if ( tbody.get("class") == "chead" ):
        head_tbody = tbody

      if ( tbody.get("class") == "date" ):
        date = tbody.cssselect('tr td')[0].text.strip()

      if ( tbody.get("id") == "line"):

        count = 0
        for td in tbody.cssselect("tr[class] > td"):
          if ( count <= len( head_tbody.cssselect("tr > td") ) - 1 ):

            key = self.getKeyByHeadTitle( head_tbody.cssselect("tr > td")[count].text_content().strip(), None )
            if ( key in event_hash ):
              key = self.getKeyByHeadTitle( head_tbody.cssselect("tr > td")[count].text_content().strip(), 'skip_first' )
            
            if ( key == "date_event" ):
              event_hash[key] = self.getDate( date + " " + td.text_content().strip() )
            elif ( key == "first_team" or key == "second_team" ):
              event_hash[key] = self.getTeam( td.text_content().strip() )
              if ( event_hash[key] is None ):
                self.showTeamNotFound( td.text_content().strip() )
            else:
              event_hash[key] = td.text_content().strip() if len( td.text_content().strip() ) > 0 else None

            count += 1

      result[i] = event_hash
      i += 1  
        
    return result



  def getKeyByHeadTitle( self, title, skip_first ):
    title_asscociation = {
      'время' : ['date_event'],
      'Команда 1' : ['first_team'],
      'Игрок 1' : ['first_team'],
      'Спортсмен 1' : ['first_team'],
      'Команда 2' : ['second_team'],
      'Игрок 2' : ['second_team'],
      'Спортсмен 2' : ['second_team'],
      '1': ['first'],
      'X': ['draw'],
      '2': ['second'],
      '1X': ['first_or_draw'],
      'X2': ['draw_or_second'],
      'кф': ['coeff_first_fora', 'coeff_second_fora'],
      'фора': ['first_fora', 'second_fora'],
      'тотал': ['total_less', 'total_more'],
      'мен': ['coeff_first_total'],
      'бол': ['coeff_second_total']
    }

    for key, value in title_asscociation.items():
      if key == title:
        return title_asscociation[key][1 if skip_first is not None else 0]



  def showTeamNotFound( self, not_found_team_str ):
    file = open( "teams_not_found.txt", 'a', encoding='utf-8' )
    file.write("------ team not found -------\r\n")
    file.write("sport: " + self.current_sport + "\r\n" )
    file.write("country: " + self.current_country + "\r\n" )
    file.write("championship: " + self.current_championship + "\r\n" )
    file.write("team: " + not_found_team_str + "\r\n")
    file.close()



  def getTeam( self, team ):
    if Dictionary.findTeam( team ):
      return Dictionary.findTeam( team )
    else:
      self.showTeamNotFound( team )



  def getDate( self, str_date ):
    return datetime.datetime.strptime( str_date, "%d.%m.%Y %H:%M" )


