#!/usr/local/bin/python3.3
# -*- coding: utf-8 -*-
import logger
import datetime
from datetime import date

import sqlalchemy
from sqlalchemy import *
from sqlalchemy.orm import *
from sqlalchemy.ext.declarative import declarative_base
#from Bets import Bet
import urllib
import lxml.html
import lxml.cssselect
from Modules.Dictionary import Dictionary
from Modules import UsedChampionships


class MarathonBet():

  def __init__( self, link ):
    self.link = link


  def getContentFromUrl( self ):
    data = urllib.parse.urlencode( self.link['data'] )
    page = urllib.request.urlopen( self.link['url'], data.encode('utf-8') )
    #page = urllib.request.urlopen( self.link['url'] )
    doc = lxml.html.document_fromstring(page.read().decode('utf-8'))
    return doc


  def parse( self ):
    content = self.getContentFromUrl()
    print("--- Content has loaded ---")

    result = {}
    i = 0

    for event in content.cssselect('#container_EVENTS > div.main-block-events'):
      event_hash = {}

      event_title_elems = event.cssselect('div.block-events-head > *')
      for event_title_elem in event_title_elems:
        event_title_elem.drop_tree()

      title_str = event.cssselect('div.block-events-head')[0].text.strip(" \r\n")

      if ( self.skipOrNotTitleByWord( title_str ) == False ):
        sport = self.getSportFromTitle( title_str )
        country = self.getCountryFromTitle( title_str )
        championship = self.getChampionshipFromTitle( title_str )

        if ( country == None ):
          country = UsedChampionships.findCountryByChampionship( championship )

        file = open("display.txt", "a",encoding='utf-8')

        if ( UsedChampionships.findSport( sport ) is not None ):
          if ( UsedChampionships.findCountryBySport( country, sport ) is not None ):
            if ( UsedChampionships.findChampionshipBySport( championship, sport ) is not None ):
              event_hash['bookmaker'] = "MarathonBet"
              event_hash['teams_and_coefficients'] = self.getEventCoefficientFromDom( event )
              event_hash['championship'] = UsedChampionships.findChampionshipBySport( championship, sport )
              event_hash['country'] = UsedChampionships.findCountryBySport( country, sport )
              event_hash['sport'] = UsedChampionships.findSport( sport )

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




  def getEventCoefficientFromDom( self, event_dom ):
    result = {}
    i = 0

    for event_item in event_dom.cssselect('table.foot-market > tbody'):
      title_teams_dom = event_item.cssselect('tr.event-header > td.first table tr td span.command div')

      if ( len( title_teams_dom ) ):
        event_hash = {}

        coefficients_title_dom = event_dom.cssselect('table.foot-market > tr')[0]
        coefficients_dom = coefficients_title_dom.cssselect('th.coupone')

        if ( len( title_teams_dom ) >= 1 ):
          team1 = title_teams_dom[0]
          if ( self.getTeam( team1.text.strip(" \r\n") ) is not None ):
            event_hash['first_team'] = self.getTeam( team1.text.strip(" \r\n") )

        if ( len( title_teams_dom ) >= 2 ):
          team2 = title_teams_dom[1]
          if ( self.getTeam( team2.text.strip(" \r\n") ) is not None ):
            event_hash['second_team'] = self.getTeam( team2.text.strip(" \r\n") )

        date_event = event_item.cssselect('tr.event-header > td.first table tr td.date')
        if ( len( date_event ) > 0 ):
          event_hash['date_event'] = self.getDate( date_event[0].text.strip(" \r\n") )

        if ( len( coefficients_dom ) > 0 ):
          event_hash[self.getCoefficientTitleFromHtml( event_dom, 0)] = self.getCoefficientFromHtml( event_item, 0)

        if ( len( coefficients_dom ) >= 2 ):
          event_hash[self.getCoefficientTitleFromHtml( event_dom, 1)] = self.getCoefficientFromHtml( event_item, 1)

        if ( len( coefficients_dom ) >= 3 ):
          event_hash[self.getCoefficientTitleFromHtml( event_dom, 2)] = self.getCoefficientFromHtml( event_item, 2)

        if ( len( coefficients_dom ) >= 4 ):
          event_hash[self.getCoefficientTitleFromHtml( event_dom, 3)] = self.getCoefficientFromHtml( event_item, 3)

        if ( len( coefficients_dom ) >= 5 ):
          event_hash[self.getCoefficientTitleFromHtml( event_dom, 4)] = self.getCoefficientFromHtml( event_item, 4)

        if ( len( coefficients_dom ) >= 6 ):
          event_hash[self.getCoefficientTitleFromHtml( event_dom, 5)] = self.getCoefficientFromHtml( event_item, 5)

        if ( len( coefficients_dom ) >= 7 ):
          event_hash[self.getCoefficientTitleFromHtml( event_dom, 6)] = self.getCoefficientFromHtml( event_item, 6)

        if ( len( coefficients_dom ) >= 8 ):
          event_hash[self.getCoefficientTitleFromHtml( event_dom, 7)] = self.getCoefficientFromHtml( event_item, 7)

        if ( len( coefficients_dom ) >= 9 ):
          event_hash[self.getCoefficientTitleFromHtml( event_dom, 8)] = self.getCoefficientFromHtml( event_item, 8)

        if ( len( coefficients_dom ) >= 10 ):
          event_hash[self.getCoefficientTitleFromHtml( event_dom, 9)] = self.getCoefficientFromHtml( event_item, 9)

        result[i] = event_hash
        i += 1

    return result


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

  def getCoefficientFromHtml( self, container, position ):
    container = container.cssselect('tr.event-header > td')[position]
    return container.cssselect('span')[0].text.strip(" \r\n")

  def getCoefficientTitleFromHtml( self, container, position ):
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
    th_dom = tr_dom.cssselect('th.coupone')[position]
    a_dom = th_dom.cssselect('a')

    if ( len( a_dom ) ):
      key = a_dom[0].text_content().strip(" \r\n")
    else:
      return None

    if key in coefficients_type_association.keys():
      return coefficients_type_association[ key ]
    else:
      return None


  def skipOrNotTitleByWord( self, title ):
    ignore_words = ['Итоги', 'Женщины']

    for item in ignore_words:
      if ( title.find( item ) != -1 ):
        return True

    return False

  def getDate(self, str_date):
    months_sample = { 'янв': '01', 'фев': '02', 'мар': '03', 'апр': '04', 'май': '05', 'июн': '06', 'июл': '07', 'авг': '08', 'сен': '09', 'окт': '10', 'ноя': '11', 'дек': '12'  }
    date_array = str_date.split(" ")

    if ( len( date_array ) == 1 ):
      result_date = str( date.today().day ) + '.' + str( date.today().month ) + '.' + str( date.today().year ) + ' ' + date_array[0]
    else:
      result_date = str( date_array[0] ) + '.' + months_sample[date_array[1]] + '.' + str( date.today().year ) + ' ' + date_array[2]

    return datetime.datetime.strptime(result_date, "%d.%m.%Y %H:%M")

