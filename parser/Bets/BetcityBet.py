#!/usr/local/bin/python3.3
# -*- coding: utf-8 -*-
import logger
import datetime
import yaml
from datetime import date

import sqlalchemy
from sqlalchemy import *
from sqlalchemy.orm import *
from sqlalchemy.ext.declarative import declarative_base
#from Bets import Bet
import urllib3
import lxml.html
import lxml.cssselect
from Modules.Dictionary import Dictionary
from Modules import UsedChampionships


class BetcityBet():
  
  def __init__( self ):
    self.link = self.setConfigData()
    self.teams_not_found = {}
    self.current_sport = ""
    self.current_country = ""
    self.current_championship = ""

  def setConfigData( self ):
    bookmakers = yaml.load( open('parser/config/bookmakers.yml', 'r') )
    for key, value in bookmakers.items():
      if key == 'betcity':
        return value

  def getContentFromUrl( self ):
    http = urllib3.PoolManager()
    cookies = {'Cookie': self.link['header'] }
    page = http.request( 'GET', self.link['url'], headers=cookies )
    doc = lxml.html.document_fromstring(page.data)
    return doc


  def parse( self ):
    content = self.getContentFromUrl()
    print("--- Content has loaded ---")

    result = {}
    i = 0

    for events_block in content.cssselect('body > table'):
      if ( len( events_block.cssselect('tbody#line') ) > 0 ):
        event_hash = {}

        title_str = events_block.cssselect('thead tr td b')[0].text_content().strip(" \r\n")

        if ( self.skipOrNotTitleByWord( title_str ) == False ):
          sport = self.getSportFromTitle( title_str )
          country = self.getCountryFromTitle( title_str ) if self.getCountryFromTitle( title_str ) else "Международный"
          championship = self.getChampionshipFromTitle( title_str )

          file = open('display.txt', 'a', encoding='utf-8')

          if ( UsedChampionships.findSport( sport ) is not None ):
            if ( UsedChampionships.findCountryBySport( country, sport ) is not None ):
              if ( UsedChampionships.findChampionshipBySportAndCountry( championship, sport, country ) is not None ):
                event_hash['bookmaker'] = "Betcity"
                self.current_championship = event_hash['championship'] = UsedChampionships.findChampionshipBySportAndCountry( championship, sport, country )
                self.current_country = event_hash['country'] = UsedChampionships.findCountryBySport( country, sport )
                self.current_sport = event_hash['sport'] = UsedChampionships.findSport( sport )
                event_hash['teams_and_coefficients'] = self.getEventCoefficientFromDom( events_block )

                result[i] = event_hash

                i += 1
              else:
                file.write( title_str + " - не найден Чемпионат\r\n")
            else:
              file.write( title_str + " - не найдена Страна\r\n")
          else:
            file.write( title_str + " - не найдне Спорт\r\n")
 
          file.close()

    return result


  def getEventCoefficientFromDom( self, events_dom ):
    result = {}
    i = 0
    date_event = ""
    date = ""

    for tbody in events_dom.cssselect('tbody'):
      if ( tbody.get("class") == "date" ):
        date = tbody.cssselect('tr td')[0].text.strip(" \r\n")

      if ( tbody.get("id") == "line"):
        team1_td_position = self.getFirstTeamPosition( events_dom )
        team1 = self.getDataFromHtmlByPosition( team1_td_position, tbody )
        '''if ( self.getTeam( team1 ) is not None ):
          event_hash['first_team'] = self.getTeam( team1 )
        else:
          self.showTeamNotFound( team1 )'''

        team2_td_position = self.getSecondTeamPosition( events_dom )
        team2 = self.getDataFromHtmlByPosition( team2_td_position, tbody )
        '''if ( self.getTeam( team2 ) is not None ):
          event_hash['first_team'] = self.getTeam( team2 )
        else:
          self.showTeamNotFound( team2 )'''

        print(team1)
        print(team2)

        '''date_event = date + " " + tbody.cssselect("tr:first-child td")[0].text.strip(" \r\n")
        event_hash['date_event'] = self.getDate( date_event )

        first_position = self.getPositionFromHtmlByCoefficientType( event_dom, 'first' )
        event_hash['first'] = self.getCoefficientFromHtmlByPosition( event_item, first_position ) if first_position is not None else None

        draw_position = self.getPositionFromHtmlByCoefficientType( event_dom, 'draw' )
        event_hash['draw'] = self.getCoefficientFromHtmlByPosition( event_item, draw_position ) if draw_position is not None else None

        second_position = self.getPositionFromHtmlByCoefficientType( event_dom, 'second' )
        event_hash['second'] = self.getCoefficientFromHtmlByPosition( event_item, second_position ) if second_position is not None else None

        first_or_draw_position = self.getPositionFromHtmlByCoefficientType( event_dom, 'first_or_draw' )
        event_hash['first_or_draw'] = self.getCoefficientFromHtmlByPosition( event_item, first_or_draw_position ) if first_or_draw_position is not None else None

        first_or_second_position = self.getPositionFromHtmlByCoefficientType( event_dom, 'first_or_second' )
        event_hash['first_or_second'] = self.getCoefficientFromHtmlByPosition( event_item, first_or_second_position ) if first_or_second_position is not None else None

        draw_or_second_position = self.getPositionFromHtmlByCoefficientType( event_dom, 'draw_or_second' )
        event_hash['draw_or_second'] = self.getCoefficientFromHtmlByPosition( event_item, draw_or_second_position ) if draw_or_second_position is not None else None

        first_fora_position = self.getPositionFromHtmlByCoefficientType( event_dom, 'first_fora' )
        event_hash['first_fora'] = self.getCoefficientFromHtmlByPosition( event_item, first_fora_position ) if first_fora_position is not None else None

        second_fora_position = self.getPositionFromHtmlByCoefficientType( event_dom, 'second_fora' )
        event_hash['second_fora'] = self.getCoefficientFromHtmlByPosition( event_item, second_fora_position ) if second_fora_position is not None else None

        total_less_position = self.getPositionFromHtmlByCoefficientType( event_dom, 'total_less' )
        event_hash['total_less'] = self.getCoefficientFromHtmlByPosition( event_item, total_less_position ) if total_less_position is not None else None

        total_more_position = self.getPositionFromHtmlByCoefficientType( event_dom, 'total_more' )
        event_hash['total_more'] = self.getCoefficientFromHtmlByPosition( event_item, total_more_position ) if total_more_position is not None else None

        result[i] = event_hash
        i += 1'''

    return result



  def getFirstTeamPosition( self, events_dom ):
    variations_of_title = { 'Команда 1', 'Спортсмен 1', 'Игрок 1' }
    return self.getTeamPositionByTitle( variations_of_title, events_dom )



  def getSecondTeamPosition( self, events_dom ):
    variations_of_title = { 'Команда 2', 'Спортсмен 2', 'Игрок 2' }
    return self.getTeamPositionByTitle( variations_of_title, events_dom )



  def getTeamPositionByTitle( self, variations_of_title, events_dom ):
    count = 0
    first_chead = events_dom.cssselect('tbody.chead')[0]
    for td in first_chead.cssselect('td'):
      for item_variation in variations_of_title:
        if td.text.strip(" \r\n") == item_variation:
          return count

      count += 1


  def getDataFromHtmlByPosition( self, position, event_block ):
    count = 0;

    for td in event_block.cssselect("tr td"):
      if position == count:
        return td.cssselect("b")[0].text.strip(" \r\n")

      count += 1
    

  def getTeamByTitleFromHtml( self, title_str, events_block ):
    for tbody in events_block.cssselect("tbody"):
      if ( tbody.get("class") == "chead"):
        for td, key in tbody.cssselect("th td"):
          print(key)


  def getSportFromTitle( self, title ):
    title_array = title.split(". ")

    for title_element in title_array:
      if Dictionary.findSport( title_element ):
        return Dictionary.findSport( title_element )

  def getChampionshipFromTitle( self, title ):
    title_array = title.split(". ")

    for title_element in title_array:
      if Dictionary.findChampionship( title_element ):
        return Dictionary.findChampionship( title_element )

  def getCountryFromTitle( self, title ):
    title_array = title.split(". ")

    for title_element in title_array:
      if Dictionary.findCountry( title_element ):
        return Dictionary.findCountry( title_element )

  def getTeam( self, team ):
    if Dictionary.findTeam( team ):
      return Dictionary.findTeam( team )

  def skipOrNotTitleByWord( self, title ):
    ignore_words = ['Итоги', 'Женщины']

    for item in ignore_words:
      if ( title.find( item ) != -1 ):
        return True

    return False

  def getDate( self, str_date ):
    return datetime.datetime.strptime( str_date, "%d.%m.%Y %H:%M" )

  def getPositionFromHtmlByCoefficientType( self, container, coefficient_type ):
    coefficients_type_association = {
      '1' : 'first',
      'X' : 'draw',
      '2' : 'second',
      '1X' : 'first_or_draw',
      '12' : 'first_or_second',
      'X2' : 'draw_or_second',
      'Фора1' : 'first_fora',
      'Фора2' : 'second_fora',
      'Тотал мен.' : 'total_less',
      'Тотал бол.' : 'total_more',
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