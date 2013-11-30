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


class MarathonBet():
  
  def __init__( self ):
    self.bookmaker = "Marathon"
    self.teams_not_found = {}
    self.current_sport = None
    self.current_country = None
    self.current_championship = None



  def getChampionshipsDataFromConfig( self ):
    file = open( 'parser/Bets/config/links.xml', 'r' )
    file_read = file.read()
    file.close()
    data = parseString( file_read )
    return data.getElementsByTagName('championship')



  def getContentByUrl( self, url ):
    http = urllib3.PoolManager()
    page = http.request( 'GET', url )

    result = False
    if ( page.status == 200 ):
      return lxml.html.document_fromstring(page.data)
    else:
      print("-- error: url " + url + " not access")
    


  def parse( self ):
    result = {}
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
              if ( len( championship_content.cssselect("div.main-block-events") ) ):
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

                result[i] = event_hash
                i += 1

              else:
                print("-- data on this page not founded --")

    return result
            


  def getTeamsAndCoefficientsFromEventDom( self, championship_content ):
    result = {}
    i = 0
    head_tbody = None

    for tbody in championship_content.cssselect("div.main-block-events table.foot-market > tbody"):
      event_hash = {}
      head_tbody = championship_content.cssselect("div.main-block-events table.foot-market > tr")[0]
      count = 0
      for td in tbody.cssselect("tr.event-header > td"):
        head_td = head_tbody.cssselect("th")[count if count == 0 else count + 1]

        if ( len( head_td.cssselect("a") ) ):
          key = self.getKeyByHeadTitle( head_tbody.cssselect("th")[count if count == 0 else count + 1].cssselect("a")[0].text_content().strip(" \r\n") )

          if ( key is not None ):
            event_hash[key] = td.cssselect("span")[0].text.strip(" \r\n")

            if ( key == 'coeff_first_fora' ):
              event_hash['first_fora'] = td.text.strip(" \r\n")[1:-1]

            if ( key == 'coeff_second_fora' ):
              event_hash['second_fora'] = td.text.strip(" \r\n")[1:-1]

            if ( key == 'coeff_first_total' ):
              event_hash['total_less'] = td.text.strip(" \r\n")[1:-1]

            if ( key == 'coeff_first_total' ):
              event_hash['total_more'] = td.text.strip(" \r\n")[1:-1]

        else:
          if ( td.get("class") == "first" ):
            event_hash['first_team'] = self.getTeam( td.cssselect("table tr td span.command div")[0].text.strip(" \r\n") )
            event_hash['second_team'] = self.getTeam( td.cssselect("table tr td span.command div")[1].text.strip(" \r\n") )
            event_hash['date_event'] = self.getDate( td.cssselect('td.first table tr td.date')[0].text.strip(" \r\n") )

        count += 1
      
      result[i] = event_hash
      i += 1

    return result



  def getKeyByHeadTitle( self, title ):
    title_asscociation = {
      '1' : 'first',
      'X' : 'draw',
      '2' : 'second',
      '1X' : 'first_or_draw',
      '12' : 'first_or_second',
      'X2' : 'draw_or_second',
      'Фора1' : 'coeff_first_fora',
      'Фора2' : 'coeff_second_fora',
      'Тотал мен.' : 'coeff_first_total',
      'Тотал бол.' : 'coeff_second_total',
    }

    for key, value in title_asscociation.items():
      if key == title:
        return title_asscociation[key]



  def getTeam( self, team ):
    if Dictionary.findTeam( team ):
      return Dictionary.findTeam( team )
    else:
      self.showTeamNotFound( team )



  def getDate(self, str_date):
    months_sample = { 'янв': '01', 'фев': '02', 'мар': '03', 'апр': '04', 'май': '05', 'июн': '06', 'июл': '07', 'авг': '08', 'сен': '09', 'окт': '10', 'ноя': '11', 'дек': '12'  }
    date_array = str_date.split(" ")

    if ( len( date_array ) == 1 ):
      result_date = str( date.today().day ) + '.' + str( date.today().month ) + '.' + str( date.today().year ) + ' ' + date_array[0]
    else:
      result_date = str( date_array[0] ) + '.' + months_sample[date_array[1]] + '.' + str( date.today().year ) + ' ' + date_array[2]

    return datetime.datetime.strptime(result_date, "%d.%m.%Y %H:%M")



  def showTeamNotFound( self, not_found_team_str ):
    print("------ team not found -------")
    print("sport: " + self.current_sport )
    print("country: " + self.current_country )
    print("championship: " + self.current_championship)
    print("team: " + not_found_team_str + "\r\n")

