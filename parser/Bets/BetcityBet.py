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

    return result


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
        date = tbody.cssselect('tr td')[0].text.strip(" \r\n")

      if ( tbody.get("id") == "line"):

        count = 0
        for td in tbody.cssselect("tr[class] > td"):
          if ( count <= len( head_tbody.cssselect("tr > td") ) - 1 ):

            key = self.getKeyByHeadTitle( head_tbody.cssselect("tr > td")[count].text_content().strip(" \r\n"), None )
            if ( key in event_hash ):
              key = self.getKeyByHeadTitle( head_tbody.cssselect("tr > td")[count].text_content().strip(" \r\n"), 'skip_first' )
            
            event_hash[key] = td.text_content().strip(" \r\n")

            count += 1

            result[i] = event_hash
            i += 1
    print(result)   
    return result



  def getKeyByHeadTitle( self, title, skip_first ):
    title_asscociation = {
      'время' : ['date_event'],
      'команда 1' : ['team1'],
      'игрок 1' : ['team1'],
      'спортсмен 1' : ['team1'],
      'команда 2' : ['team2'],
      'игрок 2' : ['team2'],
      'спортсмен 2' : ['team2'],
      '1': ['first'],
      'X': ['draw'],
      '2': ['second'],
      '1X': ['first_or_draw'],
      'X2': ['draw_or_second'],
      'кф': ['first_fora', 'second_fora'],
      'фора': ['coeff_first_fora', 'coeff_second_fora'],
      'тотал': ['total'],
      'мен': ['total_less_position'],
      'бол': ['total_more_position']
    }

    for key, value in title_asscociation.items():
      if key == title:
        return title_asscociation[key][1 if skip_first is not None else 0]



  def showTeamNotFound( self, not_found_team_str ):
    print("------ team not found -------")
    print("sport: " + self.current_sport )
    print("country: " + self.current_country )
    print("championship: " + self.current_championship)
    print("team: " + not_found_team_str + "\r\n")



  def getTeam( self, team ):
    if Dictionary.findTeam( team ):
      return Dictionary.findTeam( team )



  def getDate( self, str_date ):
    return datetime.datetime.strptime( str_date, "%d.%m.%Y %H:%M" )


