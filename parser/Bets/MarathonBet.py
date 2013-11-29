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
                return result
                i += 1

              else:
                print("-- data on this page not founded --")

    return result
            



  def getTeamsAndCoefficientsFromEventDom( self, championship_content ):
    result = {}
    i = 0

    for event_block in championship_content.cssselect("div.main-block-events table.foot-market > tbody"):
      title_teams_dom = event_block.cssselect('tr.event-header > td.first table tr td span.command div')

      if ( len( title_teams_dom ) ):
        event_hash = {}

        coefficients_title_dom = championship_content.cssselect('tr')[0]
        coefficients_dom = coefficients_title_dom.cssselect('th.coupone')

        if ( len( title_teams_dom ) >= 1 ):
          team1 = title_teams_dom[0]
          if ( self.getTeam( team1.text.strip(" \r\n") ) is not None ):
            event_hash['first_team'] = self.getTeam( team1.text.strip(" \r\n") )
          else:
            self.showTeamNotFound( team1.text.strip(" \r\n") )

        if ( len( title_teams_dom ) >= 2 ):
          team2 = title_teams_dom[1]
          if ( self.getTeam( team2.text.strip(" \r\n") ) is not None ):
            event_hash['second_team'] = self.getTeam( team2.text.strip(" \r\n") )
          else:
            self.showTeamNotFound( team2.text.strip(" \r\n") )

        date_event = event_block.cssselect('tr.event-header > td.first table tr td.date')
        if ( len( date_event ) > 0 ):
          event_hash['date_event'] = self.getDate( date_event[0].text.strip(" \r\n") )

        first_position = self.getPositionFromHtmlByCoefficientType( championship_content, 'first' )
        event_hash['first'] = self.getCoefficientFromHtmlByPosition( event_block, first_position ) if first_position is not None else None

        draw_position = self.getPositionFromHtmlByCoefficientType( championship_content, 'draw' )
        event_hash['draw'] = self.getCoefficientFromHtmlByPosition( event_block, draw_position ) if draw_position is not None else None

        second_position = self.getPositionFromHtmlByCoefficientType( championship_content, 'second' )
        event_hash['second'] = self.getCoefficientFromHtmlByPosition( event_block, second_position ) if second_position is not None else None

        first_or_draw_position = self.getPositionFromHtmlByCoefficientType( championship_content, 'first_or_draw' )
        event_hash['first_or_draw'] = self.getCoefficientFromHtmlByPosition( event_block, first_or_draw_position ) if first_or_draw_position is not None else None

        first_or_second_position = self.getPositionFromHtmlByCoefficientType( championship_content, 'first_or_second' )
        event_hash['first_or_second'] = self.getCoefficientFromHtmlByPosition( event_block, first_or_second_position ) if first_or_second_position is not None else None

        draw_or_second_position = self.getPositionFromHtmlByCoefficientType( championship_content, 'draw_or_second' )
        event_hash['draw_or_second'] = self.getCoefficientFromHtmlByPosition( event_block, draw_or_second_position ) if draw_or_second_position is not None else None

        event_hash['first_fora'] = None
        event_hash['second_fora'] = None

        first_fora_position = self.getPositionFromHtmlByCoefficientType( championship_content, 'coeff_first_fora' )
        event_hash['coeff_first_fora'] = self.getCoefficientFromHtmlByPosition( event_block, first_fora_position ) if first_fora_position is not None else None

        second_fora_position = self.getPositionFromHtmlByCoefficientType( championship_content, 'coeff_second_fora' )
        event_hash['coeff_second_fora'] = self.getCoefficientFromHtmlByPosition( event_block, second_fora_position ) if second_fora_position is not None else None

        event_hash['total_less'] = None
        event_hash['total_more'] = None

        total_less_position = self.getPositionFromHtmlByCoefficientType( championship_content, 'coeff_total_less' )
        event_hash['coeff_first_total'] = self.getCoefficientFromHtmlByPosition( event_block, total_less_position ) if total_less_position is not None else None

        total_more_position = self.getPositionFromHtmlByCoefficientType( championship_content, 'coeff_total_more' )
        event_hash['coeff_second_total'] = self.getCoefficientFromHtmlByPosition( event_block, total_more_position ) if total_more_position is not None else None

        result[i] = event_hash
        i += 1

    return result


  def getTeam( self, team ):
    if Dictionary.findTeam( team ):
      return Dictionary.findTeam( team )



  def getPositionFromHtmlByCoefficientType( self, container, coefficient_type ):
    coefficients_type_association = {
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

    tr_dom = container.cssselect('table.foot-market > tr')[0]

    count = 0
    for th_dom in tr_dom.cssselect('th.coupone'):
      a_dom = th_dom.cssselect('a')

      if ( len( a_dom ) ):
        key = a_dom[0].text_content().strip(" \r\n")

        if key in coefficients_type_association.keys():
          if coefficients_type_association[ key ] == coefficient_type:
            return count
      count += 1



  def getCoefficientFromHtmlByPosition( self, container, position ):
    '''количество тн на 1 меньше чем тд'''
    result = container.cssselect('tr.event-header > td')[position + 1]
    result = result.cssselect('span')[0].text.strip(" \r\n")

    if ( len(result) ):
      return float(result)
    else:
      return None



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

